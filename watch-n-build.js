/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  This is an attempt to get eleventy 1.0.1 to rebuild external modules.
  To work around Eleventy's 1.0.1 issue with caching the changed module,
  I'm using shelljs to spawn a whole new shell to run eleventy to work
  around this OLD BUG that's being fixed in 2.0.0.
  https://github.com/11ty/eleventy/issues/1052

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

const path = require('path');
const chokidar = require('chokidar');
const webpack = require('webpack');
const Shell = require('shelljs');
const Express = require('express');
const IP = require('ip');

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = '[run]'.padEnd(6, ' ');
const SP = ' '.padEnd(6, ' ');
//
const SITE_PATH = path.resolve(__dirname, '_site');
const PORT = 8080;
let APP, SERV; // express instance, server

/// HELPERS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return a string wrapped in red background and white text */
function m_WrapErrorText(str) {
  return `\x1b[30;41m\x1b[37m ${str} \x1b[0m`;
}

/// TASK: RUN WEBPACK /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** run webpack programmatically with an internal configuration to prevent
 *  the external configuration file from getting mucked with */
function EleventyExtendBuild() {
  return new Promise((resolve, reject) => {
    const compiler = webpack({
      mode: 'development',
      entry: path.join(__dirname, '11ty-extend/index-extend'),
      output: {
        path: path.join(__dirname),
        filename: '11ty-extend/_built.js',
        library: {
          name: 'eleventyExtend',
          type: 'umd'
        }
      },
      module: {
        rules: [
          {
            test: /\.(ts|js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.js']
      },
      target: 'node'
    });
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        console.log('error', err);
        return;
      }

      console.log('');
      console.log('--- webpack output begin ---');
      console.log(
        stats.toString({
          assets: false,
          hash: true,
          colors: true
        })
      );

      compiler.close(closeErr => {
        if (closeErr) reject(closeErr);
        console.log('--- webpack output end -----');
        console.log('');
        resolve();
      });
    });
  });
}

/// TASK: SERVE FILES /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** start a cheeseball static server for localhost only */
function StartServer() {
  return new Promise((resolve, reject) => {
    if (APP !== undefined) return;
    APP = Express();
    APP.use('/', Express.static(SITE_PATH));
    if (!SERV) {
      console.log(PR, 'STARTING WEB SERVER');
      const ip = `\x1b[33m${IP.address()}\x1b[0m`;
      const port = `\x1b[33m${PORT}\x1b[0m`;
      SERV = APP.listen(PORT, err => {
        console.log(PR, `. webapp bundle: '${SITE_PATH}'`);
        console.log(PR, `. webapp server listening ${ip} on port ${port}`);
        if (err) reject(err);
        else resolve();
      });
    }
  });
}

/// TASK: RUN ELEVENTY ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** build eleventy site by launching the command in a new shell, which has the
 *  effect of forcing Eleventy to reload changed configuration instead of
 *  using the old cached copy (bug to be fixed in 2.0.0) */
async function EleventyBuild() {
  return new Promise((resolve, reject) => {
    const { error, stdout } = Shell.exec('npx eleventy', {
      silent: false
    });
    if (error) {
      console.log('error', error);
      reject(error);
    }
    resolve();
  });
}

/// SETUP CHOKIDAR ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** rather than use Eleventy or Webpack's built-in watches, use Chokidar
 *  to watch ourselves and invoke as needed. This makes their config files
 *  simpler and allows us to work around bugs 11ty's module import */
function StartWatcher() {
  const watcher = chokidar.watch(['./11ty-extend', './content'], {
    ignored: /[\/\\]\./,
    persistent: true,
    alwaysStat: true
  });
  watcher.on('error', function (error) {
    console.error('Error happened', error);
  });
  watcher.on('change', async (path, stats) => {
    const bits = path.split('/');
    const [type] = bits;

    // (1) normal assets in eleventy content
    if (type === 'content') {
      const pathStr = m_WrapErrorText(path);
      console.log('');
      console.log(PR, 'Content File', pathStr, 'changed...rebuilding');
      console.log(PR, 'REWRITING ELEVENTY FILES');
      await EleventyBuild();
      return;
    }

    // (2) eleventy extension code has changed
    if (type === '11ty-extend') {
      const pathStr = m_WrapErrorText(path);
      console.log('');
      console.log(PR, 'Tool File', pathStr, 'changed...rebuilding');
      console.log(PR, 'REBUILDING 11TY EXTENSIONS');
      await EleventyExtendBuild();
      console.log(PR, 'REWRITING ELEVENTY FILES');
      await EleventyBuild();
      return;
    }
  });
}

/// INITIAL BUILD /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
console.log('\n');
console.log(PR, 'RUNNING SYSTEM');
(async () => {
  console.log(PR, 'BUILDING 11TY EXTENSIONS');
  await EleventyExtendBuild();
  console.log(PR, 'WRITING ELEVENTY FILES');
  await EleventyBuild();
  await StartServer();
  console.log(PR, 'WATCHING FOR CHANGES');
  StartWatcher();
})();

/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  minimal eleventy config that imports a compiled Extend() function what
  is built by a Webpack+Babel build chain that allows authoring in
  Typescript.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = function (eleventyConfig) {
  // run our extensions
  const { Extend } = require('./11ty-extend/_built');
  Extend(eleventyConfig);
  // return configuration
  return {
    dir: {
      input: 'content',
      output: '_site'
    }
  };
};

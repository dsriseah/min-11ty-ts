/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ESLINT CONFIG FOR 11TY
  this runs in the node environment, but we're also trying to use ESM modules
  in node v16.15.1 which supports them. We're also using the latest javascript
  support (ES2020)

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// BASE CONFIGURATION ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const config = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // parsing of modern javascript
    project: ['./tsconfig.json'] // remember, we're using typescript-eslint/parser
  },
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/eslint-recommended', 'prettier'],
  globals: {
    Atomics: 'readonly', // chrome v8 global
    SharedArrayBuffer: 'readonly' // chrome v8 global
  },
  ignorePatterns: ['**/.eleventy-extend.js', '**/node_modules'],
  rules: {}
};

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default config;

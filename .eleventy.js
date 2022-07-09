const EXTENSIONS = require('./.eleventy-extend');

module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: 'views',
      output: '_site'
    }
  };
};

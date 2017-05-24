const autoprefixer = require('autoprefixer');
const precss = require('precss');
const cssImport = require('postcss-import');
const customMedia = require('postcss-custom-media');
const pkg = require('./package.json');
const modulesValues = require('postcss-modules-values');

module.exports = () => ({
  plugins() {
    return [
      cssImport,
      customMedia,
      precss,
      modulesValues,
      autoprefixer({ browsers: pkg['supported-browsers'] }),
    ];
  },
});

const autoprefixer = require('autoprefixer');
const precss = require('precss');
const cssImport = require('postcss-import');
const customMedia = require('postcss-custom-media');
const modulesValues = require('postcss-modules-values');
const pkg = require('./package.json');

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

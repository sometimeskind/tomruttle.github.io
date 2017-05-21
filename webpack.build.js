/* eslint-disable no-console */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const glob = require('glob-all');

const clientConfig = require('./webpack.config');

module.exports = webpack(clientConfig('build'), (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('Error 1', err);
    process.exit(1);
  }

  const filenames = Object.keys(stats.compilation.assets);

  return webpack(merge.smart(clientConfig.sharedConfig, {
    entry: { static: './src/server/index.js' },
    output: { filename: 'static.js' },
    plugins: [
      new StaticSiteGeneratorPlugin({
        crawl: true,
        entry: 'static',
        locals: { filenames },
      }),
    ],
  }), (err2, stats2) => {
    if (err2 || stats2.hasErrors()) {
      console.error('Error 2', err2);
      process.exit(1);
    }

    const unwantedFiles = glob.sync([path.join(__dirname, 'dist', 'static*.js')]);
    const deleteFilePromises = unwantedFiles.map((filename) => new Promise((resolve, reject) =>
      fs.unlink(filename, (unlinkErr) => (unlinkErr ? reject(unlinkErr) : resolve()))));

    return Promise.all(deleteFilePromises)
      .then(() => {
        const builtFiles = filenames
          .concat(Object.keys(stats2.compilation.assets))
          .filter((filename) => !unwantedFiles.includes(filename));

        console.log('Built:\n', builtFiles.join('\n'));
        process.exit(0);
      });
  });
});

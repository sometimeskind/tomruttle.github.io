// Some of this comes from https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const pkg = require('./package.json');

module.exports = (env, argv) => {
  const plugins = [
    new CleanWebpackPlugin(['dist']),

    // new webpack.optimize.ModuleConcatenationPlugin(),
    //
    // new webpack.NamedChunksPlugin((chunk) => (chunk.name
    //   ? chunk.name
    //   : chunk.modules.map((m) => path.relative(m.context, m.request)).join('-'))),
    //
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   chunks: ['main'],
    //   minChunks({ context = '' }) { return context.includes('node_modules'); },
    // }),
    //
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'runtime',
    //   chunks: ['main', 'vendor'],
    // }),

    new StaticSiteGeneratorPlugin({
      crawl: true,
      entry: 'server',
    }),

    new GenerateSW({
      // globDirectory: 'dist',
      // globPatterns: ['**/*.{html,js,svg,jpeg,png}'],
      // globIgnores: ['server*.js', 'sitemap.*'],
      swDest: path.join(__dirname, 'dist', 'sw.js'),
    }),
  ];

  if (argv.mode === 'prod') {
    plugins.push(new webpack.HashedModuleIdsPlugin());
  }

  return {
    entry: {
      server: './src/server/index.js',
      main: ['babel-polyfill', './src/client/request-animation-frame-polyfill', './src/client/index.js'],
    },

    output: {
      filename: argv.mode === 'prod' ? '[name].[chunkhash].js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'umd',
      globalObject: 'this',
    },

    resolve: {
      extensions: ['.js', '.jsx', '.md', '.css', '.json'],
    },

    devtool: argv.mode === 'dev' ? 'inline-source-map' : false,

    module: {
      rules: [
        {
          test: /\.(jpe?g|gif|png|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: { name: 'images/[name].[ext]', useRelativePath: argv.mode !== 'dev' },
            },
          ],
        },
        {
          test: /\.css$/,
          use: 'css-loader',
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                removeComments: false,
                collapseWhitespace: false,
              },
            },
            {
              loader: 'markdown-loader',
              options: {},
            },
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['env', { loose: true, modules: false, targets: { browsers: pkg['supported-browsers'] } }],
              'react',
            ],
            plugins: ['transform-object-rest-spread', 'transform-class-properties'],
          },
        },
      ],
    },

    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       commons: {
    //         chunks: 'initial',
    //         minChunks: 2,
    //         maxInitialRequests: 5, // The default limit is too small to showcase the effect
    //         minSize: 0, // This is example is too small to create commons chunks
    //       },
    //       vendor: {
    //         test: /node_modules/,
    //         chunks: 'initial',
    //         name: 'vendor',
    //         priority: 10,
    //         enforce: true,
    //       },
    //     },
    //   },
    // },

    plugins,
  };
};

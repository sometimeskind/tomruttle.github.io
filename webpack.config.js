const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const pkg = require('./package.json');

module.exports = (env, argv) => ({
  entry: {
    server: './src/server/index.js',
    main: ['babel-polyfill', './src/client/request-animation-frame-polyfill', './src/client/index.js'],
  },

  output: {
    filename: argv.mode === 'production' ? '[name].[chunkhash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.md', '.css', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'images/[name].[ext]', useRelativePath: argv.mode === 'production' },
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

  plugins: [
    new CleanWebpackPlugin(['dist']),

    ...(argv.mode === 'production' ? [
      new webpack.HashedModuleIdsPlugin(),
    ] : []),

    new StaticSiteGeneratorPlugin({
      crawl: true,
      entry: 'server',
    }),

    new GenerateSW({
      swDest: path.join(__dirname, 'dist', 'sw.js'),
    }),
  ],
});

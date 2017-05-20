const path = require('path');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WatchIgnorePlugin = require('watch-ignore-webpack-plugin');

const SUPPORTED_BROWSERS = ['last 2 versions', 'ie 9', 'ie 10'];

const sharedConfig = {
  output: {
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.md'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { loose: true, modules: false, targets: { browsers: SUPPORTED_BROWSERS } }],
            'react',
          ],
          plugins: ['transform-object-rest-spread'],
        },
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
    ],
  },
};

module.exports = (env) => [
  merge.smart(sharedConfig, {
    entry: {
      static: './src/server/index.js',
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'umd',
    },

    plugins: [
      new WatchIgnorePlugin([path.resolve(__dirname, 'dist')]),
      new CleanWebpackPlugin(['dist'], { watch: true }),
      new StaticSiteGeneratorPlugin({
        crawl: true,
        entry: 'static',
      }),
    ],
  }),

  merge.smart(sharedConfig, {
    entry: './src/client/index.js',

    output: {
      path: path.resolve(__dirname, 'dist', 'js'),
    },

    devtool: env === 'dev' ? 'inline-source-map' : false,

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins() { return [precss, autoprefixer({ browsers: SUPPORTED_BROWSERS })]; },
                },
              },
            ],
            fallback: 'style-loader',
          }),
        },
      ],
    },

    plugins: [
      new ExtractTextPlugin('../css/main.css'),
    ],
  }),
];

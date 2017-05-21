const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const cssImport = require('postcss-import');
const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');

const SUPPORTED_BROWSERS = ['last 2 versions', 'ie 9', 'ie 10'];

module.exports = (env) => {
  const plugins = [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin(env === 'dev' ? 'main.css' : 'main.[contenthash].css'),
    new PurifyCSSPlugin({
      minimize: true,
      paths: glob.sync([
        path.join(__dirname, 'src', 'server', 'page-container.js'),
        path.join(__dirname, 'src', 'common', 'components', '*.jsx'),
        path.join(__dirname, 'src', 'client', 'components', '*.jsx'),
      ]),
    }),
    new StaticSiteGeneratorPlugin({
      crawl: true,
      entry: 'static',
    }),
  ];

  if (env === 'analyse') {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    entry: {
      static: './src/server/index.js',
      main: ['babel-polyfill', './src/client/index.js'],
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'umd',
      filename: env === 'dev' ? '[name].js' : '[name].[chunkhash].js',
    },

    devtool: env === 'dev' ? 'inline-source-map' : false,

    resolve: {
      extensions: ['.js', '.jsx', '.css', '.md'],
    },

    module: {
      rules: [
        {
          test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
          use: [
            {
              loader: 'file-loader',
              options: { name: 'images/[name].[ext]', useRelativePath: env === 'prod' },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins() { return [cssImport, precss, autoprefixer({ browsers: SUPPORTED_BROWSERS })]; },
                },
              },
            ],
            fallback: 'style-loader',
          }),
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
            presets: [
              ['env', { loose: true, modules: false, targets: { browsers: SUPPORTED_BROWSERS } }],
              'react',
            ],
            plugins: ['transform-object-rest-spread', 'transform-class-properties'],
          },
        },
      ],
    },

    plugins,
  };
};

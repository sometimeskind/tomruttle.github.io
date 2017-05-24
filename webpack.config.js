const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const cssImport = require('postcss-import');
const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');
const merge = require('webpack-merge');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const customMedia = require('postcss-custom-media');

const SUPPORTED_BROWSERS = ['last 2 versions', 'ie 9', 'ie 10'];

const sharedConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.md'],
  },

  module: {
    rules: [
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
};

const getServerPlugins = (filenames) => [
  new StaticSiteGeneratorPlugin({
    crawl: true,
    entry: 'server',
    locals: filenames ? { filenames } : {},
  }),
  new WorkboxPlugin({
    globDirectory: 'dist',
    staticFileGlobs: ['**/*.{html,js,css,svg,jpeg,png}'],
    globIgnores: ['server*.js'],
    swDest: path.join(__dirname, 'dist', 'sw.js'),
  }),
];

module.exports = (env) => {
  const plugins = [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin(env === 'dev' ? 'main.css' : 'main.[contenthash].css'),
    new PurifyCSSPlugin({
      minimize: env !== 'dev',
      paths: glob.sync([
        path.join(__dirname, 'src', 'server', 'page-container.js'),
        path.join(__dirname, 'src', 'common', 'components', '**/*.jsx'),
        path.join(__dirname, 'src', 'client', 'components', '**/*.jsx'),
      ]),
    }),
  ];

  const buildPlugins = [
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8: true, keep_fnames: true },
      compress: { screw_ie8: true },
      comments: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
  ];

  if (env === 'build') {
    plugins.push(...buildPlugins);
  } else {
    if (env === 'analyse') {
      plugins.push(new BundleAnalyzerPlugin());
    }

    plugins.push(...getServerPlugins());
  }

  return merge.smart(sharedConfig, {
    entry: {
      server: './src/server/index.js',
      main: ['babel-polyfill', './src/client/index.js'],
    },

    output: {
      filename: env === 'dev' ? '[name].js' : '[name].[chunkhash].js',
    },

    devtool: env === 'dev' ? 'inline-source-map' : false,

    resolve: {
      extensions: ['.css'],
    },

    module: {
      rules: [
        {
          test: /\.(jpe?g|gif|png|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: { name: 'images/[name].[ext]', useRelativePath: env !== 'dev' },
            },
          ],
        },
        {
          test: /\.json$/,
          use: [
            {
              loader: 'file-loader',
              options: { name: '[name].[ext]', useRelativePath: env !== 'dev' },
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
                  plugins() { return [cssImport, customMedia, precss, autoprefixer({ browsers: SUPPORTED_BROWSERS })]; },
                },
              },
            ],
            fallback: 'style-loader',
          }),
        },
      ],
    },

    plugins,
  });
};

module.exports.sharedConfig = sharedConfig;
module.exports.getServerPlugins = getServerPlugins;

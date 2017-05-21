const path = require('path');
const merge = require('webpack-merge');
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

const sharedConfig = {
  output: {
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
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
          plugins: ['transform-object-rest-spread', 'transform-class-properties'],
        },
      },
    ],
  },
};

module.exports = (env) => {
  const clientPlugins = [
    new ExtractTextPlugin('../css/main.css'),
    new PurifyCSSPlugin({
      minimize: true,
      paths: glob.sync([
        path.join(__dirname, 'src', 'server', 'page-container.js'),
        path.join(__dirname, 'src', 'common', 'components', '*.jsx'),
        path.join(__dirname, 'src', 'client', 'components', '*.jsx'),
      ]),
    }),
  ];

  if (env === 'analyse') {
    clientPlugins.push(new BundleAnalyzerPlugin());
  }

  return [
    merge.smart(sharedConfig, {
      entry: {
        static: './src/server/index.js',
      },

      output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
      },

      resolve: {
        extensions: ['.md'],
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
        ],
      },

      plugins: [
        new CleanWebpackPlugin(['dist']),
        new StaticSiteGeneratorPlugin({
          crawl: true,
          entry: 'static',
        }),
      ],
    }),

    merge.smart(sharedConfig, {
      entry: ['./src/client/index.js'],

      output: {
        path: path.resolve(__dirname, 'dist', 'js'),
      },

      devtool: env === 'dev' ? 'inline-source-map' : false,

      resolve: {
        extensions: ['.css'],
      },

      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter',
        'react-router-dom': 'ReactRouterDOM',
      },

      module: {
        rules: [
          {
            test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
            use: [
              {
                loader: 'file-loader',
                options: { name: '../images/[name].[ext]', useRelativePath: env === 'prod' },
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
        ],
      },

      plugins: clientPlugins,
    }),
  ];
};

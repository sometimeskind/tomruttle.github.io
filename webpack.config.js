// Some of this comes from https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31;

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const pkg = require('./package.json');
const NameAllModulesPlugin = require('name-all-modules-plugin');

const getExtractTextLoader = (modules = false) => [
  'isomorphic-style-loader',
  {
    loader: 'css-loader',
    options: {
      modules,
      minimize: true,
      sourceMap: true,
      importLoaders: 1,
      localIdentName: 'hello_[name]__[local]--[hash:base64:5]',
    },
  },
  'postcss-loader',
];

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
            ['env', { loose: true, modules: false, targets: { browsers: pkg['supported-browsers'] } }],
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
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin((chunk) => (chunk.name ? chunk.name : chunk.modules.map((m) => path.relative(m.context, m.request)).join('-'))),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) { return module.context && module.context.indexOf('node_modules') !== -1; },
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
    new NameAllModulesPlugin(),
  ];

  if (env === 'build') {
    plugins.push(...buildPlugins);
  } else {
    plugins.push(...getServerPlugins());

    if (env === 'analyse') {
      plugins.push(new BundleAnalyzerPlugin());
    }
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
          exclude: /\.module.css$/,
          use: getExtractTextLoader(false),
        },
        {
          test: /\.module.css$/,
          use: getExtractTextLoader(true),
        },
      ],
    },

    plugins,
  });
};

module.exports.sharedConfig = sharedConfig;
module.exports.getServerPlugins = getServerPlugins;

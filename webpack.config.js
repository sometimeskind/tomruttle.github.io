// Some of this comes from https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31;

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
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
      importLoaders: 1,
      localIdentName: 'hello_[name]__[local]--[hash:base64:5]',
    },
  },
  'postcss-loader',
];

module.exports = (env) => {
  const plugins = [
    new CleanWebpackPlugin(['dist']),
    // Reinstate these chunks when static-site-generator PRs are merged.
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks(module) { return module.context && module.context.indexOf('node_modules') !== -1; },
    // }),
    // new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
    new StaticSiteGeneratorPlugin({
      crawl: true,
      entry: 'server',
    }),
    new WorkboxPlugin({
      globDirectory: 'dist',
      staticFileGlobs: ['**/*.{html,js,svg,jpeg,png}'],
      globIgnores: ['server*.js'],
      swDest: path.join(__dirname, 'dist', 'sw.js'),
    }),
  ];

  if (env !== 'dev') {
    plugins.push(...[
      new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
      new webpack.NamedModulesPlugin(),
      new webpack.NamedChunksPlugin((chunk) => (chunk.name ? chunk.name : chunk.modules.map((m) => path.relative(m.context, m.request)).join('-'))),
      new NameAllModulesPlugin(),
    ]);
  }

  if (env === 'analyse') {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    entry: {
      server: './src/server/index.js',
      main: ['babel-polyfill', './src/client/index.js'],
    },

    output: {
      filename: env === 'dev' ? '[name].js' : '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'umd',
    },

    resolve: {
      extensions: ['.js', '.jsx', '.md', '.css'],
    },

    devtool: env === 'dev' ? 'inline-source-map' : false,

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

    plugins,
  };
};

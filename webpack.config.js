// Some of this comes from https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const pkg = require('./package.json');

module.exports = (env) => {
  const plugins = [
    new CleanWebpackPlugin(['dist']),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.NamedChunksPlugin((chunk) => (chunk.name ? chunk.name : chunk.modules.map((m) => path.relative(m.context, m.request)).join('-'))),

    new StaticSiteGeneratorPlugin({
      crawl: true,
      entry: 'server',
    }),

    new WorkboxPlugin({
      globDirectory: 'dist',
      globPatterns: ['**/*.{html,js,svg,jpeg,png}'],
      globIgnores: ['server*.js', 'sitemap.*'],
      swDest: path.join(__dirname, 'dist', 'sw.js'),
    }),
  ];

  if (env === 'dev') {
    plugins.push(new webpack.NamedModulesPlugin());
  } else if (env === 'analyse') {
    plugins.push(new BundleAnalyzerPlugin());
  } else if (env === 'prod') {
    plugins.push(...[
      new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
      new webpack.HashedModuleIdsPlugin(),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks({ context = '' }) { return context.includes('node_modules'); },
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime',
        chunks: ['main', 'vendor'],
      }),
    ]);
  }

  return {
    entry: {
      server: './src/server/index.js',
      main: './src/client/index.js',
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

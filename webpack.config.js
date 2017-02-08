const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const DashboardPlugin = require('webpack-dashboard/plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const dashboard = require('webpack-dashboard');

const getPlugins = () => {
  const env = !process.env.NODE_ENV || process.env.NODE_ENV.trim() !== 'production' ? 'development' : 'production';
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'app/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      filename: 'index.html',
      inject: 'body',
    }),
  ];
  if (env === 'production') {
    return [
      ...plugins,
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        sourceMap: false,
        output: {
          comments: false,
        },
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
    ];
  }
  return [
    ...plugins,
    new DashboardPlugin(dashboard.setData),
    new WriteFilePlugin({
      log: false,
    }),
  ];
};

const buildDirectory = path.join(process.cwd(), 'build');

module.exports = {
  entry: [
    path.join(process.cwd(), 'app/app.js'),
  ],
  output: {
    path: buildDirectory,
    filename: 'main.js',
    publicPath: '/',
  },
  devtool: '#eval',
  devServer: {
    colors: true,
    contentBase: buildDirectory,
    outputPath: buildDirectory,
    historyApiFallback: true,
    inline: true,
    progress: true,
    quiet: true,
    open: true,
    stats: 'errors-only',
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['latest', 'react', 'stage-0'],
        },
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: getPlugins(),
};

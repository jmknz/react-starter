const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css'],
  },
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    filename: '[name]-[hash:5].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:5].css',
      chunkFilename: '[id]-[hash:5].css',
    }),
    new DotenvWebpack({
      path: path.resolve(__dirname, '.env'),
    }),
    new CleanWebpackPlugin({
      dry: false,
      verbose: true,
    }),
  ],
  devtool: 'source-map',
  devServer: {
    port: 9000,
    compress: true,
    contentBase: path.resolve(__dirname, 'build'),
    hot: true,
    open: true,
    historyApiFallback: true,
    overlay: true,
    headers: {},
    proxy: {},
    quiet: false,
    stats: 'errors-warnings',
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
};

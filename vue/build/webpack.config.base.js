const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = require('../config')

function resolve(filepath) {
  return path.resolve(__dirname, '..', filepath)
}

module.exports = {
  entry: {
    main: resolve('src/main'),
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'dist/js/[name].js',
    chunkFilename: 'dist/js/[name].chunk.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'src': resolve('src'),
      '@': resolve('src/app'),
      'assets': resolve('src/assets'),
      'utils': resolve('src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'dist/images/[name].[contenthash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'dist/fonts/[name].[contenthash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CopyWebpackPlugin([
      { from: resolve('src/assets/images'), to: resolve('public/dist/images') }
    ]),
    // webpack bootstrap logic
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    // common module
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: 3,
      children: true,
      // (选择 chunks，或者忽略该项设置以选择全部 chunks)
      // names: ["app", "subPageA"],
      // (创建一个异步 公共chunk)
      // async: true,
    }),
  ],
}

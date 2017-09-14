const os = require('os')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const dir = require('../dir_var')
// TODO: merge config
const baseConfig = require('./base.config')

module.exports = merge(baseConfig, {
  output: {
    filename: 'dist/js/[name].[chunkhash:8].js',
    chunkFilename: 'dist/js/[name].chunk.[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: dir.src,
        options: {
          extractCSS: true,
        },
      },
      {
        test: /\.(css|styl)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'stylus-loader',
            },
          ]
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'dist/styles/[name].[contenthash:8].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(dir.public, 'index.html'),
      template: path.resolve(dir.src, 'index.html'),
      inject: true,
      chunks: ['main'],
      chunksSortMode: 'dependency',
    }),
    new UglifyJsPlugin({
      parallel: {
        cache: true,
        workers: os.cpus().length,
      },
    }),
    new PrerenderSpaPlugin(
      path.resolve(dir.public),
      ['/', '/404']
    ),
  ],
})

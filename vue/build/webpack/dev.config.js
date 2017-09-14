const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const dir = require('../dir_var')
// TODO: merge config
const baseConfig = require('./base.config')

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach((name) => {
  baseConfig.entry[name] = ['./build/webpack/hot'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: dir.src,
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader?sourceMap', 'less-loader'],
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader?sourceMap', 'stylus-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(dir.public, 'index.html'),
      template: path.resolve(dir.src, 'index.dev.html'),
      inject: true,
      chunksSortMode: 'dependency',
    }),
    new FriendlyErrorsPlugin(),
  ],
  devtool: '#cheap-module-eval-source-map',
})

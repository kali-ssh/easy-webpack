const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const dir = require('../dir_var')
// TODO: merge config
const config = require('../../config')

module.exports = {
  entry: {
    main: dir.src,
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
    extensions: ['.js', '.vue'],
    alias: {
      public: dir.public,
      '@': dir.src,
      api: dir.api,
      mixins: dir.mixins,
      components: dir.components,
      layout: dir.layout,
      views: dir.views,
      service: dir.service,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre',
        include: dir.src,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: dir.src,
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
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(dir.root, 'build/dll'),
    //   manifest: path.resolve(dir.root, 'build/dll/vendor1.manifest.json'),
    // }),
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(dir.root, 'build/dll'),
    //   manifest: path.resolve(dir.root, 'build/dll/vendor2.manifest.json'),
    // }),
  ],
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios',
  },
}

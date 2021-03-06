const os = require('os')
const path = require('path')
const webpack = require('webpack')

function resolve(filepath) {
  return path.resolve(__dirname, '..', filepath)
}

module.exports = {
  entry: {
    vendor: ['vue-router'],
  },
  output: {
    path: resolve('dist'),
    filename: '[hash:8].dll.js',
    library: '[name]_[hash:8]',                   // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,                   // 必填项，用来标志manifest中的路径
      path: resolve('build/dll/[name]-manifest.json'), // 必填项，存放manifest的路径
      name: '[name]_[hash:8]',                                // 必填项，manifest的name
    }),
    new webpack.optimize.UglifyJsPlugin({
      parallel: {
        cache: true,
        workers: os.cpus().length,
      },
      compress: { warnings: false },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}

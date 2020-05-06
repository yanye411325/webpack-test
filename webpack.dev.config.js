const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]_[hash:5].js',
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // 开发环境配置
  // optimization: {
  //   usedExports: true, // 哪些导出的模块被使⽤了，再做打包
  // },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    port: 8081,
    hot: true,
    hotOnly: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9001',
      },
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'kevin test',
      template: './index.html',
      filename: 'index.html',
    }),
    // 清除⽆⽤ css
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径⽂件
        path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对 html ⽂件进⾏ tree shaking
        path.resolve(__dirname, './src/*.js'),
      ]),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

module.exports = merge(baseConfig, devConfig)

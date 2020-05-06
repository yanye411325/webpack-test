const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name]_[hash:5].js',
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // 开发环境配置
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
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

module.exports = merge(baseConfig, devConfig)
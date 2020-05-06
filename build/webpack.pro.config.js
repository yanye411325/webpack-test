const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const proConfig = {
  output: {
    path: path.resolve(__dirname, '../bundle'),
    filename: 'js/[name]_[hash:5].js'
  },
  mode: 'production',
  
  plugins: [
    new htmlWebpackPlugin({
      title: 'kevin test',
      template: './index.html',
      filename: 'index.html',
      minify: {
        // 压缩HTML⽂件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空⽩符与换⾏符
        minifyCSS: true // 压缩内联css
      },
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'), //引⼊cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true },
      },
    })
  ],
}

module.exports = merge(baseConfig, proConfig)

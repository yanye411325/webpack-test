const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const baseConfig = require('./webpack.base.config')
const proConfig = {
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'js/[name]_[hash:5].js',
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
        minifyCSS: true, // 压缩内联css
      },
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'), //引⼊cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true },
      },
    }),
    // 清除⽆⽤ css
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径⽂件
        path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对 html ⽂件进⾏ tree shaking
        path.resolve(__dirname, './src/*.js'),
      ]),
    }),
  ],
}

module.exports = merge(baseConfig, proConfig)

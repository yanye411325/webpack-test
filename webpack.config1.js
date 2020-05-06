//! webpack 配置文件
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 入口文件 String | Array | obj
  entry: './src/index.js',
  // entry: ['./src/index.js', './src/other.js'],
  // entry: {
  //   main: './src/index.js',
  //   other: './src/other.js'
  // },
  //! 开发环境 'development' 'production'
  mode: 'development',
  // 出口
  output: {
    // path 绝对路径
    path: path.resolve(__dirname,'./dist'),
    //! placeholder占位  与entry对象形式对应
    // filename: '[name]_[chunkhash:5].js',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jpg$/,
        use:{
          loader:'file-loader',
          options: {
            // name: '[name]_[hash].[ext]'
            name: '[name]_[hash:5].[ext]'
          }
        }
      }
    ]
  },
  plugins:[
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    })
  ]
}
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MyWebpackPlugin = require('./my-plugin/my-webpack-plugin')
module.exports = {
  entry: './src/my-test.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash:5].js',
  },
  mode: 'development',
  plugins: [new CleanWebpackPlugin(),
    new MyWebpackPlugin({
      name:'hello Kevin'
    })],
}

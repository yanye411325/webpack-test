const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: './src/my-test.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash:5].js',
  },
  mode: 'development',
  resolveLoader:{
    modules: ['node_modules', './myloader']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['rereplace-loader',
          {
            loader: 'replace-loader',
            options: {
              name: 'kevin',
            },
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
}

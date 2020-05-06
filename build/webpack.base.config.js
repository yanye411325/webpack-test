const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src'),
    },
    modules: [path.resolve(__dirname, '../node_modules')],
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // {
          //   loader: 'style-loader',
          //   options: {
          //     injectType: 'singletonStyleTag',
          //   },
          // },
          // 'css-loader',
        ],
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, '../src'),
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src'),
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:5].[ext]',
            outputPath: 'images/',
          },
        },
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:5].css'
    }),
    new CleanWebpackPlugin()
  ]
}

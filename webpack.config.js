const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: {
    main: './src/react-test.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]_[hash:5].js',
    // publicPath: '//cdnURL.com', //指定存放JS⽂件的CDN地址
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    modules: [path.resolve(__dirname, './node_modules')],
    extensions: ['.js'],
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
  //线上不推荐开启
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src'),
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
        include: path.resolve(__dirname, './src'),
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, './src'),
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        include: path.resolve(__dirname, './src'),
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
        include: path.resolve(__dirname, './src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader'
      // }
    ],
  },
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
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:5].css'
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'), //引⼊cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true },
      },
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new VueLoaderPlugin()
  ],
}

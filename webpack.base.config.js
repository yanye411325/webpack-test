const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DllReferencePlugin } = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
module.exports = {
  entry: './src/react-test.js',
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    modules: [path.resolve(__dirname, './node_modules')],
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src'),
        use: [
          'HappyPack/loader?id=css',
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
        use: ['HappyPack.loader?id=pics'],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        exclude: /node_modules/,
        use: ['HappyPack/loader?id=babel'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:5].css',
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, './dll/react.dll.js'), // 对 应的 dll ⽂件路径
    }),
    new DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dll/reactmanifest.json'),
    }),
    new HappyPack({
      id: 'css',
      loaders: [MiniCssExtractPlugin.loader, 'css-loader'],
      // threads: 1,
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      id: 'pics',
      loaders: [
        {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:5].[ext]',
            outputPath: 'images/',
          },
        },
      ],
      // threads: 1,
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader'],
      // threads: 2,
      threadPool: happyThreadPool,
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    //帮我们⾃动做代码分割
    splitChunks: {
      chunks: 'all', //默认是⽀持异步，我们使⽤all
      name: true,
      cacheGroups: {
        //缓存组
        react: {
          test: /react|react-dom/,
          name: 'react',
        },
        lodash: {
          test: /lodash/,
          name: 'lodash',
        },
      },
    },
  },
}


const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const setMpa = ()=>{
  const entry = {}
  const htmlWebpaclPlugin = []
  const entryFiles = glob.sync(path.join(__dirname,'./pages/*/index.js'))
  console.log(entryFiles)
  entryFiles.map((item,index) => {
    const entryFile = entryFiles[index]
    const match = entryFile.match(/pages\/(.*)\/index\.js$/)
    console.log(match)
    const fileName = match && match[1]
    entry[fileName] = entryFile
    htmlWebpaclPlugin.push(
      new HtmlWebpackPlugin({
        template:`pages/${fileName}/index.html`,
        filename: `${fileName}.html`,
        chunks: [fileName]
      })
    )

  })
  return {entry, htmlWebpaclPlugin}
}
const {entry, htmlWebpaclPlugin} = setMpa()
module.exports = {
  entry: entry,
  output:{
    path: path.resolve(__dirname, 'mpa'),
    filename: '[name]_[hash:5].js'
  },
  mode: 'development',
  watch: true,
  plugins: [
    ...htmlWebpaclPlugin,
    new CleanWebpackPlugin()
  ]
}
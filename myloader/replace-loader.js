
const loaderUtils = require("loader-utils")
module.exports = function(source) {

  const options = loaderUtils.getOptions(this);

  // return source.replace('kevin', 'my-loader')

  // const content = source.replace('kevin', 'my-loader111')
  // this.callback(null,content)
  const callBack = this.async();
  setTimeout(() => {
    callBack(null, source.replace(options.name, 'one replace'))
  },3000)

}
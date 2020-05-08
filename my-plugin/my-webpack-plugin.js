module.exports = class MyWebpackPlugin {
  constructor(options){
    console.log(options)
  }

  // apply(compiler){
  //   compiler.hooks.emit.tapAsync("MyWebpackPlugin", (compilation, cb) => {
  //     compilation.assets["myText.txt"] = {
  //       source: function(){
  //         return "hello myPlugin";
  //       },
  //       size: function(){
  //         return 20;
  //       }
  //     };
  //     cb();
  //   })
  // }
  apply(compiler){
    compiler.hooks.emit.tap("MyWebpackPlugin",compilation => {
      console.log('开始生成')
    })
  }
}
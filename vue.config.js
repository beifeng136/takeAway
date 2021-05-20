const path = require('path');//引入path模块
// const webpack = require('webpack')// 引入webpack 模块
function resolve(dir)
{
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}
//注意 store 和 router 没必要配置
module.exports = {
  lintOnSave: false,
  chainWebpack: config =>
  {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
      .set('~', resolve(""))
  },
  /* 引入全局的less 使用  style-resources-loader 插件*/
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less 文件覆盖（文件路径为绝对路径）
          'hack': `true; @import "${resolve('./src/assets/css/Style.less')}";`
          // 'hack': `true; @import "${path.join(__dirname, './src/assets/style/less.less')}";`
        },
        javascriptEnabled: true
      }
    }
  }

}

/* 添加全局样式的方法 */
function addStyleResource(rule)
{
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/css/Style.less'), // 需要全局导入的less
      ],
    })
}
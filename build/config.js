var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static', // 默认为static, dist下js、css及其他静态资源文件父路径
    assetsPublicPath: 'static',   // 默认为static, 静态资源目录
    productionSourceMap: false,
    uglify: true,
    extractCss: true,
    forceLint: true,
    notVendor: 'node_modules/selectize', // 依赖库强制不打入 vendor: String or Array：主要用于设置npm依赖
    forceVendor: 'src/public/main.js' // 自己的库强制打入 vendor：String or Array (优先最高): 主要用于设置自己的本地文件
  },
  dev: {
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: 'static',
    proxyTable: { },
    cssSourceMap: true
  },
  pageEntry: './src/pages/**/index.js',
  homepage: '/home.html'
}

const path = require('path')
const config = require('./config')
const glob = require('glob')

const isPro = process.env.NODE_ENV === 'production'

exports.assetsPath = function (_path) {
  const assetsSubDirectory = isPro
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.getEntries = function (libs) {
  const entries = {}
  if (libs && libs.length) {
    entries.vendor = libs
  }
  if (!/\*/.test(config.pageEntry)) { // 单页面入口处理
    entries.app = config.pageEntry
  } else {
    // 多页入口处理
    var files = glob.sync(config.pageEntry)
    files.forEach(function (filepath) {
      // 取倒数第二层(pages下面的文件夹)做包名
      var split = filepath.split('/')
      var name = split[split.length - 2]
      entries[name] = filepath
    })
  }
  return entries
}

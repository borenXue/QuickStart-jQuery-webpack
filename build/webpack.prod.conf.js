const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const utils = require('./utils')
const commonWebpackConfig = require('./webpack.common.conf')
// https://github.com/webpack/webpack/issues/1315
var WebpackMd5Hash = require('webpack-md5-hash')

const proWebpackConfig = merge(commonWebpackConfig, {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: config.build.extractCss ? ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) : 'style-loader!css-loader'
      }
    ]
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': process.env.NODE_ENV
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['manifest', 'vendor'],
      minChunks: function (module, count) {
        if (!module.resource || !/\.js$/.test(module.resource)) {
          return false
        }
        return matchForceVendor(module.resource) || (!matchNotVendor(module.resource) && module.resource.indexOf(getPath('node_module')) === 0)
      }
    })
  ]
})

function getPath (item) {
  const projectDir = path.join(__dirname, '../')
  return path.join(projectDir, item)
}

const matchForceVendor = (resource) => {
  if (config.build.forceVendor && config.build.forceVendor !== '') {
    if (typeof config.build.forceVendor === 'string') {
      return resource.indexOf(getPath(config.build.forceVendor)) === 0
    } else if (Array.isArray(config.build.forceVendor)) {
      for (const item of config.build.forceVendor) {
        if (resource.indexOf(getPath(item)) === 0) {
          return true
        }
      }
    }
  }
  return false
}

const matchNotVendor = (resource) => {
  if (config.build.notVendor && config.build.notVendor !== '') {
    if (typeof config.build.notVendor === 'string') {
      return resource.indexOf(getPath(config.build.notVendor)) === 0
    } else if (Array.isArray(config.build.notVendor)) {
      for (const item of config.build.notVendor) {
        if (resource.indexOf(getPath(item)) === 0) {
          return true
        }
      }
    }
  }
  return false
}

if (config.build.uglify) {
  proWebpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
}

var entries = utils.getEntries()
Object.keys(entries).forEach(function (name) {
  // 每个页面生成一个html
  var plugin = new HtmlWebpackPlugin({
    filename: name + '.html',
    template: entries[name].slice(0, -3) + '.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunksSortMode: 'dependency',
    // 每个包引入自己的依赖，公共依赖
    chunks: ['manifest', 'vendor', name],
    hash: true
  })

  proWebpackConfig.plugins.push(plugin)
})

if (config.build.forceLint) {
  const WebpackShellPlugin = require('webpack-shell-plugin')
  proWebpackConfig.plugins.push(
    new WebpackShellPlugin({
      onBuildStart: ['yarn lint'],
      onBuildEnd: []
    })
  )
}

module.exports = proWebpackConfig

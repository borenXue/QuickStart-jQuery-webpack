const webpack = require('webpack')
const merge = require('webpack-merge')
const utils = require('./utils')
const config = require('./config')
const commonWebpackConfig = require('./webpack.common.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrors = require('friendly-errors-webpack-plugin')

Object.keys(commonWebpackConfig.entry).forEach(function (name) {
  commonWebpackConfig.entry[name] = ['./build/dev-hot-helper.js'].concat(commonWebpackConfig.entry[name])
})

let cssLoader = 'style-loader!css-loader'
if (config.dev.cssSourceMap) {
  cssLoader += '?sourceMap'
}

 // + config.dev.cssSourceMap ? 'sourceMap' : ''

const devWebpackConfig = merge(commonWebpackConfig, {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: cssLoader
      }
    ]
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': process.env.NODE_ENV
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrors()
  ]
})

var entries = utils.getEntries()
Object.keys(entries).forEach(function (name) {
  const plugin = new HtmlWebpackPlugin({
    filename: name + '.html',
    template: entries[name].slice(0, -3) + '.html',
    inject: true,
    projectPath: 'static',
    chunks: [name]
  })
  devWebpackConfig.plugins.push(plugin)
})

module.exports = devWebpackConfig

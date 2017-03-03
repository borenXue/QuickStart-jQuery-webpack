var path = require('path')
var config = require('./config.js')
var utils = require('./utils.js')
var projectRoot = path.resolve(__dirname, '../')
const webpack = require('webpack')

const isPro = process.env.NODE_ENV === 'production'

module.exports = {
  entry: utils.getEntries(),
  output: {
    path: config.build.assetsRoot,
    publicPath: isPro ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    alias: {
      jquery: 'jquery/dist/jquery.min.js'
    },
    modules: ['src', 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      eslint: {
        configFile: path.join(__dirname, '.eslintrc.js'),
        formatter: require('eslint-friendly-formatter'),
        useEslintrc: false
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}

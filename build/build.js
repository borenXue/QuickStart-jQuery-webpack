require('shelljs/global')
const path = require('path')
const config = require('./config')
const ora = require('ora')
const webpack = require('webpack')

const webpackConfig = require('./webpack.prod.conf')

const isPro = process.env.NODE_ENV === 'production'

if (!isPro) {
  process.exit(1)
}

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)

rm('-rf', assetsPath)               // eslint-disable-line no-undef
mkdir('-p', assetsPath)             // eslint-disable-line no-undef
cp('-R', 'static/*', assetsPath)    // eslint-disable-line no-undef

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})

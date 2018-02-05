var
  fs = require('fs'),
  path = require('path'),
  config = require('../config'),
  webpack = require('webpack'),
  merge = require('webpack-merge'),
  cssUtils = require('./css-utils'),
  baseWebpackConfig = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/hot-reload.js', baseWebpackConfig.entry[name]]
})

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  module: {
    rules: cssUtils.styleRules({
      sourceMap: config.dev.cssSourceMap,
      postcss: true
    })
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pwa/index.html',
      inject: true,
      serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
        './service-worker-dev.js'), 'utf-8')}</script>`
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'firebase-messaging-sw.js'),
      to: 'firebase-messaging-sw.js',
    }]),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'offline-sw.js'),
      to: 'offline-sw.js',
    }]),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/AppServiceWorker/index.js'),
      to: 'AppServiceWorker/index.js',
    }]),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/pwa/carzuz_logo.png'),
      to: 'carzuz_logo.png',
    }]),
    new FriendlyErrorsPlugin({
      clearConsole: config.dev.clearConsoleOnRebuild
    })
  ]
})

const path = require('path')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { rootPath, baseConfig } = require('./base.config.js')

module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: 'localhost',
    port: 8999,
    open: ['/'],
    hot: true,
  },
  entry: { 'index': [path.resolve(rootPath, 'test', 'dev-test.js')] },
  output: {
    filename: '[name].js',
    path: path.resolve(rootPath, 'test'),
    publicPath: '/',
  },
  plugins: [
    ...baseConfig.plugins,
    // new HardSourceWebpackPlugin(),
    // new HardSourceWebpackPlugin.ExcludeModulePlugin([]),
    new HtmlWebpackPlugin({
      template: path.resolve(rootPath, 'test', 'dev.html'),
      filename: 'index.html',
    }),
  ],
}

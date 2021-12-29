const path = require('path')
const WebpackBar = require('webpackbar')

const rootPath = path.resolve(__dirname, '../')

const baseConfig = {
  entry: { index: [path.resolve(rootPath, 'src', 'index.ts')] },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
      },
    ],
  },

  plugins: [
    new WebpackBar(),
  ],
}

module.exports = {
  rootPath,
  baseConfig,
}

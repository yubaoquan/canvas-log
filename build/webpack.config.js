const path = require('path');
const { rootPath, baseConfig } = require('./base.config.js')

module.exports = {
  ...baseConfig,
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(rootPath, 'dist'),
    libraryTarget: 'umd',
    library: 'CanvasLog',
  },
};

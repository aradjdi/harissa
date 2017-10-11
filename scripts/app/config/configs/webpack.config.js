const pathUtils = require('../../pathUtils');

module.exports = {
  entry: [
    pathUtils.srcDir + '/index.js'
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: pathUtils.distDir
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': pathUtils.srcDir
    }
  },
}
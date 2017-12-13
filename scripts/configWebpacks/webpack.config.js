const webpack = require('webpack');
const paths = require('../_paths');

module.exports = {
  entry: [
    paths.srcDir + '/index.js'
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': paths.srcDir,
      vue: 'vue/dist/vue.js'
    }
  }
}
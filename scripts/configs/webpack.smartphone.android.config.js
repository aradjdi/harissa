const paths = require('../_paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
    path: paths.smartphoneDir + '/merges/android'
  },
  plugins: [
    new CleanWebpackPlugin([paths.smartphoneDir + '/merges/android'], {
      root: paths.destDir
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: `${paths.destDir}/src/index.html`
    }),
    new webpack.DefinePlugin({
      PLATFORM: 'android',
      CONTEXT: 'smartphone'
    })
  ]
}
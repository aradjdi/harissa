const paths = require('../_paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputPath = `${paths.cordovaDir}/${process.env.NODE_ENV}/tablet/merges/ios`;

module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
    path: outputPath
  },
  plugins: [
    new CleanWebpackPlugin([outputPath], {
      root: paths.appDir
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: `${paths.appDir}/src/index.html`
    })
  ]
}
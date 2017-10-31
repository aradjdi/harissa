const paths = require('../_paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
    path: paths.tabletDir + '/merges/ios'
  },
  plugins: [
    new CleanWebpackPlugin([paths.tabletDir + '/merges/ios'], {
      root: paths.destDir
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: `${paths.destDir}/src/index.html`
    }),
    new webpack.DefinePlugin({
      PLATFORM: 'ios',
      CONTEXT: 'tablet'
    })
  ]
}
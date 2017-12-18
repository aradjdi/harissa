const paths = require('../_paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
    path: paths.distDir,
  },
  plugins: [
    new CleanWebpackPlugin([paths.distDir], {
      root: paths.appDir,
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: `${paths.appDir}/src/index.html`,
    }),
  ],
};

const paths = require('../_paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const getOutputPath = () => `${paths.cordovaDir}/${process.env.NODE_ENV}/tablet/merges/ios`;

module.exports = {
    output: {
        filename: '[name].[chunkhash].js',
        path: getOutputPath(),
    },
    plugins: [
        new CleanWebpackPlugin([getOutputPath()], {
            root: paths.appDir,
        }),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: `${paths.appDir}/src/index.html`,
        }),
    ],
};

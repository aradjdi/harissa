const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'runtime' }),
  ],
};

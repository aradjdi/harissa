const Q = require('q');
const webpackCommand = require('./_webpack');
const merge = require('./_merge');

const defaultConfig = require('./configs/webpack.config');
const webConfig = require('./configs/webpack.web.config');
const assetsConfig = require('./configs/webpack.assets.config');
const babelConfig = require('./configs/webpack.babel.config');
const eslintConfig = require('./configs/webpack.eslint.config');
const sourcemapConfig = require('./configs/webpack.sourcemap.config');
const serveConfig = require('./configs/webpack.serve.config');
const getServeConfig = () => merge.mergeConfig(
  defaultConfig, webConfig, assetsConfig,
  babelConfig, eslintConfig, sourcemapConfig,
  serveConfig
);

Q()
  .then(() => getServeConfig())
  .then(config => webpackCommand.createCompiler(config))
  .then(compiler => webpackCommand.launchDevServer(compiler));
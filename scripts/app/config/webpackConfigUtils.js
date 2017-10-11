const mergeUtils = require('./_mergeUtils');
const defaultConfig = require('./configs/webpack.config');
const assetsConfig = require('./configs/webpack.assets.config');
const eslintConfig = require('./configs/webpack.eslint.config');
const babelConfig = require('./configs/webpack.babel.config');
const treeShakingConfig = require('./configs/webpack.treeshaking.config');
const sourcemapConfig = require('./configs/webpack.sourcemap.config');
const serveConfig = require('./configs/webpack.serve.config');
const coverageConfig = require('./configs/webpack.coverage.config');
const devServerConfig = require('./configs/webpack.devserver.config');

const getBuildConfig = () => mergeUtils.mergeConfig(
  defaultConfig, assetsConfig,
  babelConfig, eslintConfig
);
const getReleaseConfig = () => mergeUtils.mergeConfig(
  getBuildConfig(),
  treeShakingConfig
);
const getServeConfig = () => mergeUtils.mergeConfig(
  getBuildConfig(),
  sourcemapConfig,
  serveConfig
);
const getTestConfig = () => mergeUtils.mergeConfig(
  babelConfig,
  sourcemapConfig
);
const getCoverageConfig = () => mergeUtils.mergeConfig(
  coverageConfig,
  getTestConfig()
);
const getDevServerConfig = () => devServerConfig;

module.exports = {
  getBuildConfig: getBuildConfig,
  getReleaseConfig: getReleaseConfig,
  getServeConfig: getServeConfig,
  getTestConfig: getTestConfig,
  getCoverageConfig: getCoverageConfig,
  getDevServerConfig: getDevServerConfig
}
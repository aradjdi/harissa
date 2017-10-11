const mergeUtils = require('./_mergeUtils');
const webpackConfigUtils = require('./webpackConfigUtils');
const karmaDefault = require('./configs/karma.conf');
const karmaServe = require('./configs/karma.serve.conf');
const karmaCoverage = require('./configs/karma.coverage.conf');
const karmaTest = require('./configs/karma.test.conf');

const getServeConf = () => mergeUtils.mergeSimpleConfig(
  karmaDefault,
  karmaServe,
  {webpack: webpackConfigUtils.getTestConfig()}
);
const getCoverageConf = () => mergeUtils.mergeSimpleConfig(
  karmaDefault,
  karmaCoverage,
  {webpack: webpackConfigUtils.getCoverageConfig()}
);
const getTestConf = () => mergeUtils.mergeSimpleConfig(
  karmaDefault,
  karmaTest,
  {webpack: webpackConfigUtils.getTestConfig()}
);

module.exports = {
  getTestConf: getTestConf,
  getServeConf: getServeConf,
  getCoverageConf: getCoverageConf
}
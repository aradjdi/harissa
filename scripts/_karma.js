const Q = require('q');
const karma = require('karma');
const merge = require('./_merge');

const karmaDefault = require('./configs/karma.conf');
const karmaServe = require('./configs/karma.serve.conf');
const karmaCoverage = require('./configs/karma.coverage.conf');
const karmaTest = require('./configs/karma.test.conf');

const defaultConfig = require('./configs/webpack.config');
const assetsConfig = require('./configs/webpack.assets.config');
const babelConfig = require('./configs/webpack.babel.config');
const eslintConfig = require('./configs/webpack.eslint.config');
const sourcemapConfig = require('./configs/webpack.sourcemap.config');
const coverageConfig = require('./configs/webpack.coverage.config');
const webConfig = require('./configs/webpack.web.config');
const getTestConf = () => merge.mergeSimpleConfig(
  karmaDefault,
  karmaTest,
  {webpack: merge.mergeConfig(
    defaultConfig, webConfig, assetsConfig,
    babelConfig, eslintConfig, sourcemapConfig
  )}
);
const getServeConf = () => merge.mergeSimpleConfig(
  karmaDefault,
  karmaServe,
  {webpack: merge.mergeConfig(
    defaultConfig, webConfig, assetsConfig,
    babelConfig, eslintConfig, sourcemapConfig
  )}
);
const getCoverageConf = () => merge.mergeSimpleConfig(
  karmaDefault,
  karmaCoverage,
  {webpack: merge.mergeConfig(
    coverageConfig,
    defaultConfig, webConfig, assetsConfig,
    babelConfig, eslintConfig, sourcemapConfig
  )}
);

const startKarma = conf => {
  const deferred = Q.defer();
  const server = new karma.Server(conf, exitCode => {
    if (exitCode !== 0) deferred.reject(exitCode);
    else                deferred.resolve();
  });
  server.start();
  return deferred.promise;
};

const testProject = () => Q()
  .then(() => getTestConf())
  .then(conf => startKarma(conf));

const serveProject = () => Q()
  .then(() => getServeConf())
  .then(conf => startKarma(conf));

const coverageProject = () => Q()
  .then(() => getCoverageConf())
  .then(conf => startKarma(conf));


module.exports = {
  testProject: testProject,
  serveProject: serveProject,
  coverageProject: coverageProject
}
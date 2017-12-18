const Q = require('q');
const karma = require('karma');
const merge = require('./_merge');

const karmaDefault = require('./configKarmas/karma.conf');
const karmaServe = require('./configKarmas/karma.serve.conf');
const karmaCoverage = require('./configKarmas/karma.coverage.conf');
const karmaTest = require('./configKarmas/karma.test.conf');

const defaultConfig = require('./configWebpacks/webpack.config');
const assetsConfig = require('./configWebpacks/webpack.assets.config');
const babelConfig = require('./configWebpacks/webpack.babel.config');
const eslintConfig = require('./configWebpacks/webpack.eslint.config');
const sourcemapConfig = require('./configWebpacks/webpack.sourcemap.config');
const coverageConfig = require('./configWebpacks/webpack.coverage.config');

const webConfig = require('./configWebpacks/webpack.web.config');

const getTestConf = () => merge.mergeSimpleConfig(
  karmaDefault,
  karmaTest,
  {
    webpack: merge.mergeConfig(
      defaultConfig, webConfig, assetsConfig,
      babelConfig, eslintConfig, sourcemapConfig,
    ),
  },
);
const getServeConf = () => merge.mergeSimpleConfig(
  karmaDefault,
  karmaServe,
  {
    webpack: merge.mergeConfig(
      defaultConfig, webConfig, assetsConfig,
      babelConfig, eslintConfig, sourcemapConfig,
    ),
  },
);
const getCoverageConf = () => merge.mergeSimpleConfig(
  karmaDefault,
  karmaCoverage,
  {
    webpack: merge.mergeConfig(
      coverageConfig,
      defaultConfig, webConfig, assetsConfig,
      babelConfig, eslintConfig, sourcemapConfig,
    ),
  },
);

const startKarma = (conf) => {
  const deferred = Q.defer();
  const server = new karma.Server(conf, (exitCode) => {
    if (exitCode !== 0) deferred.reject(exitCode);
    else deferred.resolve();
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
  testProject,
  serveProject,
  coverageProject,
};

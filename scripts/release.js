const Q = require('q');
const argv = require('yargs').argv;
const versionUtils = require('./app/others/versionUtils');
const karmaTaskUtils = require('./app/task/karmaTaskUtils');
const webpackTaskUtils = require('./app/task/webpackTaskUtils');
const cordovaUtils = require('./app/task/cordovaUtils');
const storeUtils = require('./app/task/storeUtils');

karmaTaskUtils.coverageProject()
  .then(() => argv.patch ? versionUtils.createPatch() : Q())
  .then(() => argv.minor ? versionUtils.createMinor() : Q())
  .then(() => argv.major ? versionUtils.createMajor() : Q())
  .then(() => webpackTaskUtils.releaseProject())
  .then(() => cordovaUtils.releaseProject())
  .then(() => storeUtils.releaseProject())
  .then(() => console.log('***************************************finish'))
  .catch(err => console.error(err));

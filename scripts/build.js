const Q = require('q');
const argv = require('yargs').argv;
const pathUtils = require('./app/pathUtils');
const webpackTaskUtils = require('./app/task/webpackTaskUtils');
const cordovaUtils = require('./app/task/cordovaUtils');

Q()
  .then(() => argv.web ? webpackTaskUtils.buildProject() : Q())
  .then(() => argv.smartphone ? cordovaUtils.buildProject(pathUtils.smartphoneDir) : Q())
  .then(() => argv.tablet ? cordovaUtils.buildProject(pathUtils.tabletDir) : Q())
  .then(() => console.log('***************************************finish'))
  .catch(err => console.error(err));

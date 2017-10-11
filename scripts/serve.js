const Q = require('q');
const argv = require('yargs').argv;
const webpackTaskUtils = require('./app/task/webpackTaskUtils');
const karmaTaskUtils = require('./app/task/karmaTaskUtils');

Q()
  .then(() => webpackTaskUtils.serveProject())
  .then(() => console.log('***************************************finish'))
  .catch(err => console.error(err));

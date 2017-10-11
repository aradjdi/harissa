const Q = require('q');
const argv = require('yargs').argv;
const karmaTaskUtils = require('./app/task/karmaTaskUtils');

Q()
  .then(() => argv.run ? karmaTaskUtils.testProject() : Q())
  .then(() => argv.serve ? karmaTaskUtils.serveProject() : Q())
  .then(() => argv.coverage ? karmaTaskUtils.coverageProject() : Q())
  .then(() => console.log('***************************************finish'))
  .catch(err => console.error(err));

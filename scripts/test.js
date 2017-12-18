const Q = require('q');
const { argv } = require('yargs');
const karmaCommand = require('./_karma');

Q()
  .then(() => argv.run ? karmaCommand.testProject() : Q())
  .then(() => argv.serve ? karmaCommand.serveProject() : Q())
  .then(() => argv.coverage ? karmaCommand.coverageProject() : Q())
  .then(() => console.log('***************************************finish'))
  .catch(err => console.error(err));

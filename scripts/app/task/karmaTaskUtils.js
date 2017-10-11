const Q = require('q');
const karmaConfUtils = require('../config/karmaConfUtils');
const karmaCommandUtils = require('../command/karmaCommandUtils');

const testProject = () => Q()
  .then(() => karmaConfUtils.getTestConf())
  .then(conf => karmaCommandUtils.startKarma(conf));

const serveProject = () => Q()
  .then(() => karmaConfUtils.getServeConf())
  .then(conf => karmaCommandUtils.startKarma(conf));

const coverageProject = () => Q()
  .then(() => karmaConfUtils.getCoverageConf())
  .then(conf => karmaCommandUtils.startKarma(conf));


module.exports = {
  testProject: testProject,
  serveProject: serveProject,
  coverageProject: coverageProject
}
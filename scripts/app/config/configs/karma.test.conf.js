const pathUtils = require('../../pathUtils');

module.exports = {
  singleRun: true,
  
  reporters: ['html'],

  htmlReporter: {
    outputDir: pathUtils.releaseDir + '/tests-result/units-html-reports'
  }
};
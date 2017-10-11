const pathUtils = require('../../pathUtils');

module.exports = {
  singleRun: true,
  
  reporters: ['coverage-istanbul'],

  coverageIstanbulReporter: {
    dir: pathUtils.releaseDir + '/tests-result',
    fixWebpackSourcePaths: true,
    reports: ['html', 'lcovonly'],
    'report-config': {
      html: {
        subdir: 'coverage-html-reports'
      },
      lcovonly: {
        file: 'coverage-lcov-reports.info'
      }
    }
  }
};
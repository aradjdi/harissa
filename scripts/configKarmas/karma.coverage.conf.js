const paths = require('../_paths');

module.exports = {
  singleRun: true,

  reporters: ['coverage-istanbul'],

  coverageIstanbulReporter: {
    dir: `${paths.releaseDir}/tests-result`,
    fixWebpackSourcePaths: true,
    reports: ['html', 'lcovonly'],
    'report-config': {
      html: {
        subdir: 'coverage-html-reports',
      },
      lcovonly: {
        file: 'coverage-lcov-reports.info',
      },
    },
  },
};

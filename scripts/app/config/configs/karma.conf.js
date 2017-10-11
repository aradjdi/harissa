const pathUtils = require('../../pathUtils');

module.exports = {
  frameworks: ['jasmine'],
  browsers: ['PhantomJS'],

  phantomjsLauncher: {exitOnResourceError: true},

  files: [
    pathUtils.testDir + '/test.js'
  ],
  preprocessors: {
    '**/*test.js': ['webpack', 'sourcemap']
  }
};
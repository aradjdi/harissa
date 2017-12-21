const paths = require('../_paths');

module.exports = {
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],

    phantomjsLauncher: {exitOnResourceError: true},

    files: [
        `${paths.testDir}/test.js`,
    ],
    preprocessors: {
        '**/*test.js': ['webpack', 'sourcemap'],
    },
};

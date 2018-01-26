const paths = require('../_paths');

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = {
    frameworks: ['jasmine'],
    browsers: ['Chrome'],

    files: [
        `${paths.appDir}/src/index.spec.js`,
    ],
    preprocessors: {
        '**/*index.spec.js': ['webpack', 'sourcemap'],
    },
};

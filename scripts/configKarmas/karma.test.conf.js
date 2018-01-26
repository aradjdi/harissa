const paths = require('../_paths');

module.exports = {
    singleRun: true,

    reporters: ['html'],

    htmlReporter: {
        outputDir: `${paths.appDir}/tests-result/units-html-reports`,
    },
};

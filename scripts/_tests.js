const Q = require('q');

const karma = require('./_karma');
const merge = require('./_merge');

const commonWebpackConfig = [
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.web.config'),
    require('./configWebpacks/webpack.vue.config'),
    require('./configWebpacks/webpack.assets.config'),
    require('./configWebpacks/webpack.babel.config'),
    require('./configWebpacks/webpack.eslint.config'),
    require('./configWebpacks/webpack.sourcemap.config')
];

const serveTests = () => Q()
    .then(() => merge.mergeSimpleConfig(
        require('./configKarmas/karma.conf'),
        require('./configKarmas/karma.serve.conf'),
        { webpack: merge.mergeConfig(...commonWebpackConfig) },
    ))
    .then(conf => karma.startKarma(conf));

const runTests = () => Q()
    .then(() => merge.mergeConfig(
        require('./configKarmas/karma.conf'),
        require('./configKarmas/karma.test.conf'),
        require('./configKarmas/karma.coverage.conf'),
        {
            webpack: merge.mergeConfig(
                require('./configWebpacks/webpack.coverage.config'),
                ...commonWebpackConfig
            )
        },
    ))
    .then(conf => karma.startKarma(conf));

module.exports = {
    serveTests,
    runTests,
};

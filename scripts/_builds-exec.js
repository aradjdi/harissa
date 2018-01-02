const Q = require('q');

const merge = require('./_merge');
const webpack = require('./_webpack');

const commonConfig = [
    require('./configWebpacks/webpack.assets.config'),
    require('./configWebpacks/webpack.babel.config'),
    require('./configWebpacks/webpack.eslint.config'),
    require('./configWebpacks/webpack.sourcemap.config')
];

const build = configs => Q().then(() => merge.mergeConfig(
    ...configs,
    require('./configWebpacks/webpack.vue.config'),
    ...commonConfig,
    require('./configWebpacks/webpack.logging.config')
)).then(config => webpack.compile(config));

const release = configs => Q().then(() => merge.mergeConfig(
    ...configs,
    require('./configWebpacks/webpack.vue.config'),
    ...commonConfig,
    // require('./configWebpacks/webpack.treeshaking.config'),
)).then(config => webpack.compile(config));

const serve = configs => Q().then(() => merge.mergeConfig(
    ...configs,
    require('./configWebpacks/webpack.vue.config'),
    ...commonConfig,
)).then(config => webpack.serve(config));

module.exports = {
    build,
    release,
    serve,
};

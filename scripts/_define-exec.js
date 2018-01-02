const Q = require('q');
const fs = require('fs-extra');
const webpack = require('webpack');

const paths = require('./_paths');
const merge = require('./_merge');

const getDefinePlugin = files => Q.all(files.map(file => fs.readJson(file)))
    .then(confs => merge.mergeConfig({
        VERSION: require(`${paths.appDir}/package.json`).version,
        ENV: process.env.NODE_ENV,
    }, ...confs))
    .then(conf => ({
        plugins: [
            new webpack.DefinePlugin({
                __CONFIG__: JSON.stringify(conf),
            }),
        ],
    }));

const getApplicationConfs = () => {
    const envDir = `${paths.confDir}/${process.env.NODE_ENV}`;

    return fs.readdir(envDir).then(files => files
        .filter(filename => !(/(^|\/)\.[^\/\.]/g).test(filename))
        .map(filename => `${paths.confDir}/${process.env.NODE_ENV}/${filename}`));
};

const getConfs = customConfs => Q()
    .then(() => getApplicationConfs())
    .then((files) => {
        files.push(...customConfs);

        return getDefinePlugin(files);
    });

module.exports = {
    getConfs
};

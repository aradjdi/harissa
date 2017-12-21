const Q = require('q');
const fs = require('fs-extra');
const webpack = require('webpack');
const paths = require('./_paths');
const merge = require('./_merge');

const getConfFiles = (platformFiles) => {
    const envDir = `${paths.confDir}/${process.env.NODE_ENV}`;

    return fs.readdir(envDir).then((files) => {
        files = files
            .filter(file => !(/(^|\/)\.[^\/\.]/g).test(file))
            .map(file => `${envDir}/${file}`);

        files.push(...platformFiles);
        return files;
    });
};

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

const confDir = `${paths.confDir}/cordova`;
const webConfFiles = [`${confDir}/web.conf.json`];
const getWebDefinePlugin = () => Q()
    .then(() => getConfFiles(webConfFiles))
    .then(files => getDefinePlugin(files));

const smartphoneIOSConfFiles = [`${confDir}/smartphone.conf.json`, `${confDir}/ios.conf.json`];
const getSmartphoneIOSDefinePlugin = () => Q()
    .then(() => getConfFiles(smartphoneIOSConfFiles))
    .then(files => getDefinePlugin(files));

const smartphoneAndroidConfFiles = [`${confDir}/smartphone.conf.json`, `${confDir}/android.conf.json`];
const getSmartphoneAndroidDefinePlugin = () => {
    console.log('building config');
    return Q()
        .then(() => getConfFiles(smartphoneAndroidConfFiles))
        .then(files => getDefinePlugin(files));
};

const tabletIOSConfFiles = [`${confDir}/tablet.conf.json`, `${confDir}/ios.conf.json`];
const getTabletIOSDefinePlugin = () => Q()
    .then(() => getConfFiles(tabletIOSConfFiles))
    .then(files => getDefinePlugin(files));

const tabletAndroidConfFiles = [`${confDir}/tablet.conf.json`, `${confDir}/android.conf.json`];
const getTabletAndroidDefinePlugin = () => Q()
    .then(() => getConfFiles(tabletAndroidConfFiles))
    .then(files => getDefinePlugin(files));

module.exports = {
    getWebDefinePlugin,
    getSmartphoneIOSDefinePlugin,
    getSmartphoneAndroidDefinePlugin,
    getTabletIOSDefinePlugin,
    getTabletAndroidDefinePlugin,
};

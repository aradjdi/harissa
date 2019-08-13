const Q = require('q');
const fs = require('fs-extra');

const exec = require('./_exec');
const parse = require('./_parse');
const paths = require('./_paths');

const changeAppVersion = (filepath, version) => fs.readFile(filepath)
    .then(configXml => parse.parseXmlToJson(configXml))
    .then((config) => {
        config.widget.$.version = version;
        return config;
    })
    .then(config => parse.parseJsonToXml(config))
    .then(configXml => fs.writeFile(filepath, configXml));
const changeBuildVersion = (filepath, version) => fs.readFile(filepath)
    .then(configXml => parse.parseXmlToJson(configXml))
    .then((config) => {
        config.widget.$['ios-CFBundleVersion'] = version;
        config.widget.$['android-versionCode'] = version;
        return config;
    })
    .then(config => parse.parseJsonToXml(config))
    .then(configXml => fs.writeFile(filepath, configXml));
const changePackageVersion = (filepath, version) => 
    exec.executeCommand(`npm version ${version} --no-git-tag-version --allow-same-version`, filepath);

const setAppVersion = version => Q.all([
    changeAppVersion(`${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone/config.xml`, version),
    changeAppVersion(`${paths.cordovaDir}/${process.env.NODE_ENV}/tablet/config.xml`, version),
]);
const setBuildVersion = version => Q.all([
    changeBuildVersion(`${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone/config.xml`, version),
    changeBuildVersion(`${paths.cordovaDir}/${process.env.NODE_ENV}/tablet/config.xml`, version),
]);
const setPackageVersion = version => Q.all([
    changePackageVersion(paths.srcDir, version),
    changePackageVersion(`${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone`, version),
    changePackageVersion(`${paths.cordovaDir}/${process.env.NODE_ENV}/tablet`, version),
]);

const getAppVersion = () => {
    return Q(require(`${paths.appDir}/package.json`).version);
};
const getBuildVersion = () => {
    const date = new Date();

    // return AAMMJJHHmm ... use for versionCode, 
    // versionCode accept only int (2 147 483 648), so in 2022 this wil no longer work
    return Q(date.toJSON()
        .replace(/-|:|T|Z/g, '')
        .substr(2, 10));
};
const getPackageVersion = () => {
    return Q(require(`${paths.confDir}/${process.env.NODE_ENV}/app.conf.json`).VERSION);
};

module.exports = {
    getPackageVersion,
    getAppVersion,
    getBuildVersion,
    setPackageVersion,
    setAppVersion,
    setBuildVersion,
};

const Q = require('q');
const fs = require('fs-extra');

const exec = require('./_exec');
const parse = require('./_parse');
const paths = require('./_paths');
const questions = require('./_questions');

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

const setAppVersion = version => Q.all([
    changeAppVersion(`${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone/config.xml`, version),
    changeAppVersion(`${paths.cordovaDir}/${process.env.NODE_ENV}/tablet/config.xml`, version),
]);

const setBuildVersion = version => Q.all([
    changeBuildVersion(`${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone/config.xml`, version),
    changeBuildVersion(`${paths.cordovaDir}/${process.env.NODE_ENV}/tablet/config.xml`, version),
]);

const setPackageVersion = (version) => {
    const versionCmd = `npm version ${version} --no-git-tag-version`;

    return Q.all([
        exec.executeCommand(versionCmd, paths.srcDir),
        exec.executeCommand(versionCmd, `${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone`),
        exec.executeCommand(versionCmd, `${paths.cordovaDir}/${process.env.NODE_ENV}/tablet`),
    ]);
};

const getPackageVersion = () => questions.askVersionType().then((version) => {
    if (version === 'other') {
        version = undefined;
    }
    return version || questions.askVersionName();
});

const buildPackageVersion = () => getPackageVersion().then(version => setPackageVersion(version));

const buildAppVersion = () => setAppVersion(require(`${paths.appDir}/package.json`).version);

const buildBuildVersion = () => setBuildVersion(Date.now());

module.exports = {
    buildPackageVersion,
    buildAppVersion,
    buildBuildVersion,
};

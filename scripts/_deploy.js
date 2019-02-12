const Q = require('q');

const paths = require('./_paths');
const deployExec = require('./_deploy-exec');

const APPALOOSA_TOKENS = {
    dev: 'g58kzdxrvdtlhnumiv3wd93z95hq6khm',
    preprod: 'g58kzdxrvdtlhnumiv3wd93z95hq6khm',
    prod: 'ihdmighsgdvftx29xpiclqikaufstx5f'
};

const getAppaloosaToken = () => APPALOOSA_TOKENS[process.env.NODE_ENV];
const getCordovaDir = () => `${paths.cordovaDir}/${process.env.NODE_ENV}`;

const getAppaloosaGroups = () => require(`${paths.confDir}/${process.env.NODE_ENV}/appaloosa.conf.json`).APPALOOSA_GROUPS;

const uploadPackages = (device, changes) => {
    const appName = require(`${getCordovaDir()}/${device}/package.json`).displayName;
    return Q()
        .then(() => deployExec.uploadPackage(
            `${getCordovaDir()}/${device}/platforms/ios/build/device/${appName}.ipa`,
            getAppaloosaToken(),
            getAppaloosaGroups(),
            changes
        ))
        .then(() => deployExec.uploadPackage(
            `${getCordovaDir()}/${device}/platforms/android/app/build/outputs/apk/release/app-release.apk`,
            getAppaloosaToken(),
            getAppaloosaGroups(),
            changes
        ));
}

module.exports = {
    uploadPackages
};

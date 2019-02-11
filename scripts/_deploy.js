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
const getSmartphoneAppName = () => require(`${getCordovaDir()}/smartphone/package.json`).displayName;
const getTabletAppName = () => require(`${getCordovaDir()}/tablet/package.json`).displayName;

const uploadSmartphonePackages = changes => Q()
    .then(() => deployExec.uploadPackage(
        `${getCordovaDir()}/smartphone/platforms/ios/build/device/${getSmartphoneAppName()}.ipa`, getAppaloosaToken(), getAppaloosaGroups(), changes))
    .then(() => deployExec.uploadPackage(
        `${getCordovaDir()}/smartphone/platforms/android/build/outputs/apk/release/android-release.apk`, getAppaloosaToken(), getAppaloosaGroups(), changes));

const uploadTabletPackages = changes => Q()
    .then(() => deployExec.uploadPackage(
        `${getCordovaDir()}/tablet/platforms/ios/build/device/${getTabletAppName()}.ipa`, getAppaloosaToken(), getAppaloosaGroups(), changes))
    .then(() => deployExec.uploadPackage(
        `${getCordovaDir()}/tablet/platforms/android/build/outputs/apk/android-debug.apk`, getAppaloosaToken(), getAppaloosaGroups(), changes));

module.exports = {
    uploadSmartphonePackages,
    uploadTabletPackages,
};

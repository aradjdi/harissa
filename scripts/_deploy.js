const Q = require('q');

const paths = require('./_paths');
const questions = require('./_questions');
const errors = require('./_errors');
const deployExec = require('./_deploy-exec');

const APPALOOSA_TOKENS = {
    dev: 'g58kzdxrvdtlhnumiv3wd93z95hq6khm',
    preprod: 'g58kzdxrvdtlhnumiv3wd93z95hq6khm',
    prod: 'ihdmighsgdvftx29xpiclqikaufstx5f'
};

let changes = '';
const askChanges = () => Q()
    .then(() => questions.askChanges())
    .then((res) => {
        changes = res;
    })
    .catch(errors.onError);

const getAppaloosaToken = () => APPALOOSA_TOKENS[process.env.NODE_ENV];
const getCordovaDir = () => `${paths.cordovaDir}/${process.env.NODE_ENV}`;

const getAppaloosaGroups = () => require(`${paths.confDir}/${process.env.NODE_ENV}/appaloosa.conf.json`).APPALOOSA_GROUPS;
const getSmartphoneAppName = () => require(`${getCordovaDir()}/smartphone/package.json`).displayName;
const getTabletAppName = () => require(`${getCordovaDir()}/tablet/package.json`).displayName;

const uploadSmartphonePackages = () => Q()
    .then(() => askChanges())
    .then(() => deployExec.uploadPackage(`${getCordovaDir()}/smartphone/platforms/ios/build/device/${getSmartphoneAppName()}.ipa`, getAppaloosaToken(), getAppaloosaGroups(), changes))
    .then(() => deployExec.uploadPackage(`${getCordovaDir()}/smartphone/platforms/android/build/outputs/apk/release/android-release.apk`, getAppaloosaToken(), getAppaloosaGroups(), changes));

const uploadTabletPackages = () => Q()
    .then(() => askChanges())
    .then(() => deployExec.uploadPackage(`${getCordovaDir()}/tablet/platforms/ios/build/device/${getTabletAppName()}.ipa`, getAppaloosaToken(), getAppaloosaGroups()))
    .then(() => deployExec.uploadPackage(`${getCordovaDir()}/tablet/platforms/android/build/outputs/apk/android-debug.apk`, getAppaloosaToken(), getAppaloosaGroups()));

module.exports = {
    uploadSmartphonePackages,
    uploadTabletPackages,
};

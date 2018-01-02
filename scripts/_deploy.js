const Q = require('q');

const paths = require('./_paths');
const deployExec = require('./_deploy-exec');

const getCordovaDir = () => `${paths.cordovaDir}/${process.env.NODE_ENV}`;
const getSmartphoneAppNeme = () => require(`${getCordovaDir()}/smartphone/package.json`).displayName;
const getTabletAppNeme = () => require(`${getCordovaDir()}/tablet/package.json`).displayName;

const uploadSmartphonePackages = () => Q()
    // .then(() => deployExec.uploadPackage(`${getCordovaDir()}/smartphone/platforms/ios/build/device/${getSmartphoneAppNeme()}.ipa`))
    // .then(() => deployExec.uploadPackage(`${getCordovaDir()}/smartphone/platforms/android/build/outputs/apk/android-debug.apk`));
const uploadTabletPackages = () => Q()
    // .then(() => deployExec.uploadPackage(`${getCordovaDir()}/tablet/platforms/ios/build/device/${getTabletAppNeme()}.ipa`))
    // .then(() => deployExec.uploadPackage(`${getCordovaDir()}/tablet/platforms/android/build/outputs/apk/android-debug.apk`));

module.exports = {
    uploadSmartphonePackages,
    uploadTabletPackages,
};

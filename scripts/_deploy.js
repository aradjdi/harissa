const Q = require('q');

const exec = require('./_exec');
const paths = require('./_paths');

const storeToken = 'g58kzdxrvdtlhnumiv3wd93z95hq6khm';

const getCordovaDir = () => `${paths.cordovaDir}/${process.env.NODE_ENV}`;
const getSmartphoneAppNeme = () => require(`${getCordovaDir()}/smartphone/package.json`).displayName;
const getTabletAppNeme = () => require(`${getCordovaDir()}/tablet/package.json`).displayName;

const uploadPackage = filepath => Q()
    .then(() => console.log(`upload ${filepath}`))
    .then(() => exec.executeCommand(`ruby ${paths.rootDir}/appaloosa-client.rb ${storeToken} ${filepath}`))
    .catch(() => uploadPackage(filepath))
    .catch((error) => {
        console.log('deployReleases error', error);
    });

const uploadSmartphonePackages = () => Q()
    .then(() => uploadPackage(`${getCordovaDir()}/smartphone/platforms/ios/build/device/${getSmartphoneAppNeme()}.ipa`))
    .then(() => uploadPackage(`${getCordovaDir()}/smartphone/platforms/android/build/outputs/apk/android-debug.apk`));

const uploadTabletPackages = () => Q()
    .then(() => uploadPackage(`${getCordovaDir()}/tablet/platforms/ios/build/device/${getTabletAppNeme()}.ipa`))
    .then(() => uploadPackage(`${getCordovaDir()}/tablet/platforms/android/build/outputs/apk/android-debug.apk`));

module.exports = {
    uploadSmartphonePackages,
    uploadTabletPackages,
};

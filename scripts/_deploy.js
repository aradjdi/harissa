const Q = require('q');

const exec = require('./_exec');
const paths = require('./_paths');

const cordovaDir = `${paths.cordovaDir}/${process.env.NODE_ENV}`;

const storeToken = 'g58kzdxrvdtlhnumiv3wd93z95hq6khm';
const smartphoneAppName = require(`${cordovaDir}/smartphone/package.json`).displayName;
const tabletAppName = require(`${cordovaDir}/tablet/package.json`).displayName;

const uploadPackage = filepath => Q()
  .then(() => console.log(`upload ${filepath}`))
  .then(() => exec.executeCommand(`ruby ${paths.rootDir}/appaloosa-client.rb ${storeToken} ${filepath}`))
  .catch(() => uploadPackage(filepath))
  .catch(error => {
    console.log('deployReleases error', error);
  });

const uploadPackages = () => Q()
  .then(() => uploadPackage(`${cordovaDir}/smartphone/platforms/ios/build/device/${smartphoneAppName}.ipa`))
  .then(() => uploadPackage(`${cordovaDir}/smartphone/platforms/android/build/outputs/apk/android-debug.apk`))
  .then(() => uploadPackage(`${cordovaDir}/tablet/platforms/ios/build/device/${tabletAppName}.ipa`))
  .then(() => uploadPackage(`${cordovaDir}/tablet/platforms/android/build/outputs/apk/android-debug.apk`));

module.exports = {
  uploadPackages: uploadPackages
}
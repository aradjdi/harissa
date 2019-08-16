const Q = require('q');

const paths = require('./_paths');
const deployExec = require('./_deploy-exec');

const getCordovaDir = () => `${paths.cordovaDir}/${process.env.NODE_ENV}`;

const getAppaloosaGroups = () => require(`${paths.confDir}/${process.env.NODE_ENV}/appaloosa.conf.json`).APPALOOSA_GROUPS;
const getAppaloosaToken = () => require(`${paths.confDir}/${process.env.NODE_ENV}/appaloosa.conf.json`).APPALOOSA_STORE_TOKEN;

const uploadPackages = (device, changes, proxy) => {
    const appName = require(`${getCordovaDir()}/${device}/package.json`).displayName;
    return Q()
        .then(() => deployExec.uploadPackage(
            `${getCordovaDir()}/${device}/platforms/ios/build/device/${appName}.ipa`,
            getAppaloosaToken(),
            getAppaloosaGroups(),
            changes,
            proxy
        ))
        .then(() => deployExec.uploadPackage(
            `${getCordovaDir()}/${device}/platforms/android/app/build/outputs/apk/release/app-release.apk`,
            getAppaloosaToken(),
            getAppaloosaGroups(),
            changes,
            proxy
        ));
}

module.exports = {
    uploadPackages
};

const paths = require('./_paths');
const defineExec = require('./_define-exec');

const getWebDefinePlugin = () => defineExec.getConfs(
    [
        `${paths.confDir}/cordova/web.conf.json`
    ],
    `${paths.currentDir}`
);

const getSmartphoneIOSDefinePlugin = () => defineExec.getConfs(
    [
        `${paths.confDir}/cordova/smartphone.conf.json`,
        `${paths.confDir}/cordova/ios.conf.json`
    ],
    `${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone`
);
const getSmartphoneAndroidDefinePlugin = () => defineExec.getConfs(
    [
        `${paths.confDir}/cordova/smartphone.conf.json`,
        `${paths.confDir}/cordova/android.conf.json`,
    ],
    `${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone`
);
const getTabletIOSDefinePlugin = () => defineExec.getConfs(
    [
        `${paths.confDir}/cordova/tablet.conf.json`,
        `${paths.confDir}/cordova/ios.conf.json`
    ],
    `${paths.cordovaDir}/${process.env.NODE_ENV}/tablet`
);
const getTabletAndroidDefinePlugin = () => defineExec.getConfs(
    [
        `${paths.confDir}/cordova/tablet.conf.json`,
        `${paths.confDir}/cordova/android.conf.json`
    ],
    `${paths.cordovaDir}/${process.env.NODE_ENV}/tablet`
);

module.exports = {
    getWebDefinePlugin,
    getSmartphoneIOSDefinePlugin,
    getSmartphoneAndroidDefinePlugin,
    getTabletIOSDefinePlugin,
    getTabletAndroidDefinePlugin,
};

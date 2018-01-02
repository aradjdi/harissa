const paths = require('./_paths');
const defineExec = require('./_define-exec');

const getWebDefinePlugin = () => defineExec.getConfs([
    `${paths.confDir}/cordova/web.conf.json`
]);
const getSmartphoneIOSDefinePlugin = () => defineExec.getConfs([
    `${paths.confDir}/cordova/smartphone.conf.json`,
    `${paths.confDir}/cordova/ios.conf.json`
]);
const getSmartphoneAndroidDefinePlugin = () => defineExec.getConfs([
    `${paths.confDir}/cordova/smartphone.conf.json`,
    `${paths.confDir}/cordova/android.conf.json`
]);
const getTabletIOSDefinePlugin = () => defineExec.getConfs([
    `${paths.confDir}/cordova/tablet.conf.json`,
    `${paths.confDir}/cordova/ios.conf.json`
]);
const getTabletAndroidDefinePlugin = () => defineExec.getConfs([
    `${paths.confDir}/cordova/tablet.conf.json`,
    `${paths.confDir}/cordova/android.conf.json`
]);

module.exports = {
    getWebDefinePlugin,
    getSmartphoneIOSDefinePlugin,
    getSmartphoneAndroidDefinePlugin,
    getTabletIOSDefinePlugin,
    getTabletAndroidDefinePlugin,
};

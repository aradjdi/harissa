const Q = require('q');

const define = require('./_define');
const buildsExec = require('./_builds-exec');

const buildDist = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.web.config'),
    define.getWebDefinePlugin()
]).then(configs => buildsExec.build(configs));
const buildDistSmartphoneIOS = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.smartphone.ios.config'),
    define.getSmartphoneIOSDefinePlugin()
]).then(configs => buildsExec.build(configs));
const buildDistSmartphoneAndroid = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.smartphone.android.config'),
    define.getSmartphoneAndroidDefinePlugin()
]).then(configs => buildsExec.build(configs));
const buildDistTabletIOS = () => () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.tablet.ios.config'),
    define.getTabletIOSDefinePlugin()
]).then(configs => buildsExec.build(configs));
const buildDistTabletAndroid = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.tablet.android.config'),
    define.getTabletAndroidDefinePlugin()
]).then(configs => buildsExec.build(configs));

const releaseDist = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.web.config'),
    define.getWebDefinePlugin(),
]).then(configs => buildsExec.release(configs));
const releaseDistSmartphoneIOS = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.smartphone.ios.config'),
    define.getSmartphoneIOSDefinePlugin(),
]).then(configs => buildsExec.release(configs));
const releaseDistSmartphoneAndroid = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.smartphone.android.config'),
    define.getSmartphoneAndroidDefinePlugin(),
]).then(configs => buildsExec.release(configs));
const releaseDistTabletIOS = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.tablet.ios.config'),
    define.getTabletIOSDefinePlugin(),
]).then(configs => buildsExec.release(configs));
const releaseDistTabletAndroid = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.tablet.android.config'),
    define.getTabletAndroidDefinePlugin(),
]).then(configs => buildsExec.release(configs));

const serveDist = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.web.config'),
    define.getWebDefinePlugin(),
]).then(configs => buildsExec.serve(configs));
const serveDistSmartphoneIOS = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.smartphone.ios.config'),
    define.getSmartphoneIOSDefinePlugin(),
]).then(configs => buildsExec.serve(configs));
const serveDistSmartphoneAndroid = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.smartphone.android.config'),
    define.getSmartphoneAndroidDefinePlugin(),
]).then(configs => buildsExec.serve(configs));
const serveDistTabletIOS = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.tablet.ios.config'),
    define.getTabletIOSDefinePlugin(),
]).then(configs => buildsExec.serve(configs));
const serveDistTabletAndroid = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.tablet.android.config'),
    define.getTabletAndroidDefinePlugin(),
]).then(configs => buildsExec.serve(configs));
const serveDistVue = () => Q.all([
    require('./configWebpacks/webpack.config'),
    require('./configWebpacks/webpack.web.config'),
    require('./configWebpacks/webpack.vue.config'),
    define.getWebDefinePlugin(),
]).then(configs => buildsExec.serve(configs));

module.exports = {
    buildDist,
    buildDistSmartphoneIOS,
    buildDistSmartphoneAndroid,
    buildDistTabletIOS,
    buildDistTabletAndroid,

    releaseDist,
    releaseDistSmartphoneIOS,
    releaseDistSmartphoneAndroid,
    releaseDistTabletIOS,
    releaseDistTabletAndroid,

    serveDist,
    serveDistSmartphoneIOS,
    serveDistSmartphoneAndroid,
    serveDistTabletIOS,
    serveDistTabletAndroid,

    serveDistVue,
};

const Q = require('q');
const merge = require('./_merge');
const define = require('./_define');
const webpack = require('./_webpack');

const build = configs => Q().then(() => merge.mergeConfig(
  ...configs,
  require('./configWebpacks/webpack.assets.config'),
  require('./configWebpacks/webpack.babel.config'),
  require('./configWebpacks/webpack.eslint.config'),
  require('./configWebpacks/webpack.sourcemap.config'),
)).then(config => webpack.compile(config));

const release = configs => Q().then(() => merge.mergeConfig(
  ...configs,
  require('./configWebpacks/webpack.assets.config'),
  require('./configWebpacks/webpack.babel.config'),
  require('./configWebpacks/webpack.eslint.config'),
  require('./configWebpacks/webpack.sourcemap.config'),
  // require('./configWebpacks/webpack.treeshaking.config'),
)).then(config => webpack.compile(config));

const serve = configs => Q().then(() => merge.mergeConfig(
  ...configs,
  require('./configWebpacks/webpack.assets.config'),
  require('./configWebpacks/webpack.babel.config'),
  require('./configWebpacks/webpack.eslint.config'),
  require('./configWebpacks/webpack.sourcemap.config'),
)).then(config => webpack.serve(config));

const buildDist = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.web.config'),
  define.getWebDefinePlugin(),
]).then(configs => build(configs));
const buildDistSmartphoneIOS = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.smartphone.ios.config'),
  define.getSmartphoneIOSDefinePlugin(),
]).then(configs => build(configs));
const buildDistSmartphoneAndroid = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.smartphone.android.config'),
  define.getSmartphoneAndroidDefinePlugin(),
]).then(configs => build(configs));
const buildDistTabletIOS = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.tablet.ios.config'),
  define.getTabletIOSDefinePlugin(),
]).then(configs => build(configs));
const buildDistTabletAndroid = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.tablet.android.config'),
  define.getTabletAndroidDefinePlugin(),
]).then(configs => build(configs));

const releaseDist = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.web.config'),
  define.getWebDefinePlugin(),
]).then(configs => release(configs));
const releaseDistSmartphoneIOS = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.smartphone.ios.config'),
  define.getSmartphoneIOSDefinePlugin(),
]).then(configs => release(configs));
const releaseDistSmartphoneAndroid = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.smartphone.android.config'),
  define.getSmartphoneAndroidDefinePlugin(),
]).then(configs => release(configs));
const releaseDistTabletIOS = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.tablet.ios.config'),
  define.getTabletIOSDefinePlugin(),
]).then(configs => release(configs));
const releaseDistTabletAndroid = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.tablet.android.config'),
  define.getTabletAndroidDefinePlugin(),
]).then(configs => release(configs));

const serveDist = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.web.config'),
  define.getWebDefinePlugin(),
]).then(configs => serve(configs));
const serveDistSmartphoneIOS = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.smartphone.ios.config'),
  define.getSmartphoneIOSDefinePlugin(),
]).then(configs => serve(configs));
const serveDistSmartphoneAndroid = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.smartphone.android.config'),
  define.getSmartphoneAndroidDefinePlugin(),
]).then(configs => serve(configs));
const serveDistTabletIOS = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.tablet.ios.config'),
  define.getTabletIOSDefinePlugin(),
]).then(configs => serve(configs));
const serveDistTabletAndroid = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.tablet.android.config'),
  define.getTabletAndroidDefinePlugin(),
]).then(configs => serve(configs));

const serveDistVue = () => Q.all([
  require('./configWebpacks/webpack.config'),
  require('./configWebpacks/webpack.web.config'),
  require('./configWebpacks/webpack.vue.config'),
  define.getWebDefinePlugin(),
]).then(configs => serve(configs));

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

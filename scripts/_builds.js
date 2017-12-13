const Q = require('q');
const merge = require('./_merge');
const define = require('./_define');
const webpack = require('./_webpack');
const defaultConfig = require('./configWebpacks/webpack.config');
const assetsConfig = require('./configWebpacks/webpack.assets.config');
const babelConfig = require('./configWebpacks/webpack.babel.config');
const eslintConfig = require('./configWebpacks/webpack.eslint.config');
const sourcemapConfig = require('./configWebpacks/webpack.sourcemap.config');
const treeShaking = require('./configWebpacks/webpack.treeshaking.config');
const webConfig = require('./configWebpacks/webpack.web.config');
const smartphoneIOSConfig = require('./configWebpacks/webpack.smartphone.ios.config');
const smartphoneAndroidConfig = require('./configWebpacks/webpack.smartphone.android.config');
const tabletIOSConfig = require('./configWebpacks/webpack.tablet.ios.config');
const tabletAndroidConfig = require('./configWebpacks/webpack.tablet.android.config');
const vueConfig = require('./configWebpacks/webpack.vue.config');

const build = configs => Q().then(() => merge.mergeConfig(
  ...configs,
  assetsConfig,
  babelConfig,
  eslintConfig,
  sourcemapConfig,
)).then(config => webpack.compile(config));

const release = configs => Q().then(() => merge.mergeConfig(
  ...configs,
  assetsConfig,
  babelConfig,
  eslintConfig,
  sourcemapConfig,
  // treeShaking,
)).then(config => webpack.compile(config));

const serve = configs => Q().then(() => merge.mergeConfig(
  ...configs,
  assetsConfig,
  babelConfig,
  eslintConfig,
  sourcemapConfig,
)).then(config => webpack.serve(config));

const buildDist = () => Q.all(
  [defaultConfig, webConfig, define.getWebDefinePlugin()]
).then(configs => build(configs));
const buildDistSmartphoneIOS = () => Q.all(
  [defaultConfig, smartphoneIOSConfig, define.getSmartphoneIOSDefinePlugin()]
).then(configs => build(configs));
const buildDistSmartphoneAndroid = () => Q.all(
  [defaultConfig, smartphoneAndroidConfig, define.getSmartphoneAndroidDefinePlugin()]
).then(configs => build(configs));
const buildDistTabletIOS = () => Q.all(
  [defaultConfig, tabletIOSConfig, define.getTabletIOSDefinePlugin()]
).then(configs => build(configs));
const buildDistTabletAndroid = () => Q.all(
  [defaultConfig, tabletAndroidConfig, define.getTabletAndroidDefinePlugin()]
).then(configs => build(configs));

const buildAllDist = () => Q()
  .then(() => buildDist())
  .then(() => buildDistSmartphoneIOS())
  .then(() => buildDistSmartphoneAndroid())
  .then(() => buildDistTabletIOS())
  .then(() => buildDistTabletAndroid())

const releaseDist = () => Q.all(
  [defaultConfig, webConfig, define.getWebDefinePlugin()]
).then(configs => release(configs));
const releaseDistSmartphoneIOS = () => Q.all(
  [defaultConfig, smartphoneIOSConfig, define.getSmartphoneIOSDefinePlugin()]
).then(configs => release(configs));
const releaseDistSmartphoneAndroid = () => Q.all(
  [defaultConfig, smartphoneAndroidConfig, define.getSmartphoneAndroidDefinePlugin()]
).then(configs => release(configs));
const releaseDistTabletIOS = () => Q.all(
  [defaultConfig, tabletIOSConfig, define.getTabletIOSDefinePlugin()]
).then(configs => release(configs));
const releaseDistTabletAndroid = () => Q.all(
  [defaultConfig, tabletAndroidConfig, define.getTabletAndroidDefinePlugin()]
).then(configs => release(configs));

const releaseAllDist = () => Q()
  .then(() => releaseDist())
  .then(() => releaseDistSmartphoneIOS())
  .then(() => releaseDistSmartphoneAndroid())
  .then(() => releaseDistTabletIOS())
  .then(() => releaseDistTabletAndroid())

const serveDist = () => Q.all(
  [defaultConfig, webConfig, define.getWebDefinePlugin()]
).then(configs => serve(configs));
const serveDistSmartphoneIOS = () => Q.all(
  [defaultConfig, smartphoneIOSConfig, define.getSmartphoneIOSDefinePlugin()]
).then(configs => serve(configs));
const serveDistSmartphoneAndroid = () => Q.all(
  [defaultConfig, smartphoneAndroidConfig, define.getSmartphoneAndroidDefinePlugin()]
).then(configs => serve(configs));
const serveDistTabletIOS = () => Q.all(
  [defaultConfig, tabletIOSConfig, define.getTabletIOSDefinePlugin()]
).then(configs => serve(configs));
const serveDistTabletAndroid = () => Q.all(
  [defaultConfig, tabletAndroidConfig, define.getTabletAndroidDefinePlugin()]
).then(configs => serve(configs));

const serveAllDist = () => Q()
  .then(() => serveDist())
  .then(() => serveDistSmartphoneIOS())
  .then(() => serveDistSmartphoneAndroid())
  .then(() => serveDistTabletIOS())
  .then(() => serveDistTabletAndroid())

const serveDistVue = () => Q.all(
  [defaultConfig, webConfig, vueConfig, define.getWebDefinePlugin()]
).then(configs => serve(configs));

module.exports = {
  buildDist,
  buildDistSmartphoneIOS,
  buildDistSmartphoneAndroid,
  buildDistTabletIOS,
  buildDistTabletAndroid,
  buildAllDist,

  releaseDist,
  releaseDistSmartphoneIOS,
  releaseDistSmartphoneAndroid,
  releaseDistTabletIOS,
  releaseDistTabletAndroid,
  releaseAllDist,

  serveDist,
  serveDistSmartphoneIOS,
  serveDistSmartphoneAndroid,
  serveDistTabletIOS,
  serveDistTabletAndroid,
  serveAllDist,

  serveDistVue,
}
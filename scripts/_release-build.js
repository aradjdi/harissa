const Q = require('q');
const webpackCommand = require('./_webpack');
const merge = require('./_merge');

const defaultConfig = require('./configs/webpack.config');
const webConfig = require('./configs/webpack.web.config');
const assetsConfig = require('./configs/webpack.assets.config');
const babelConfig = require('./configs/webpack.babel.config');
const eslintConfig = require('./configs/webpack.eslint.config');
const smartphoneIOSConfig = require('./configs/webpack.smartphone.ios.config');
const smartphoneAndroidConfig = require('./configs/webpack.smartphone.android.config');
const tabletIOSConfig = require('./configs/webpack.tablet.ios.config');
const tabletAndroidConfig = require('./configs/webpack.tablet.android.config');
const getWebBuildConfig = () => merge.mergeConfig(
  defaultConfig, webConfig, assetsConfig,
  babelConfig, eslintConfig
);
const getSmartphoneIOSBuildConfig = () => merge.mergeConfig(
  defaultConfig, smartphoneIOSConfig, assetsConfig,
  babelConfig, eslintConfig
);
const getSmartphoneAndroidBuildConfig = () => merge.mergeConfig(
  defaultConfig, smartphoneAndroidConfig, assetsConfig,
  babelConfig, eslintConfig
);
const getTabletIOSBuildConfig = () => merge.mergeConfig(
  defaultConfig, tabletIOSConfig, assetsConfig,
  babelConfig, eslintConfig
);
const getTabletAndroidBuildConfig = () => merge.mergeConfig(
  defaultConfig, tabletAndroidConfig, assetsConfig,
  babelConfig, eslintConfig
);

const buildDist = () => Q()
  .then(() => getWebBuildConfig())
  .then(config => webpackCommand.createCompiler(config))
  .then(compiler => webpackCommand.compileProject(compiler));

const buildDistSmarphoneIOS = () => Q()
  .then(() => getSmartphoneIOSBuildConfig())
  .then(config => webpackCommand.createCompiler(config))
  .then(compiler => webpackCommand.compileProject(compiler));

const buildDistSmartphoneAndroid = () => Q()
  .then(() => getSmartphoneAndroidBuildConfig())
  .then(config => webpackCommand.createCompiler(config))
  .then(compiler => webpackCommand.compileProject(compiler));

const buildDistTabletIOS = () => Q()
  .then(() => getTabletIOSBuildConfig())
  .then(config => webpackCommand.createCompiler(config))
  .then(compiler => webpackCommand.compileProject(compiler));

const buildDistTabletAndroid = () => Q()
  .then(() => getTabletAndroidBuildConfig())
  .then(config => webpackCommand.createCompiler(config))
  .then(compiler => webpackCommand.compileProject(compiler));

module.exports = {
  buildDist,
  buildDistSmarphoneIOS,
  buildDistSmartphoneAndroid,
  buildDistTabletIOS,
  buildDistTabletAndroid,
}
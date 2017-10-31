const Q = require('q');
const webpackCommand = require('./_webpack');
const merge = require('./_merge');

const defaultConfig = require('./configs/webpack.config');
const assetsConfig = require('./configs/webpack.assets.config');
const babelConfig = require('./configs/webpack.babel.config');
const eslintConfig = require('./configs/webpack.eslint.config');
const sourcemapConfig = require('./configs/webpack.sourcemap.config');
const webConfig = require('./configs/webpack.web.config');
const smartphoneIOSConfig = require('./configs/webpack.smartphone.ios.config');
const smartphoneAndroidConfig = require('./configs/webpack.smartphone.android.config');
const tabletIOSConfig = require('./configs/webpack.tablet.ios.config');
const tabletAndroidConfig = require('./configs/webpack.tablet.android.config');
const getWebRunConfig = () => merge.mergeConfig(
  defaultConfig, webConfig, assetsConfig,
  babelConfig, eslintConfig, sourcemapConfig
);
const getSmartphoneIOSRunConfig = () => merge.mergeConfig(
  defaultConfig, smartphoneIOSConfig, assetsConfig,
  babelConfig, eslintConfig, sourcemapConfig
);
const getSmartphoneAndroidRunConfig = () => merge.mergeConfig(
  defaultConfig, smartphoneAndroidConfig, assetsConfig,
  babelConfig, eslintConfig, sourcemapConfig
);
const getTabletIOSRunConfig = () => merge.mergeConfig(
  defaultConfig, tabletIOSConfig, assetsConfig,
  babelConfig, eslintConfig, sourcemapConfig
);
const getTabletAndroidRunConfig = () => merge.mergeConfig(
  defaultConfig, tabletAndroidConfig, assetsConfig,
  babelConfig, eslintConfig, sourcemapConfig
);

const buildDist = () => Q()
  .then(() => getWebRunConfig())
  .then(config => webpackCommand.createCompiler(config))
  .then(compiler => webpackCommand.compileProject(compiler));

const buildDistSmarphoneIOS = () => Q()
  .then(() => getSmartphoneIOSRunConfig())
  .then(config => webpackCommand.createCompiler(config))
  .then(compiler => webpackCommand.compileProject(compiler));

const buildDistSmartphoneAndroid = () => Q()
  .then(() => getSmartphoneAndroidRunConfig())
  .then(config => webpackCommand.createCompiler(config))
  .then(compiler => webpackCommand.compileProject(compiler));

const buildDistTabletIOS = () => Q()
  .then(() => getTabletIOSRunConfig())
  .then(config => webpackCommand.createCompiler(config))
  .then(compiler => webpackCommand.compileProject(compiler));

const buildDistTabletAndroid = () => Q()
  .then(() => getTabletAndroidRunConfig())
  .then(config => webpackCommand.createCompiler(config))
  .then(compiler => webpackCommand.compileProject(compiler));

module.exports = {
  buildDist,
  buildDistSmarphoneIOS,
  buildDistSmartphoneAndroid,
  buildDistTabletIOS,
  buildDistTabletAndroid,
}
const assetUtils = require('./app/task/assetUtils');
const cordovaUtils = require('./app/task/cordovaUtils');
const webpackTaskUtils = require('./app/task/webpackTaskUtils');

assetUtils.initializeProject()
  .then(appInfos => cordovaUtils.initializeProject(appInfos.id, appInfos.name))
  .then(() => webpackTaskUtils.releaseProject())
  .then(() => cordovaUtils.releaseProject())
  .then(() => console.log('***************************************finish'))
  .catch(err => console.error(err));

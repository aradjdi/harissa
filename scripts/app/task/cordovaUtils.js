const Q = require('q');
const pathUtils = require('../pathUtils');
const cordovaCommandUtils = require('../command/cordovaCommandUtils');

const initializeProject = (appId, appName) => {
  const smartphonePromise = cordovaCommandUtils.createProject(
    pathUtils.smartphoneDir,
    appId,
    appName,
    `${pathUtils.templatesDir}/cordova/smartphoneTpl`
  ).then(
    () => cordovaCommandUtils.addPlatforms(pathUtils.smartphoneDir)
  );
  const tabletPromise = cordovaCommandUtils.createProject(
    pathUtils.tabletDir,
    appId,
    appName,
    `${pathUtils.templatesDir}/cordova/tabletTpl`
  ).then(
    () => cordovaCommandUtils.addPlatforms(pathUtils.tabletDir)
  );

  return Q.all([smartphonePromise, tabletPromise]);
  // return Q()
  //   .then(smartphonePromise)
  //   .then(tabletPromise);
};

const releaseProject = () => Q()
  .then(() => cordovaCommandUtils.buildProject(pathUtils.smartphoneDir))
  .then(() => cordovaCommandUtils.buildProject(pathUtils.tabletDir));

const buildProject = srcDir => cordovaCommandUtils.buildProject(srcDir);

module.exports = {
  initializeProject: initializeProject,
  releaseProject: releaseProject,
  buildProject: buildProject
};
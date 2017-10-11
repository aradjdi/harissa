const Q = require('q');
const fs = require('fs-extra');
const pathUtils = require('../pathUtils');
const uploadUtils = require('../others/uploadUtils');
const remoteDestDir = '/stor/ed2xx1/apa/2/ed2xx1_mobilys_wbs_01/www/html/';

const copySmartphonePackages = () => {
  const package = require(pathUtils.smartphoneDir + '/package.json');
  console.log(package);
  const appName = package.displayName;
  console.log(appName);
  const packagePaths = [
    {
      srcDir: `${pathUtils.smartphoneDir}/platforms/android/build/outputs/apk/android-release.apk`,
      destDir: `${pathUtils.storeDir}/smartphone/${appName}.apk`
    },
    {
      srcDir: `${pathUtils.smartphoneDir}/platforms/ios/build/device/${appName}.ipa`,
      destDir: `${pathUtils.storeDir}/smartphone/${appName}.ipa`
    }
  ];
  return Q.all(packagePaths.map(packagePath => 
    fs.copy(packagePath.srcDir, packagePath.destDir)
  ))
};

const copyTabletPackages = () => {
  const appName = require(pathUtils.tabletDir + '/package.json').displayName;
  const packagePaths = [
    {
      srcDir: `${pathUtils.tabletDir}/platforms/android/build/outputs/apk/android-release.apk`,
      destDir: `${pathUtils.storeDir}/tablet/${appName}.apk`
    },
    {
      srcDir: `${pathUtils.tabletDir}/platforms/ios/build/device/${appName}.ipa`,
      destDir: `${pathUtils.storeDir}/tablet/${appName}.ipa`
    }
  ];
  return Q.all(packagePaths.map(packagePath => 
    fs.copy(packagePath.srcDir, packagePath.destDir)
  ))
};

const releaseProject = () => Q.all([
  copySmartphonePackages(),
  copyTabletPackages()
])
  // .then(() => 
  //   uploadUtils.uploadDir(pathUtils.storeDir, remoteDestDir)
  // );


module.exports = {
  releaseProject: releaseProject
}
const Q = require('q');
const fs = require('fs-extra');

const exec = require('./_exec');
const paths = require('./_paths');
const buildUtils = require('./_release-build');

const smartphoneAppName = require(paths.smartphoneDir + '/package.json').displayName;
const tabletAppName = require(paths.tabletDir + '/package.json').displayName;
const storeTokenProd = 'ihdmighsgdvftx29xpiclqikaufstx5f ';

const upgradeVersions = () => {
  const cmd = `npm version patch --no-git-tag-version`;

  return Q.all([
    exec.executeCommand(cmd, paths.srcDir),
    exec.executeCommand(cmd, paths.smartphoneDir),
    exec.executeCommand(cmd, paths.tabletDir)
  ]);
};

const buildSrc = () => Q()
  .then(() => buildUtils.buildDist())
  .then(() => buildUtils.buildDistSmarphoneIOS())
  .then(() => buildUtils.buildDistSmartphoneAndroid())
  .then(() => buildUtils.buildDistTabletIOS())
  .then(() => buildUtils.buildDistTabletAndroid());

const buildReleases = () => {
  const cmd = 'cordova build android ios --release --device';

  return Q()
    .then(() => exec.executeCommand(cmd, paths.smartphoneDir))
    .then(() => exec.executeCommand(cmd, paths.tabletDir));
};

const deployReleases = () => [
  `${paths.smartphoneDir}/platforms/ios/build/device/${smartphoneAppName}.ipa`,
  `${paths.smartphoneDir}/platforms/android/build/outputs/apk/android-release.apk`,
  `${paths.tabletDir}/platforms/ios/build/device/${tabletAppName}.ipa`,
  `${paths.tabletDir}/platforms/android/build/outputs/apk/android-release.apk`
]
  .map(filepath => `ruby ${paths.rootDir}/appaloosa-client.rb ${storeTokenProd} ${filepath}`)
  .reduce((executePromise, cmd) => {
    return executePromise.then(() => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!', cmd);
      return exec.executeCommand(cmd).catch(error => {
        console.log('deployReleases error', error);
      });
    });
  }, Q());

Q()
  .then(() => upgradeVersions())
  .then(() => buildSrc())
  .then(() => buildReleases())
  .then(() => deployReleases())
  .catch(error => {    
    console.log(error);
    const fs = require('fs');
    fs.writeFile('error.log', error, err => {
        if (err) {
          console.log(err);
        }
    
        console.log('The file was saved!');
    });
  });
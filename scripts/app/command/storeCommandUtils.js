const Q = require('q');
const pathUtils = require('../pathUtils');
const execUtils = require('../others/execUtils');
const uploadUtils = require('../others/uploadUtils');

const appName = require(pathUtils.tabletDir + '/package.json').displayName;
const token = 'er355fgfvc23';
const packagePaths = [
  `${pathUtils.tabletDir}/platforms/android/build/outputs/apk/android-release.apk`,
  `${pathUtils.tabletDir}/platforms/ios/build/device/${appName}.ipa`
];

const deployRelease = () => {
  const cmd = `java -jar ./appaloosa-client-1.3 -t ${token} ${packagePaths.join(' ')}`;
  return execUtils.executeCommand(cmd);
}

module.exports = {
  deployRelease: deployRelease
}
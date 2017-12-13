const Q = require('q');

const exec = require('./_exec');
const paths = require('./_paths');


const upgradeVersion = npmDir => exec.executeCommand(`npm version patch --no-git-tag-version`, npmDir);

const upgradeVersions = () => Q.all([
  upgradeVersion(paths.srcDir),
  upgradeVersion(`${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone`),
  upgradeVersion(`${paths.cordovaDir}/${process.env.NODE_ENV}/tablet`)
]);

module.exports = {
  upgradeVersions: upgradeVersions
}

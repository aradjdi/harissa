const moment = require('moment');
const execUtils = require('../others/execUtils');
const pathUtils = require('../pathUtils');

const changeVersion = versionTypeOrNumber => {
  const cmd = `npm version ${versionTypeOrNumber} --no-git-tag-version`;
  return execUtils.executeCommand(cmd);
};

const upgradeVersion = (versionTypeOrNumber, srcDir) => {
  const cmd = `npm version ${versionTypeOrNumber} --no-git-tag-version`;
  return execUtils.executeCommand(cmd, srcDir);
};

const getVersion = () => require(pathUtils.destDir + '/package.json').version;
const getBuildVersion = () => moment().format('YYYYMMDDHHmmssSS');
const createMajor = () => changeVersion('major');
const createMinor = () => changeVersion('minor');
const createPatch = () => changeVersion('patch');

module.exports = {
  getVersion: getVersion,
  getBuildVersion: getBuildVersion,
  createMajor: createMajor,
  createMinor: createMinor,
  createPatch: createPatch,
  upgradeVersion: upgradeVersion
}
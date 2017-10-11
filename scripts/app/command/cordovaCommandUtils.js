const execUtils = require('../others/execUtils');

const createProject = (srcDir, appId, appName, templateDir) => {
  const cmd = `cordova create ${srcDir} ${appId} ${appName} --template ${templateDir}`;
  return execUtils.executeCommand(cmd);
};
const runProject = srcDir => {
  const cmd = 'cordova run android ios --device';
  return execUtils.executeCommand(cmd, srcDir);
};
const buildProject = srcDir => {
  const cmd = 'cordova build android ios --release --device';
  return execUtils.executeCommand(cmd, srcDir);
};
const addPlatforms = srcDir => {
  const cmd = 'cordova platform add android ios';
  return execUtils.executeCommand(cmd, srcDir);
};

module.exports = {
  createProject: createProject,
  runProject: runProject,
  buildProject: buildProject,
  addPlatforms: addPlatforms
}
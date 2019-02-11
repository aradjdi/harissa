const Q = require('q');

const exec = require('./_exec');

const createProject = (appPath, id, name, templatePath) => Q()
    .then(() => exec.executeCommand(`npx cordova create ${appPath} ${id} ${name} --template ${templatePath}`))
    .then(() => exec.executeCommand('npx cordova prepare', appPath));

const packageProject = projectDir => Q()
    .then(() => exec.executeCommand('npx cordova build ios --device --release', projectDir))
    .then(() => exec.executeCommand('npx cordova build android --release', projectDir));

const runProject = (platform, projectDir) => Q()
    .then(() => exec.executeCommand(`npx cordova run ${platform}`, projectDir));

module.exports = {
    createProject,
    packageProject,
    runProject,
};

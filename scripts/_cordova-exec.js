const Q = require('q');

const exec = require('./_exec');

const createProject = (appPath, id, name, templatePath) => Q()
    .then(() => exec.executeCommand(`cordova create ${appPath} ${id} ${name} --template ${templatePath}`))
    .then(() => exec.executeCommand('cordova prepare', appPath));

const packageProject = projectDir => Q()
    .then(() => exec.executeCommand('cordova build android ios --device', projectDir));

const runProject = (platform, projectDir) => Q()
    .then(() => exec.executeCommand(`cordova run ${platform}`, projectDir));

module.exports = {
    createProject,
    packageProject,
    runProject,
};

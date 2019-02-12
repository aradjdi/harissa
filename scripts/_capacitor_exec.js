const Q = require('q');
const exec = require('./_exec');
const path = require('./_paths');

const createProject = (name, id) => Q()
    .then(() => exec.executeCommand('npm install --save @capacitor/cli @capacitor/core', path.currentDir))
    .then(() => exec.executeCommand(`npx cap init ${name} ${id}`, path.currentDir))
    .then(() => exec.executeCommand(`npx cap add android`, path.currentDir))
    .then(() => exec.executeCommand(`npx cap add ios`, path.currentDir));

module.exports = {
    createProject,
}

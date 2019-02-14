const Q = require('q');
const exec = require('./_exec');
const path = require('./_paths');

const DEVICES = require('../bin/_questions').DEVICES_SUPPORTED;

const createProject = (name, id) => Q()
    .spy(() =>
        exec.executeCommand('npm install --save @capacitor/cli @capacitor/core', path.currentDir),
        'capacitor',
        'createProject')
    .spy(() => exec.executeCommand(`npx cap init ${name} ${id}`, path.currentDir), 'capacitor init', 'createProject')
    .spy(() => exec.executeCommand(`npx cap add android`, path.currentDir), 'capacitor android', 'createProject')
    .spy(() => exec.executeCommand(`npx cap add ios`, path.currentDir), 'capacitor ios', 'createProject');

const buildAndroid = () => Q()
    .spy(() =>
        exec.executeCommand('./gradlew compileDebugSources', `${path.currentDir}/android`),
        'gradlew compile',
        'buildAndroid');

const buildIos = () => Q()
    .spy(() => exec.executeCommand);

const buildProject = (device) => Q()
    .spy(() => exec.executeCommand(`npx cap sync ${device}`, path.currentDir), 'capacitor sync', 'buildProject')
    .then(() => {
        switch (device) {
            case DEVICES.android:
                return buildAndroid();
            case DEVICES.ios:
                return buildIos();
            default:
                return buildAndroid().then(buildIos);
        }
    });

module.exports = {
    createProject,
    buildProject,
}

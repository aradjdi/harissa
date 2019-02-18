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

const runAndroid = (id) => Q()
    .spy(() => buildAndroid(), 'harissa rebuild', 'runAndroid')
    .spy(() => exec.executeCommand('./gradlew installDebug', path.currentDir + '/android'), 'gradlew install', 'runAndroid')
    .spy(() => exec.executeCommand(`adb shell am kill ${id}`, path.currentDir + '/android'), 'adb kill', 'runAndroid')
    .spy(() =>
        exec.executeCommand(
            `adb shell cmd package resolve-activity --brief -c android.intent.category.LAUNCHER ${id} | tail -1`,
            path.currentDir + '/android'
        ),
        'adb getActivity', 'runAndroid')
    .spy(([ arg ]) =>
        exec.executeCommand(
            `adb shell cmd activity start-activity ${arg}`,
            path.currentDir + '/android'
        ),
        'run activity', 'runAndroid');

const runProject = (device, id) => {
    switch (device) {
        case DEVICES.android:
            return runAndroid(id);
        case DEVICES.ios:
            return;
        default:
            return;
    }
}

module.exports = {
    createProject,
    buildProject,
    runProject,
}

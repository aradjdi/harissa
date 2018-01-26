const Q = require('q'); require('./_spy');

const banner = require('./_banner');
const questions = require('./_questions');
const tests = require('./_tests');
const versions = require('./_versions');
const builds = require('./_builds');
const cordova = require('./_cordova');
const deploy = require('./_deploy');
const errors = require('./_errors');

const DEVICES = { SMARTPHONE: 'smartphone', TABLET: 'tablet' };
const setEnv = env => Q().then(() => {
    process.env.NODE_ENV = env;
    return env;
});

const askEnv = () => Q()
    .then(() => questions.askNodeEnv())
    .then(env => setEnv(env))
    .catch(errors.onError);

const askDevice = () => Q()
    .then(() => questions.askDevice())
    .then(device => device)
    .catch(errors.onError);

const runTests = () => Q()
    .spy(() => tests.runTests(), 'tests', 'runTests');

const upgradeVersions = () => Q()
    .spy(() => versions.buildPackageVersion(), 'versions', 'buildPackageVersion')
    .spy(() => versions.buildAppVersion(), 'versions', 'buildAppVersion')
    .spy(() => versions.buildBuildVersion(), 'versions', 'buildBuildVersion');

const releaseDists = () => Q()
    .spy(() => builds.releaseDist(), 'builds', 'releaseDist');

const releaseDistSmartphone = () => Q()
    .spy(() => builds.releaseDistSmartphoneIOS(), 'builds', 'releaseDistSmartphoneIOS')
    .spy(() => builds.releaseDistSmartphoneAndroid(), 'builds', 'releaseDistSmartphoneAndroid');

const releaseDistTablet = () => Q()
    .spy(() => builds.releaseDistTabletIOS(), 'builds', 'releaseDistTabletIOS')
    .spy(() => builds.releaseDistTabletAndroid(), 'builds', 'releaseDistTabletAndroid');

const packageSmartphoneProjects = () => Q()
    .spy(() => cordova.packageSmartphoneProjects(), 'cordova', 'packageSmartphoneProjects');

const packageTabletProjects = () => Q()
    .spy(() => cordova.packageTabletProjects(), 'cordova', 'packageTabletProjects');

const uploadSmartphonePackages = () => Q()
    .spy(() => deploy.uploadSmartphonePackages(), 'deploy', 'uploadSmartphonePackages');

const uploadTabletPackages = () => Q()
    .spy(() => deploy.uploadTabletPackages(), 'deploy', 'uploadTabletPackages');

const environment = env => (env ? setEnv.bind(this, env) : askEnv);

const executeRunners = runners => runners.reduce((promise, runner) => promise.then(() => runner()), Q());

const release = (device, env, skipTest) => {
    const runners = [];
    switch (device) {
        case DEVICES.SMARTPHONE:
            runners.push(environment(env));
            if (!skipTest) runners.push(runTests);
            runners.push(upgradeVersions);
            runners.push(releaseDists);
            runners.push(releaseDistSmartphone);
            runners.push(packageSmartphoneProjects);
            // runners.push(uploadSmartphonePackages);
            break;
        case DEVICES.TABLET:
            runners.push(environment(env));
            if (!skipTest) runners.push(runTests);
            runners.push(upgradeVersions);
            runners.push(releaseDists);
            runners.push(releaseDistTablet);
            runners.push(packageTabletProjects);
            // runners.push(uploadTabletPackages);
            break;
        default:
            return askDevice()
                .then(_device => release(_device, env).then(fn => fn()));
    }

    return executeRunners(runners).then(() => process.exit());
};

const build = (device, env, skipTest) => {
    const runners = [];
    switch (device) {
        case DEVICES.SMARTPHONE:
            runners.push(environment(env));
            if (!skipTest) runners.push(runTests);
            runners.push(releaseDistSmartphone);
            runners.push(packageSmartphoneProjects);
            break;
        case DEVICES.TABLET:
            runners.push(environment(env));
            if (!skipTest) runners.push(runTests);
            runners.push(releaseDistTablet);
            runners.push(packageTabletProjects);
            break;
        default:
            return askDevice()
                .then(_device => build(_device, env).then(fn => fn()));
    }

    return executeRunners(runners).then(() => {
        console.log('build finished');
    });
};

module.exports = {
    release(device, env, skipTest) {
        banner.show().then(() => release(device, env, skipTest));
    },
    build(device, env, skipTest) {
        banner.show().then(() => build(device, env, skipTest));
    }
};

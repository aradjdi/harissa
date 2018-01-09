const Q = require('q'); require('./_spy');

const banner = require('./_banner');
const questions = require('./_questions');
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

const release = (device, env) => {
    const runners = [];
    switch (device) {
        case DEVICES.SMARTPHONE:
            runners.push(environment(env));
            runners.push(upgradeVersions);
            runners.push(releaseDists);
            runners.push(releaseDistSmartphone);
            runners.push(packageSmartphoneProjects);
            runners.push(uploadSmartphonePackages);
            break;
        case DEVICES.TABLET:
            runners.push(environment(env));
            runners.push(upgradeVersions);
            runners.push(releaseDists);
            runners.push(releaseDistTablet);
            runners.push(packageTabletProjects);
            runners.push(uploadTabletPackages);
            break;
        default:
            return askDevice()
                .then(_device => release(_device, env).then(fn => fn()));
    }

    return executeRunners(runners).then(() => process.exit());
};

const upload = (device, env) => {
    const runners = [];
    switch (device) {
        case DEVICES.SMARTPHONE:
            runners.push(environment(env));
            runners.push(uploadSmartphonePackages);
            break;
        case DEVICES.TABLET:
            runners.push(environment(env));
            runners.push(uploadTabletPackages);
            break;
        default:
            return askDevice()
                .then(_device => upload(_device, env).then(fn => fn()));
    }

    return executeRunners(runners);
};

const build = (device, env) => {
    const runners = [];
    switch (device) {
        case DEVICES.SMARTPHONE:
            runners.push(environment(env));
            runners.push(upgradeVersions);
            runners.push(releaseDists);
            runners.push(releaseDistSmartphone);
            runners.push(packageSmartphoneProjects);
            break;
        case DEVICES.TABLET:
            runners.push(environment(env));
            runners.push(upgradeVersions);
            runners.push(releaseDists);
            runners.push(releaseDistTablet);
            runners.push(packageTabletProjects);
            break;
        default:
            return askDevice()
                .then(_device => build(_device, env).then(fn => fn()));
    }

    return executeRunners(runners);
};

module.exports = {
    release(device, env) {
        banner.show().then(() => release(device, env));
    },
    build(device, env) {
        banner.show().then(() => build(device, env));
    },
    upload(device, env) {
        banner.show().then(() => upload(device, env));
    }
};

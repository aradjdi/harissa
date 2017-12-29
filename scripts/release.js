const Q = require('q');

const banner = require('./_banner');
const questions = require('./_questions');
const versions = require('./_versions');

const builds = require('./_builds');
const deploy = require('./_deploy');
const cordova = require('./_cordova');
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
    .then(() => versions.buildPackageVersion())
    .then(() => versions.buildAppVersion())
    .then(() => versions.buildBuildVersion())
    .catch(errors.onError);

const releaseDists = () => Q()
    .then(() => builds.releaseDist())
    .catch(errors.onError);

const releaseDistSmartphone = () => Q()
    .then(() => builds.releaseDistSmartphoneIOS())
    .then(() => builds.releaseDistSmartphoneAndroid())
    .catch(errors.onError);

const releaseDistTablet = () => Q()
    .then(() => builds.releaseDistTabletIOS())
    .then(() => builds.releaseDistTabletAndroid())
    .catch(errors.onError);

const packageSmartphoneProjects = () => Q()
    .then(() => cordova.packageSmartphoneProjects())
    .catch(errors.onError);

const packageTabletProjects = () => Q()
    .then(() => cordova.packageTabletProjects())
    .catch(errors.onError);

const uploadSmartphonePackages = () => Q()
    .then(() => deploy.uploadSmartphonePackages())
    .catch(errors.onError);

const uploadTabletPackages = () => Q()
    .then(() => deploy.uploadTabletPackages())
    .catch(errors.onError);

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
            // runners.push(uploadSmartphonePackages);
            break;
        case DEVICES.TABLET:
            runners.push(environment(env));
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

const build = (device, env) => {
    const runners = [];
    switch (device) {
        case DEVICES.SMARTPHONE:
            runners.push(environment(env));
            runners.push(releaseDistSmartphone);
            runners.push(packageSmartphoneProjects);
            break;
        case DEVICES.TABLET:
            runners.push(environment(env));
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
    release(device, env) {
        banner.show().then(() => release(device, env));
    },
    build(device, env) {
        banner.show().then(() => build(device, env));
    }
};

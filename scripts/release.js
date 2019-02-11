const Q = require('q'); require('./_spy');

const versions = require('./_versions');
const cordova = require('./_cordova');
const errors = require('./_errors');

const initNodeEnv = env => process.env.NODE_ENV = env;

const upgradeVersions = () => Q()
    .spy(() => versions.buildAppVersion(), 'versions', 'buildAppVersion')
    .spy(() => versions.buildBuildVersion(), 'versions', 'buildBuildVersion');

const packageSmartphoneProjects = () => Q()
    .spy(() => cordova.packageSmartphoneProjects(), 'cordova', 'packageSmartphoneProjects');

const packageTabletProjects = () => Q()
    .spy(() => cordova.packageTabletProjects(), 'cordova', 'packageTabletProjects');

const releaseApplication = device => {
    switch (device) {
        case 'smartphone': return packageSmartphoneProjects();
        case 'tablet':     return packageTabletProjects();
    }
};

const release = ({ device, env }) => Q()
    .then(() => initNodeEnv(env))
    .then(() => upgradeVersions())
    .then(() => releaseApplication(device))
    .catch(errors.onError);

module.exports = release;
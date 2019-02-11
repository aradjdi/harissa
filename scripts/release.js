const Q = require('q'); require('./_spy');

const versions = require('./_versions');
const builds = require('./_builds');
const cordova = require('./_cordova');
const deploy = require('./_deploy');
const errors = require('./_errors');

const initNodeEnv = env => process.env.NODE_ENV = env;

const upgradeVersions = version => Q()
    .spy(() => versions.buildPackageVersion(version), 'versions', 'buildPackageVersion')
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

const uploadSmartphonePackages = changes => Q()
    .spy(() => deploy.uploadSmartphonePackages(changes), 'deploy', 'uploadSmartphonePackages');

const uploadTabletPackages = changes => Q()
    .spy(() => deploy.uploadTabletPackages(changes), 'deploy', 'uploadTabletPackages');

const releaseApplication = (device, changes) => {
    switch (device) {
        case 'smartphone': return releaseDistSmartphone().then(() => packageSmartphoneProjects()).then(() => uploadSmartphonePackages(changes));
        case 'tablet':     return releaseDistTablet().then(() => packageTabletProjects()).then(() => uploadTabletPackages(changes));
    }
};

const release = ({ device, env, version, changes }) => Q()
    .then(() => initNodeEnv(env))
    .then(() => upgradeVersions(version))
    .then(() => releaseDists())
    .then(() => releaseApplication(device, changes))
    .catch(errors.onError);

module.exports = release;
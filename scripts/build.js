const Q = require('q'); require('./_spy');

const versions = require('./_versions');
const builds = require('./_builds');
const errors = require('./_errors');

const initNodeEnv = env => process.env.NODE_ENV = env;

const upgradeVersions = version => Q()
    .spy(() => versions.buildPackageVersion(version), 'versions', 'buildPackageVersion');

const releaseDists = () => Q()
    .spy(() => builds.releaseDist(), 'builds', 'releaseDist');

const releaseDistSmartphone = () => Q()
    .spy(() => builds.releaseDistSmartphoneIOS(), 'builds', 'releaseDistSmartphoneIOS')
    .spy(() => builds.releaseDistSmartphoneAndroid(), 'builds', 'releaseDistSmartphoneAndroid');

const releaseDistTablet = () => Q()
    .spy(() => builds.releaseDistTabletIOS(), 'builds', 'releaseDistTabletIOS')
    .spy(() => builds.releaseDistTabletAndroid(), 'builds', 'releaseDistTabletAndroid');

const buildApplication = device => {
    switch (device) {
        case 'smartphone': return releaseDistSmartphone();
        case 'tablet':     return releaseDistTablet();
    }
};

const build = ({ device, env, version }) => Q()
    .then(() => initNodeEnv(env))
    .then(() => upgradeVersions(version))
    .then(() => releaseDists())
    .then(() => buildApplication(device))
    .catch(errors.onError);

module.exports = build;
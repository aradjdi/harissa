const Q = require('q'); require('./_spy');

const versions = require('./_versions');
const builds = require('./_builds');
const capacitor = require('./_capacitor_exec');
const errors = require('./_errors');

const FRAMEWORKS = require('../bin/_questions').FRAMEWORKS_SUPPORTED;

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

const buildCordova = (device) => Q()
    .then(() => releaseDists())
    .then(() => buildApplication(device));

const buildCapacitor = device => Q()
    .then(() => capacitor.buildProject(device));

const buildProject = (techEnv, device) => Q()
    .then(() => {
        switch (techEnv) {
            case FRAMEWORKS.cordova:
                return buildCordova(device);
            case FRAMEWORKS.capacitor:
                return buildCapacitor(device);
            default:
                throw 'A framework choose but not available for harissa project ! ! !';
        }
    });

const build = ({ techEnv, device, env, version }) => Q()
    .then(() => initNodeEnv(env))
    .then(() => upgradeVersions(version))
    .then(() => buildProject(techEnv, device))
    .catch(errors.onError);

module.exports = build;

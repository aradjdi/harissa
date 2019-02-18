const Q = require('q'); require('./_spy');

const builds = require('./_builds');
const cordova = require('./_cordova');
const capacitor = require('./_capacitor_exec');
const errors = require('./_errors');

const FRAMEWORKS = require('../bin/_questions').FRAMEWORKS_SUPPORTED;
const DEVICES = require('../bin/_questions').DEVICES_SUPPORTED;

const initNodeEnv = env => process.env.NODE_ENV = env;

const buildSmartphoneApplication = os => {
    switch (os) {
        case 'android': return builds.buildDistSmartphoneAndroid();
        case 'ios':     return builds.buildDistSmartphoneIOS();
    }
}

const buildTabletApplication = os => {
    switch (os) {
        case 'android': return builds.buildDistTabletAndroid();
        case 'ios':     return builds.buildDistTabletIOS();
    }
}

const buildApplication = (device, os) => {
    switch (device) {
        case 'smartphone': return Q()
            .spy(() => buildSmartphoneApplication(os), 'build', 'buildDistSmartphone');

        case 'tablet': return Q()
            .spy(() => buildTabletApplication(os), 'build', 'buildDistTablet');
    }
};

const runApplication = (device, os) => Q()
    .spy(() => cordova.runProject(device, os), 'cordova', 'runProject');

const runCordova = (env, device, os) => Q()
    .then(() => initNodeEnv(env))
    .then(() => buildApplication(device, os))
    .then(() => runApplication(device, os));

const run = ({ device, os, env, techEnv, id }) => Q()
    .then(() => {
        switch (techEnv) {
            case FRAMEWORKS.cordova:
                return runCordova(env, device, os);
            case FRAMEWORKS.capacitor:
                return capacitor.runProject(os, id);
            default:
                throw 'A framework choose but not available for harissa project ! ! !';
        }
    })
    .catch(errors.onError);

module.exports = run;

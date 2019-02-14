const Q = require('q'); require('./_spy');

const builds = require('./_builds');
const cordova = require('./_cordova');
const errors = require('./_errors');

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

const run = ({ device, os, env }) => Q()
    .then(() => initNodeEnv(env))
    .then(() => buildApplication(device, os))
    .then(() => runApplication(device, os))
    .catch(errors.onError);

module.exports = run;
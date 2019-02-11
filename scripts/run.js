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

const runApplication =  (device, os) => {
    switch (device) {
        case 'smartphone': return Q()
            .spy(() => buildSmartphoneApplication(os), 'build', 'buildDistSmartphone')
            .spy(() => cordova.runSmartphone(os), 'cordova', 'runSmartphone');

        case 'tablet': return Q()
            .spy(() => buildTabletApplication(os), 'build', 'buildDistTablet')
            .spy(() => cordova.runTablet(os), 'cordova', 'runTablet');
    }
};

const run = ({ device, os, env }) => Q()
    .then(() => initNodeEnv(env))
    .then(() => runApplication(device, os))
    .catch(errors.onError);

module.exports = run;
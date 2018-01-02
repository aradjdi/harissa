const Q = require('q'); require('./_spy');

const banner = require('./_banner');
const questions = require('./_questions');
const builds = require('./_builds');
const cordova = require('./_cordova');
const errors = require('./_errors');

const DEVICES = { SMARTPHONE: 'smartphone', TABLET: 'tablet' };
const OS = { ANDROID: 'android', IOS: 'ios' };

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

const askOS = () => Q()
    .then(() => questions.askOS())
    .then(os => os)
    .catch(errors.onError);

const runSmartphoneAndroid = () => Q()
    .spy(() => builds.buildDistSmartphoneAndroid(), 'build', 'buildDistSmartphoneAndroid')
    .spy(() => cordova.runSmartphone('android'), 'cordova', 'runSmartphone');

const runSmartphoneIOS = () => Q()
    .spy(() => builds.buildDistSmartphoneIOS(), 'build', 'buildDistSmartphoneIOS')
    .spy(() => cordova.runSmartphone('ios'), 'cordova', 'runSmartphone');

const runTabletAndroid = () => Q()
    .spy(() => builds.buildDistTabletAndroid(), 'build', 'buildDistTabletAndroid')
    .spy(() => cordova.runTablet('android'), 'cordova', 'runTablet');

const runTabletIOS = () => Q()
    .spy(() => builds.buildDistTabletIOS(), 'build', 'buildDistTabletIOS')
    .spy(() => cordova.runTablet('ios'), 'cordova', 'runTablet');

const environment = env => (env ? setEnv.bind(this, env) : askEnv);

const checkSmartphoneOS = (os) => {
    switch (os) {
        case OS.ANDROID:
            return runSmartphoneAndroid;
        case OS.IOS:
            return runSmartphoneIOS;
        default:
            return () => askOS()
                .then(_os => checkSmartphoneOS(_os))
                .then(fn => fn());
    }
};

const checkTabletOS = (os) => {
    switch (os) {
        case OS.ANDROID:
            return runTabletAndroid;
        case OS.IOS:
            return runTabletIOS;
        default:
            return () => askOS()
                .then(_os => checkTabletOS(_os))
                .then(fn => fn());
    }
};

const executeRunners = runners => runners.reduce((promise, runner) => promise.then(() => runner()), Q());

const run = (device, os, env) => {
    // console.log(device);
    // console.log(os);

    const runners = [];

    switch (device) {
        case DEVICES.SMARTPHONE:
            runners.push(environment(env));
            runners.push(checkSmartphoneOS(os));
            break;
        case DEVICES.TABLET:
            runners.push(environment(env));
            runners.push(checkTabletOS(os));
            break;
        default:
            return askDevice()
                .then(_device => run(_device, os, env).then(fn => fn()));
    }

    return executeRunners(runners).then(() => process.exit());
};

module.exports = {
    run(device, os, env) {
        banner.show().then(() => run(device, os, env));
    }
};

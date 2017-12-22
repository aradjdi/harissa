const Q = require('q');

const questions = require('./_questions');

const builds = require('./_builds');
const cordova = require('./_cordova');
const errors = require('./_errors');

const init = () => Q()
    .then(() => questions.askNodeEnv())
    .then((nodeEnv) => { process.env.NODE_ENV = nodeEnv; })
    .then(() => builds.buildDistSmartphoneAndroid())
    .then(() => cordova.runSmartphone('android'))
    .catch(errors.onError);

module.exports = { init };

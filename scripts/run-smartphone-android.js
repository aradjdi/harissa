const Q = require('q');

const env = require('./_env');

const builds = require('./_builds');
const cordova = require('./_cordova');
const errors = require('./_errors');

Q()
  .then(() => env.initNodeEnv())
  .then(() => builds.buildDistSmartphoneAndroid())
  .then(() => cordova.runSmartphone('android'))
  .catch(errors.onError);

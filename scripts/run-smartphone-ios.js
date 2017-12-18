const Q = require('q');

const env = require('./_env');

const builds = require('./_builds');
const cordova = require('./_cordova');
const errors = require('./_errors');

Q()
  .then(() => env.initNodeEnv())
  .then(() => builds.buildDistSmartphoneIOS())
  .then(() => cordova.runSmartphone('ios'))
  .catch(errors.onError);

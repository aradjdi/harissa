const Q = require('q');

const builds = require('./_builds');
const cordova = require('./_cordova');
const errors = require('./_errors');

Q()
  .then(() => builds.buildDistSmartphoneIOS())
  .then(() => cordova.runSmartphone('ios'))
  .catch(errors.onError);
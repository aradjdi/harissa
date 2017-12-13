const Q = require('q');

const builds = require('./_builds');
const cordova = require('./_cordova');
const errors = require('./_errors');

Q()
  .then(() => builds.buildDistSmartphoneAndroid())
  .then(() => cordova.runSmartphone('android'))
  .catch(errors.onError);
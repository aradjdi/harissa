const Q = require('q');

const builds = require('./_builds');
const cordova = require('./_cordova');
const errors = require('./_errors');

Q()
  .then(() => builds.buildDistTabletIOS())
  .then(() => cordova.runTablet('ios'))
  .catch(errors.onError);
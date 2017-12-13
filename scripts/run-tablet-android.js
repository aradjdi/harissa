const Q = require('q');

const builds = require('./_builds');
const cordova = require('./_cordova');
const errors = require('./_errors');

Q()
  .then(() => builds.buildDistTabletAndroid())
  .then(() => cordova.runTablet('android'))
  .catch(errors.onError);
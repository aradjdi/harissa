const Q = require('q');

const builds = require('./_builds');
const deploy = require('./_deploy');
const cordova = require('./_cordova');
const versions = require('./_versions');
const errors = require('./_errors');

Q()
  .then(() => versions.upgradeVersions())
  .then(() => builds.releaseAllDist())
  .then(() => cordova.packageCordovaProjects())
  .then(() => deploy.uploadPackages())
  .catch(errors.onError);
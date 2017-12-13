const Q = require('q');

const builds = require('./_builds');
const errors = require('./_errors');

Q()
  .then(() => builds.serveDist())
  .catch(errors.onError);
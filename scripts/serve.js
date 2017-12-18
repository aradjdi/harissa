const Q = require('q');

const env = require('./_env');

const builds = require('./_builds');
const errors = require('./_errors');

Q()
  .then(() => env.initNodeEnv())
  .then(() => builds.serveDist())
  .catch(errors.onError);

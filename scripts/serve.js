const Q = require('q'); require('./_spy');

const builds = require('./_builds');
const errors = require('./_errors');

const initNodeEnv = env => process.env.NODE_ENV = env;

const buildAndServeDist = () => Q()
    .spy(() => builds.serveDist(), 'build', 'serveDist');

const serve = ({ env }) => Q()
    .then(() => initNodeEnv(env))
    .then(() => buildAndServeDist())
    .catch(errors.onError);

module.exports = serve;

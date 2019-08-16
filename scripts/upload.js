const Q = require('q'); require('./_spy');

const deploy = require('./_deploy');
const errors = require('./_errors');

const initNodeEnv = env => process.env.NODE_ENV = env;

const uploadPackages = (device, changes, proxy) => Q()
    .spy(() => deploy.uploadPackages(device, changes, proxy), 'deploy', 'uploadPackages');

const upload = ({ device, env, changes, proxy }) => Q()
    .then(() => initNodeEnv(env))
    .then(() => uploadPackages(device, changes, proxy))
    .catch(errors.onError);

module.exports = upload;
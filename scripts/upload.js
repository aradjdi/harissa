const Q = require('q'); require('./_spy');

const deploy = require('./_deploy');
const errors = require('./_errors');

const initNodeEnv = env => process.env.NODE_ENV = env;

const uploadPackages = (device, changes) => Q()
    .spy(() => deploy.uploadPackages(device, changes), 'deploy', 'uploadPackages');

const upload = ({ device, env, changes }) => Q()
    .then(() => initNodeEnv(env))
    .then(() => uploadPackages(device, changes))
    .catch(errors.onError);

module.exports = upload;
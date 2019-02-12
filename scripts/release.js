const Q = require('q'); require('./_spy');

const versions = require('./_versions');
const cordova = require('./_cordova');
const errors = require('./_errors');

const initNodeEnv = env => process.env.NODE_ENV = env;

const upgradeVersions = () => Q()
    .spy(() => versions.buildAppVersion(), 'versions', 'buildAppVersion')
    .spy(() => versions.buildBuildVersion(), 'versions', 'buildBuildVersion');

const packageProject = device => Q()
    .spy(() => cordova.packageProject(device), 'cordova', 'packageProject');

const release = ({ device, env }) => Q()
    .then(() => initNodeEnv(env))
    .then(() => upgradeVersions())
    .then(() => packageProject(device))
    .catch(errors.onError);

module.exports = release;
const Q = require('q'); require('./_spy');

const deploy = require('./_deploy');
const errors = require('./_errors');

const initNodeEnv = env => process.env.NODE_ENV = env;

const uploadSmartphonePackages = changes => Q()
    .spy(() => deploy.uploadSmartphonePackages(changes), 'deploy', 'uploadSmartphonePackages');

const uploadTabletPackages = changes => Q()
    .spy(() => deploy.uploadTabletPackages(changes), 'deploy', 'uploadTabletPackages');

const uploadPackages =  (device, changes) => {
    switch (device) {
        case 'smartphone': return uploadSmartphonePackages(changes);
        case 'tablet':     return uploadTabletPackages(changes);
    }
};

const upload = ({ device, env, changes }) => Q()
    .then(() => initNodeEnv(env))
    .then(() => uploadPackages(device, changes))
    .catch(errors.onError);

module.exports = upload;
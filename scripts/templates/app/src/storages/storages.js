// load main wrapper
import storageSrv from './_storage/storage';

// load pdv Storage
import pdvStorage from './pdv';

const storagesModule = angular
    .module('main.storages', [])
    .service('storageSrv', storageSrv)
    .service('pdvStorage', pdvStorage)
    .name;

export default storagesModule;

import keycloakInterceptor from './common/keycloakInterceptor';
import keycloakAuthSrv from './common/keycloakAuth';
import authSrv from './common/auth';
import fetchSrv from './common/fetch';
import actualitiesSrv from './actualities';
import callsSrv from './calls';
import contactsSrv from './contacts';
import flashInfosSrv from './flashInfos';
import hoursSrv from './hours';

const servicesModule = angular
    .module('main.services', [])
    .service('actualitiesSrv', actualitiesSrv)
    .service('callsSrv', callsSrv)
    .service('contactsSrv', contactsSrv)
    .service('flashInfosSrv', flashInfosSrv)
    .service('hoursSrv', hoursSrv)
    .service('fetchSrv', fetchSrv)
    .service('authSrv', authSrv)
    .service('keycloakAuthSrv', keycloakAuthSrv)
    .factory('keycloakInterceptor', keycloakInterceptor)
    .config(($httpProvider) => {
        $httpProvider.interceptors.push('keycloakInterceptor');
    })
    .name;

export default servicesModule;

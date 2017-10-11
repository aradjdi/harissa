import fetchSrv from './common/fetch';
import authSrv from './common/auth';
import actualitiesSrv from './actualities.mock';
import callsSrv from './calls.mock';
import contactsSrv from './contacts.mock';
import flashInfosSrv from './flashInfos.mock';
import hoursSrv from './hours.mock';

const servicesModule = angular
  .module('main.services', [])
  .service('fetchSrv', fetchSrv)
  .service('authSrv', authSrv)
  .service('actualitiesSrv', actualitiesSrv)
  .service('callsSrv', callsSrv)
  .service('contactsSrv', contactsSrv)
  .service('flashInfosSrv', flashInfosSrv)
  .service('hoursSrv', hoursSrv)
  .name;

export default servicesModule;

import configCst from './configCst';

const constantsModule = angular
  .module('main.constants', [])
  .constant('configCst', configCst)
  .name;

export default constantsModule;

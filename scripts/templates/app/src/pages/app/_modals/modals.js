import modalLogoutModule from './modalLogout/modalLogout';
import modalMenuModule from './modalMenu/modalMenu';

const modalsModule = angular
  .module('main.modals', [
    modalLogoutModule,
    modalMenuModule,
  ])
  .name;

export default modalsModule;

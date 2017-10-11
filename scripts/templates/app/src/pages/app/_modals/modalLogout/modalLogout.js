// Load animations dependencies
import ngAnimate from 'angular-animate';
import modalLogoutAnimation from './modalLogout.animation';

// load main component
import modalLogoutComponent from './modalLogout.component';

const modalLogoutModule = angular
  .module('modalLogout', [ngAnimate])
  .component('modalLogout', modalLogoutComponent)
  .animation('.modal-logout__animation', modalLogoutAnimation)
  .name;

export default modalLogoutModule;

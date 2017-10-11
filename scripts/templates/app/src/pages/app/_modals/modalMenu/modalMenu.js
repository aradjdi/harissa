// Load animations dependencies
import ngAnimate from 'angular-animate';
import modalMenuAnimation from './modalMenu.animation';

// load main component
import modalMenuComponent from './modalMenu.component';

const modalMenuModule = angular
  .module('modalMenu', [ngAnimate])
  .component('modalMenu', modalMenuComponent)
  .animation('.modal-menu__animation', modalMenuAnimation)
  .name;

export default modalMenuModule;

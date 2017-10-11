// Load animations dependencies
import ngAnimate from 'angular-animate';
import flashInfosAnimation from './flashInfos.animation';

// load main component
import flashInfosComponent from './flashInfos.component';

const flashInfosModule = angular
  .module('flashInfos', [ngAnimate])
  .component('flashInfos', flashInfosComponent)
  .animation('.flash-infos-list__animation', flashInfosAnimation)
  .name;

export default flashInfosModule;

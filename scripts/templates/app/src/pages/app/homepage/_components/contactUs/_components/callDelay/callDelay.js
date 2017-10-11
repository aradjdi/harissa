// load main component
import callDelayComponent from './callDelay.component';

const callDelayModule = angular
  .module('callDelay', [])
  .component('callDelay', callDelayComponent)
  .name;

export default callDelayModule;

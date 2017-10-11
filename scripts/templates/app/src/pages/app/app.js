// Load modals dependencies
import modalsModule from './_modals/modals';

// load main component
import appComponent from './app.component';

const appModule = angular
  .module('main.pages.app', [modalsModule])
  .component('app', appComponent)
  .name;

export default appModule;

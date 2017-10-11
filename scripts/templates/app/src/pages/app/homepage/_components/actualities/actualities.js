// Load components dependencies
import actualityItemModule from './_components/actualityItem/actualityItem';

// load main component
import actualitiesComponent from './actualities.component';

const actualitiesModule = angular
  .module('actualities', [actualityItemModule])
  .component('actualities', actualitiesComponent)
  .name;

export default actualitiesModule;

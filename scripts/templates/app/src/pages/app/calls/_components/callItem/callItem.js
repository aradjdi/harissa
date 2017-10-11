// load main component
import callItemComponent from './callItem.component';

const callItemModule = angular
  .module('callItem', [])
  .component('callItem', callItemComponent)
  .name;

export default callItemModule;

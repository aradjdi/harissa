import actualityItemComponent from './actualityItem.component';

const actualityItemModule = angular
  .module('actualityItem', [])
  .component('actualityItem', actualityItemComponent)
  .name;

export default actualityItemModule;

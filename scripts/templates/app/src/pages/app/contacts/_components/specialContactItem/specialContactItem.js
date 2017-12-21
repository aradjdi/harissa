// load main component
import specialContactItemComponent from './specialContactItem.component';

const specialContactItemModule = angular
    .module('specialContactItem', [])
    .component('specialContactItem', specialContactItemComponent)
    .name;

export default specialContactItemModule;

// load main component
import contactItemComponent from './contactItem.component';

const contactItemModule = angular
    .module('contactItem', [])
    .component('contactItem', contactItemComponent)
    .name;

export default contactItemModule;

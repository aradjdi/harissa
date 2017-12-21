// load main component
import welcomeHeaderComponent from './welcomeHeader.component';

const welcomeHeaderModule = angular
    .module('welcomeHeader', [])
    .component('welcomeHeader', welcomeHeaderComponent)
    .name;

export default welcomeHeaderModule;

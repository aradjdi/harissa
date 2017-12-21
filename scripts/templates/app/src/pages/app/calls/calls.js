// Load components dependencies
import callItemModule from './_components/callItem/callItem';

// load main component
import callsComponent from './calls.component';

const callsModule = angular
    .module('main.pages.calls', [callItemModule])
    .component('calls', callsComponent)
    .name;

export default callsModule;

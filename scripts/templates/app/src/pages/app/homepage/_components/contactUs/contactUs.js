// Load components dependencies
import affluenceStatsModule from './_components/affluenceStats/affluenceStats';
import callDelayModule from './_components/callDelay/callDelay';
import contactUsDetailModule from './_components/contactUsDetail/contactUsDetail';

// load main component
import contactUsComponent from './contactUs.component';

const contactUsModule = angular
  .module('contactUs', [
    affluenceStatsModule,
    callDelayModule,
    contactUsDetailModule,
  ])
  .component('contactUs', contactUsComponent)
  .name;

export default contactUsModule;

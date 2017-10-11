// Load components dependencies
import actualitiesModule from './_components/actualities/actualities';
import contactUsModule from './_components/contactUs/contactUs';
import flashInfosModule from './_components/flashInfos/flashInfos';
import welcomeHeaderModule from './_components/welcomeHeader/welcomeHeader';

// load main component
import homepageComponent from './homepage.component';

const homepageModule = angular
  .module('main.pages.app.homepage', [
    actualitiesModule,
    contactUsModule,
    flashInfosModule,
    welcomeHeaderModule,
  ])
  .component('homepage', homepageComponent)
  .name;

export default homepageModule;

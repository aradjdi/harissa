// load main component
import contactUsDetailComponent from './contactUsDetail.component';

const contactUsDetailModule = angular
  .module('contactUsDetail', [])
  .component('contactUsDetail', contactUsDetailComponent)
  .name;

export default contactUsDetailModule;

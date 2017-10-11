// load main component
import radioFieldComponent from './radioField.component';

const radioFieldModule = angular
  .module('radioField', [])
  .component('radioField', radioFieldComponent)
  .name;

export default radioFieldModule;

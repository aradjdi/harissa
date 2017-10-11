// load main component
import loginComponent from './login.component';

const loginModule = angular
  .module('main.pages.login', [])
  .component('login', loginComponent)
  .name;

export default loginModule;

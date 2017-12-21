// load services dependencies
import loaderSrv from './loader.service';

// load interceptor dependencies
import loaderInterceptor from './loader.interceptor';

// load main component
import loaderComponent from './loader.component';

const loaderModule = angular
    .module('loader', [])
    .component('loader', loaderComponent)
    .factory('loaderSrv', loaderSrv)
    .factory('loaderInterceptor', loaderInterceptor)
    .config(($httpProvider) => {
        $httpProvider.interceptors.push('loaderInterceptor');
    })
    .name;

export default loaderModule;

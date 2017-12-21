import setupAppaloosa from './setups/setupAppaloosa';
import setupKeycloak from './setups/setupKeycloak';
import './sass/style.scss';

const startApp = () => {
    require.ensure([], () => require('./bootstrap'), 'bootstrap');
};

const initWebApp = () => setupKeycloak().then(startApp);

const initCordovaApp = () => setupAppaloosa().then(initWebApp);

if (__CONFIG__.CONTEXT !== 'web') {
    document.addEventListener('deviceready', initCordovaApp, false);
} else {
    initWebApp();
}

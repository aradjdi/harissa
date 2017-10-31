import setupAppaloosa from './setups/setupAppaloosa';
import setupKeycloak from './setups/setupKeycloak';
import './sass/style.scss';

// window.PLATFORM = 'web';
// window.CONTEXT = 'web';
window.PLATFORM = 'android';
window.CONTEXT = 'smartphone';

const startApp = () => {
  require.ensure([], () => require('./bootstrap'), 'bootstrap');
};

const initWebApp = () => setupKeycloak().then(startApp).catch(() => {
});

const initCordovaApp = () => setupAppaloosa().then(initWebApp);

if (window.CONTEXT !== 'web') {
  document.addEventListener('deviceready', initCordovaApp, false);
} else {
  initWebApp();
}

import './sass/style.scss';

require.ensure([], () => require('./bootstrap'), 'bootstrap');

window.PLATFORM = 'android';
window.CONTEXT = 'smartphone';

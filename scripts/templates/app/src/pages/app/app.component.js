import template from './app.html';
import controller from './app.controller';
import './app.scss';

if (__CONFIG__.PLATFORM === 'ios') require('./app.ios.scss');

const appComponent = {
    bindings: {},
    template,
    controller,
};

export default appComponent;

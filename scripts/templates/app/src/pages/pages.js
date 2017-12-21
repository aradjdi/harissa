/**
 * Dependencies : lazyloading, child-router
 */
import uiRouter from 'angular-ui-router';

// Import pages modules
import loginModule from './login/login';
import appModule from './app/app';
import callsModule from './app/calls/calls';
import contactsModule from './app/contacts/contacts';
import homepageModule from './app/homepage/homepage';

// Import routes for pages
import loginRoute from './login/login.route';
import appRoute from './app/app.route';
import callsRoute from './app/calls/calls.route';
import contactsRoute from './app/contacts/contacts.route';
import homepageRoute from './app/homepage/homepage.route';

const pagesModule = angular
    .module('main.pages', [
        uiRouter,
        loginModule,
        appModule,
        callsModule,
        contactsModule,
        homepageModule,
    ])
    .config(loginRoute)
    .config(appRoute)
    .config(callsRoute)
    .config(contactsRoute)
    .config(homepageRoute)
    .config($urlRouterProvider => $urlRouterProvider.otherwise('/login'))
    .name;

export default pagesModule;

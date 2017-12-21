/**
 * Dependencies : ngAnimate
 */
import ngAnimate from 'angular-animate';

import pagesNavigation from './pagesNavigation';

const animationsModule = angular
    .module('main.animations', [
        ngAnimate,
        pagesNavigation,
    ]).name;

export default animationsModule;

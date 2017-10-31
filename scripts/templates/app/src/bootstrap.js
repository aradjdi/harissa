import angular from 'angular';

import Animations from './animations/animations';
import Components from './components/components';
import Pages from './pages/pages';
import Services from './services/services';
import Storages from './storages/storages';

import runAnimation from './runs/runAnimation';
import runStartState from './runs/runStartState';

angular.module('main', [
  Animations,
  Components,
  Pages,
  Services,
  Storages,
])
  .run(runAnimation)
  .run(runStartState);

angular.bootstrap(document, ['main']);

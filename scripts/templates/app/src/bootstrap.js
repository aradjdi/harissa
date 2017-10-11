import angular from 'angular';

import Animations from './animations/animations';
import Components from './components/components';
import Pages from './pages/pages';
import Services from './services/services';
import Storages from './storages/storages';

/** @ngInject */
const startupToState = (pdvStorage, $state) => {
  // app state
  const appState = 'app';

  // login state
  const loginState = 'login';

  pdvStorage.hasCredentials()
    .then(() => $state.go(appState, {}, { reload: appState }))
    .fail(() => $state.go(loginState, {}, { reload: loginState }));
};

/** @ngInject */
const enableAnimation = $animate => $animate.enabled(true);

angular.module('main', [
  Animations,
  Components,
  Pages,
  Services,
  Storages,
])
  .run(enableAnimation)
  .run(startupToState);


function bootstrapApp() {
  angular.bootstrap(document, ['main']);
}

if (window.CONTEXT === 'cordova') {
  document.addEventListener('deviceready', () => {
    bootstrapApp();
  }, false);
} else {
  bootstrapApp();
}

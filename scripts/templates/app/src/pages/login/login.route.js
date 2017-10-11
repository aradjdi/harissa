/** @ngInject */
export default function configRoutes($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    component: 'login',
  });
}

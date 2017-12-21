/** @ngInject */
export default function configRoutes($stateProvider) {
    $stateProvider.state('app', {
        url: '/app',
        component: 'app',
    });
}

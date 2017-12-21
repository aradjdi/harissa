/** @ngInject */
export default function configRoutes($stateProvider) {
    $stateProvider.state('app.homepage', {
        url: '/homepage',
        views: {
            appHomepage: {
                component: 'homepage',
            },
        },
    });
}

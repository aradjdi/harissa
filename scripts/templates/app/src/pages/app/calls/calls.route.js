/** @ngInject */
export default function configRoutes($stateProvider) {
    $stateProvider.state('app.calls', {
        url: '/calls',
        views: {
            appCalls: {
                component: 'calls',
            },
        },
    });
}

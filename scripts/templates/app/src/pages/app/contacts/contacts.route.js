/** @ngInject */
export default function configRoutes($stateProvider) {
    $stateProvider.state('app.contacts', {
        url: '/contacts',
        views: {
            appContacts: {
                component: 'contacts',
            },
        },
    });
}

/** @ngInject */
export default function runStartState(authSrv, $state) {
    authSrv.login().then(() => {
        $state.go('app', {}, {reload: 'app'});
    });
}

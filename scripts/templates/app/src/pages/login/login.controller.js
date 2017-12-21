/** @ngInject */
export default function loginController($state, authSrv) {
    // app state
    const appState = 'app';

    this.username = null;

    this.password = null;

    this.login = () => {
        if (this.username && this.password) {
            authSrv.login(this.username, this.password)
                .then(() => $state.go(appState, {}, {reload: appState}));
        }
    };
}

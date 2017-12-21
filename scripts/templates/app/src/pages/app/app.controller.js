/** @ngInject */
export default function appController($state, authSrv) {
    // current state
    const currentState = 'app';

    // default state when redirecting to child route
    const defaultChildState = 'app.homepage';

    // login state
    const loginState = 'login';

    // Utils functions
    const openModalMenu = () => {
        this.showModalMenu = true;
    };
    const openModalLogout = () => {
        this.showModalLogout = true;
    };
    const closeModalMenu = () => {
        this.showModalMenu = false;
    };
    const closeModalLogout = () => {
        this.showModalLogout = false;
    };

    // Routing binding
    this.$state = $state;

    // Menu modal binding
    this.showModalMenu = false;

    // Logout modal binding
    this.showModalLogout = false;

    // close modalMenu
    this.cancelNavigation = () => closeModalMenu();

    // close modalLogout
    this.cancelLogout = () => closeModalLogout();

    // open modalMenu
    this.openModalMenu = () => openModalMenu();

    // open modalLogout
    this.openModalLogout = () => openModalLogout();

    this.navigateToState = (state) => {
        // close modalMenu
        closeModalMenu();

        // redirect to state param
        $state.go(state);
    };

    this.confirmLogout = () => {
        // close modalLogout
        closeModalLogout();

        // redirect to login
        authSrv.logout().then(() => $state.go(loginState, {}, {reload: loginState}));
    };

    this.$onInit = () => {
        // if we don't have child route on state
        if ($state.is(currentState)) {
            // redirect to default child route
            $state.go(defaultChildState);
        }
    };

    return this;
}

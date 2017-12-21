/** @ngInject */
export default function actualitiesController($timeout, actualitiesSrv) {
    this.actualities = [];

    this.setActualities = actualities => $timeout(() => {
        this.actualities = actualities;
    }, 0);

    this.$onInit = () => actualitiesSrv.getActualities().then(this.setActualities);

    return this;
}

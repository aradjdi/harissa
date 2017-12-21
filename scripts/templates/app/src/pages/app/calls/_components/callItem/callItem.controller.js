/** @ngInject */
export default function callItemController() {
    this.$onInit = () => {
        this.call.isInfo = this.call.state === 'Information';
        this.call.isResolve = this.call.state === 'Résolu';
        this.call.isWaiting = this.call.state === 'En cours';
    };
}

/** @ngInject */
export default function actualityItemController() {
    this.$onInit = () => {
        this.actuality.isInfo = this.actuality.state === 'Information';
        this.actuality.isResolve = this.actuality.state === 'Résolu';
        this.actuality.isWaiting = this.actuality.state === 'En cours';
    };
}

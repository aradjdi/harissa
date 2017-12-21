/** @ngInject */
export default function specialContactItemController() {
    this.$onInit = () => {
        this.contact.isValide = this.contact.color === 'GREEN';
        this.contact.isWarning = this.contact.color === 'ORANGE';
        this.contact.isError = this.contact.color === 'RED';
    };

    return this;
}

/** @ngInject */
export default function modalLogoutController() {
    this.confirm = () => this.onConfirm();

    this.cancel = () => this.onCancel();

    return this;
}

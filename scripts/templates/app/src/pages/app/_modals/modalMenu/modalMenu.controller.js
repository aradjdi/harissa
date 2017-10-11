/** @ngInject */
export default function modalMenuController() {
  this.navigate = state => this.onNavigate({ state });

  this.cancel = () => this.onCancel();

  this.logout = () => this.onLogout();

  return this;
}

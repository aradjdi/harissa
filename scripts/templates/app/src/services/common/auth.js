/* @ngInject */
export default function authSrv(keycloakAuthSrv) {
  this.login = () => keycloakAuthSrv.login();

  this.logout = () => keycloakAuthSrv.logout();

  return this;
}

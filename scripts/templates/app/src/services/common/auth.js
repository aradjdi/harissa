import Q from 'q';

/* @ngInject */
export default function authSrv(keycloakAuthSrv) {
  this.login = () => keycloakAuthSrv.login().catch(() => {
    debugger;
  });

  this.logout = () => keycloakAuthSrv.logout().catch(() => {
    debugger;
  });

  return this;
}

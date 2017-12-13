import Q from 'q';
import StKeycloak from '@stime/keycloak';

/* @ngInject */
export default function keycloakAuthSrv(pdvStorage) {
  const getToken = () => StKeycloak.isTokenExpired().then(isExpired => (
    isExpired ? StKeycloak.updateToken(5) : StKeycloak.token()
  ));

  this.login = () => getToken().then(accessToken =>
    StKeycloak.profile().then((profile) => {
      const pdv = profile.username.replace('pdv', '');
      return Q.all([
        pdvStorage.setPdv(pdv),
        pdvStorage.setAccessToken(accessToken),
      ]);
    }));

  this.logout = () => pdvStorage.clean().then(() => StKeycloak.logout());

  return this;
}

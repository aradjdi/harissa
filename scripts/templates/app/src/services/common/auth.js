/* @ngInject */
export default function authSrv($q, pdvStorage) {
  this.login = (username, password) => $q((resolve) => {
    // Init pdvStorage
    pdvStorage.setPdv(username);
    pdvStorage.setPassword(password);
    pdvStorage.setAccessToken('000000-000000-000-000000');

    // Simulate API call
    setTimeout(() => resolve(true), 300);
  });

  this.logout = () => $q((resolve) => {
    // Clean pdvStorage
    pdvStorage.clean();

    // Simulate API call
    setTimeout(() => resolve(true), 300);
  });

  return this;
}

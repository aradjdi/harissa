/* @ngInject */
export default function keycloakInterceptor(pdvStorage, $state, $injector) {
  const refreshToken = () => {
    const keaycloakAuthSrv = $injector.get('keycloakAuthSrv');
    return keaycloakAuthSrv.login();
  };

  const authorize = config => pdvStorage.getAccessToken().then((accessToken) => {
    config.headers.Authorization = config.headers.Authorization || `Bearer ${accessToken}`;

    return config;
  });

  return {
    request(config) {
      return authorize(config);
    },

    // optional method
    responseError(rejection) {
      if (rejection.status === 401) {
        return refreshToken()
          .then(() => authorize(rejection.config))
          .then(config => $injector.get('$http')(config))
          .catch((err) => {
            $state.go('login');
            return rejection;
          });
      }

      return rejection;
    },
  };
}

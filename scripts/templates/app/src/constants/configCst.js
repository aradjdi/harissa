export default {
  version: window.VERSION,
  endPoint: __CONFIG__.END_POINT,
  lang: __CONFIG__.LANG,
  isJson: __CONFIG__.IS_JSON,
  appaloosa: {
    storeId: __CONFIG__.APPALOOSA_STORE_ID,
    storeToken: __CONFIG__.APPALOOSA_STORE_TOKEN,
  },
  keycloak: {
    realm: __CONFIG__.KEYCLOAK_REALM,
    resource: __CONFIG__.KEYCLOAK_RESOURCE,
    authServerUrl: __CONFIG__.KEYCLOAK_AUTH_SERVER_URL,
    sslRequired: __CONFIG__.KEYCLOAK_SSL_REQUIRED,
    enablePkce: __CONFIG__.KEYCLOAK_ENABLE_PKCE,
  },
};

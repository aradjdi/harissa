import Q from 'q';
import StKeycloak from '@stime/keycloak';
import configCst from '../constants/configCst';

const initDeferred = Q.defer();

const loginVersionEl = document.getElementById('login-version');
loginVersionEl.innerHTML = configCst.version;

const showLoginElement = () => {
  document.body.classList.add('logging-in');
};
const hideLoginElement = () => {
  document.body.classList.remove('logging-in');
};
const removeLoginElement = () => {
  document.getElementById('login').remove();
};

const showMessage = (message, timeout) => {
  const loginMessagesEl = document.getElementById('login-messages');
  loginMessagesEl.innerText = message;

  if (timeout) {
    setTimeout(() => {
      loginMessagesEl.innerText = '';
    }, timeout);
  }
};

const getTokens = () => {
  const tokensStr = window.localStorage.getItem('mousquetaires-keycloak-tokens');

  return JSON.parse(tokensStr || '{}');
};

const setTokens = (token, refreshToken, idToken) => window.localStorage.setItem(
  'mousquetaires-keycloak-tokens',
  JSON.stringify({ token, refreshToken, idToken }),
);

const onAuthenticateSuccess = () => {
  const tokens = StKeycloak.instance;
  setTokens(tokens.token, tokens.refreshToken, tokens.idToken);
  removeLoginElement();
  hideLoginElement();

  initDeferred.resolve();
};

const onAuthenticateError = (error) => {
  showLoginElement();
  if (error && error.status === 400) {
    showMessage('Le service d\'authentification est momentanément indisponible', 6000);
  }
};

window.login = () => {
  StKeycloak.instance.login().success(onAuthenticateSuccess).error((error) => {
    showMessage(error.message || '');
  });
};

export default function setupKeycloak() {
  StKeycloak.init({
    realm: configCst.keycloak.realm,
    resource: configCst.keycloak.resource,
    'auth-server-url': configCst.keycloak.authServerUrl,
    'ssl-required': configCst.keycloak.sslRequired,
    'enable-pkce': configCst.keycloak.enablePkce,
  });

  const tokens = getTokens();
  StKeycloak.options = {
    token: tokens.token,
    refreshToken: tokens.refreshToken,
    idToken: tokens.idToken,
  };

  StKeycloak.authenticate().then(onAuthenticateSuccess, onAuthenticateError);

  return initDeferred.promise;
}

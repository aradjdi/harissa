import StKeycloak from 'stime-keycloak';

// Demo Royaume
// const authConfig = {
//   realm: 'demo-pkce',
//   resource: 'pkce-front-client',
//   credentials: {
//     secret: '094fb92b-c5e0-46f3-b85f-14729faa0d61',
//   },
//   'auth-server-url': 'http://uat-itmconnect.mousquetaires.com/auth',
//   'ssl-required': 'external',
//   'enable-pkce':true
// };

// Itm Royaume
const authConfig = {
  realm: 'itm',
  resource: 'sav-en-ligne',
  'auth-server-url': 'https://ppr-itmconnect.mousquetaires.com/auth',
  'ssl-required': 'external',
  'enable-pkce': true,
};

export default function setupKeycloak() {
  debugger;
  return StKeycloak.authenticate(authConfig);
}

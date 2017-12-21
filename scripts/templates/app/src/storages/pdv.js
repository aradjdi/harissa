import Q from 'q';

/* @ngInject */
export default function pdvStorage(storageSrv) {
    const storage = storageSrv.createForageStorage('credentials');

    const clean = () => storage.init().then(() => storage.clean());
    this.clean = clean;

    const setPdv = pdv => storage.init().then(() => storage.set('pdv', pdv));
    const getPdv = () => storage.init().then(() => storage.get('pdv'));
    const hasPdv = () => getPdv().then((pdv) => {
        if (!pdv) throw new Error('Pdv doesn\'t exist');
        return pdv;
    });
    this.setPdv = setPdv;
    this.getPdv = getPdv;
    this.hasPdv = hasPdv;

    const setPassword = password => storage.init().then(() => storage.set('password', password));
    const getPassword = () => storage.init().then(() => storage.get('password'));
    const hasPassword = () => getPassword().then((password) => {
        if (!password) throw new Error('Password doesn\'t exist');
        return password;
    });
    this.setPassword = setPassword;
    this.getPassword = getPassword;
    this.hasPassword = hasPassword;

    const setAccessToken = accessToken => storage.init().then(() => storage.set('accessToken', accessToken));
    const getAccessToken = () => storage.init().then(() => storage.get('accessToken'));
    const hasAccessToken = () => getAccessToken().then((accessToken) => {
        if (!accessToken) throw new Error('AccessToken doesn\'t exist');
        return accessToken;
    });
    this.setAccessToken = setAccessToken;
    this.getAccessToken = getAccessToken;
    this.hasAccessToken = hasAccessToken;

    const hasCredentials = () => Q.all([hasPdv(), hasPassword(), hasAccessToken()]);
    this.hasCredentials = hasCredentials;

    return this;
}

import Q from 'q';
import appaloosa from '../cordovaWrappers/appaloosa';
import permissions from '../cordovaWrappers/permissions';

const onAuthorizationFail = (error) => {
  const statusEnums = appaloosa.getStatus();
  switch (error) {
    case statusEnums.UNKNOWN_APPLICATION:
    case statusEnums.UNREGISTERED_DEVICE:
    case statusEnums.UNKNOWN_DEVICE:
    case statusEnums.NOT_AUTHORIZED:
    case statusEnums.DEVICE_ID_FORMAT_ERROR:
    case statusEnums.NO_NETWORK:
    case statusEnums.REQUEST_ERROR:
    case statusEnums.UNKNOWN:
      navigator.app.exitApp();
      break;
    default:
      break;
  }
};

const onAutoUpdateSuccess = (result) => {
  const statusEnums = appaloosa.getUpdateStatus();
  switch (result) {
    case statusEnums.UNREGISTERED_DEVICE:
    case statusEnums.UNKNOWN_APPLICATION:
    case statusEnums.UPDATE_NOT_NEEDED:
      break;
    case statusEnums.UPDATE_NEEDED:
      return appaloosa.downloadNewVersion();
    default:
      break;
  }

  return result;
};

export default function setupAppaloosa() {
  const initApp = () => appaloosa.initialisation()
    .then(() => permissions.requestPermission(permissions.getPermissions().READ_PHONE_STATE))
    .then(() => appaloosa.authorization().catch(onAuthorizationFail))
    .then(() => appaloosa.startAnalytics());

  const updateApp = () => {
    if (window.PLATFORM === 'ios') {
      return appaloosa.autoUpdate().then(onAutoUpdateSuccess);
    }
    return Q();
  };

  return initApp()
    .then(() => updateApp())
    .catch((error) => {debugger;});
}

import Q from 'q';

const STORE_ID = '8267';
const STORE_TOKEN = 'g58kzdxrvdtlhnumiv3wd93z95hq6khm';

// const { Appaloosa } = window;

const initialisation = () => {
  const deferred = Q.defer();
  window.Appaloosa.initialisation(STORE_ID, STORE_TOKEN, deferred.resolve, deferred.reject);
  return deferred.promise;
};

const authorization = () => {
  const deferred = Q.defer();
  window.Appaloosa.authorization(deferred.resolve, deferred.reject);
  return deferred.promise;
};

const startAnalytics = () => {
  const deferred = Q.defer();
  window.Appaloosa.startAnalytics(deferred.resolve, deferred.reject);
  return deferred.promise;
};

const autoUpdate = () => {
  const deferred = Q.defer();
  window.Appaloosa.autoUpdate(deferred.resolve, deferred.reject);
  return deferred.promise;
};

const downloadNewVersion = () => {
  const deferred = Q.defer();
  window.Appaloosa.downloadNewVersion(deferred.resolve, deferred.reject);
  return deferred.promise;
};

const autoUpdateWithMessage = (title, message) => {
  const deferred = Q.defer();
  window.Appaloosa.downloadNewVersion(title, message, deferred.resolve, deferred.reject);
  return deferred.promise;
};

const closeApplication = () => {
  const deferred = Q.defer();
  window.Appaloosa.closeApplication();
  deferred.resolve();
  return deferred.promise;
};

const getStatus = () => {
  return window.Appaloosa.status;
};

const getUpdateStatus = () => {
  return window.Appaloosa.updateStatus;
};

export default {
  initialisation,
  authorization,
  startAnalytics,
  autoUpdate,
  downloadNewVersion,
  autoUpdateWithMessage,
  closeApplication,
  getStatus,
  getUpdateStatus,
};

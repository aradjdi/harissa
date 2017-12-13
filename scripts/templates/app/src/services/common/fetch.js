/* @ngInject */
export default function fetchSrv($http, configCst) {
  const onGetSuccess = (result) => {
    if (result.status < 200 || result.status >= 400) {
      throw result;
    }
    return result;
  };

  const onGetError = (error) => {
    throw error;
  };

  this.get = (url, params = { showLoader: true }) => $http.get(configCst.endPoint + url, { params })
    .then(onGetSuccess)
    .catch(onGetError);

  return this;
}

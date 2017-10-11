/* @ngInject */
export default function fetchSrv($http) {
  // const endPoint = "http://zenpdv-bo-etude.mousquetaires.com:8080/ws/rest/v1/";
  const endPoint = 'http://api-vip-rec-dmz.mousquetaires.com/zenpdv/v1/';

  const onGetSuccess = (result) => {
    if (result.status < 200 || result.status >= 400) {
      throw result;
    }
    return result;
  };

  const onGetError = (error) => {
    throw error;
  };

  this.get = (url, params = { showLoader: true }) => $http.get(endPoint + url, { params })
    .then(onGetSuccess)
    .catch(onGetError);

  return this;
}

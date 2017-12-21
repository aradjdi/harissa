/* @ngInject */
export default function loaderInterceptor($q, loaderSrv) {
    let ngRequest = 0;

    const showLoader = () => {
        ngRequest = Math.max(0, ngRequest + 1);
        loaderSrv.showLoader();
    };

    const hideLoader = () => {
        ngRequest = Math.max(0, ngRequest - 1);
        if (ngRequest === 0) loaderSrv.hideLoader();
    };

    const onRequest = (config) => {
        if (config.params && config.params.showLoader) {
            showLoader();
        }

        return config;
    };

    const onResponse = (response) => {
        hideLoader();
        return response;
    };

    const onError = (rejection) => {
        hideLoader();
        return $q.reject(rejection);
    };

    return {
        request: onRequest,
        response: onResponse,
        requestError: onError,
        responseError: onError,
    };
}

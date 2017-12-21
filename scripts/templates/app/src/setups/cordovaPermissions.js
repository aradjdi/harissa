import Q from 'q';

const checkPermission = (permission) => {
    const deferred = Q.defer();
    window.cordova.plugins.permissions.checkPermission(permission, (status) => {
        if (!status.hasPermission) {
            deferred.reject(status);
        } else {
            deferred.resolve();
        }
    }, deferred.reject);
    return deferred.promise;
};

const requestPermission = (permission) => {
    const deferred = Q.defer();
    window.cordova.plugins.permissions.requestPermission(permission, (status) => {
        if (!status.hasPermission) {
            deferred.reject(status);
        } else {
            deferred.resolve();
        }
    }, deferred.reject);
    return deferred.promise;
};

const requestPermissions = (permissions) => {
    const deferred = Q.defer();
    window.cordova.plugins.permissions.requestPermission(permissions, (status) => {
        if (!status.hasPermission) {
            deferred.reject(status);
        } else {
            deferred.resolve();
        }
    }, deferred.reject);
    return deferred.promise;
};

const getPermissions = () => window.cordova.plugins.permissions;

export default {
    checkPermission,
    requestPermission,
    requestPermissions,
    getPermissions,
};

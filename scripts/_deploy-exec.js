const Q = require('q');
require('./_spy');

const appaloosa = require('./_appaloosa-client');

const uploadPackage = (filepath, storeToken, groups, changes, proxy) => Q()
    .spy(() => appaloosa.upload(storeToken, filepath, groups, changes, proxy), 'appaloosa', 'upload');

module.exports = {
    uploadPackage(filepath, storeToken, groups, changes, proxy) {
        if (!filepath || !storeToken || !groups || !changes) {
            throw new Error('All arguments are mandatory');
        }

        return uploadPackage(filepath, storeToken, groups, changes, proxy);
    }
};

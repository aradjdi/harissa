const Q = require('q');
require('./_spy');

const appaloosa = require('appaloosa-client');

const uploadPackage = (filepath, storeToken, groups, changes) => Q().spy(() => appaloosa.upload(storeToken, filepath, groups, changes), 'appaloosa', 'upload');

module.exports = {
    uploadPackage(filepath, storeToken, groups, changes) {
        if (!filepath || !storeToken || !groups || !changes) {
            throw new Error('All arguments are mandatory');
        }

        uploadPackage(filepath, storeToken, groups, changes);
    }
};

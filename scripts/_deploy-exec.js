const exec = require('./_exec');
const paths = require('./_paths');

const storeToken = 'g58kzdxrvdtlhnumiv3wd93z95hq6khm';

const uploadPackage = filepath => 
    exec.executeCommand(`ruby ${paths.rootDir}/appaloosa-client.rb ${storeToken} ${filepath}`)
        .catch(() => uploadPackage(filepath));

module.exports = {
    uploadPackage
};

const Q = require('q');

const env = require('./_env');
const versions = require('./_versions');

const builds = require('./_builds');
const deploy = require('./_deploy');
const cordova = require('./_cordova');
const errors = require('./_errors');

const upgradeVersions = () => Q()
    .then(() => versions.buildPackageVersion())
    .then(() => versions.buildAppVersion())
    .then(() => versions.buildBuildVersion());

const releaseDists = () => Q()
    .then(() => builds.releaseDist())
    .then(() => builds.releaseDistSmartphoneIOS())
    .then(() => builds.releaseDistSmartphoneAndroid())
    .then(() => builds.releaseDistTabletIOS())
    .then(() => builds.releaseDistTabletAndroid());

const packageProjects = () => Q()
    .then(() => cordova.packageSmartphoneProjects())
    .then(() => cordova.packageTabletProjects());

const uploadPackages = () => Q()
    .then(() => deploy.uploadSmartphonePackages())
    .then(() => deploy.uploadTabletPackages());

Q()
    .then(() => env.initNodeEnv())
    .then(() => upgradeVersions())
    .then(() => releaseDists())
    .then(() => packageProjects())
    .then(() => uploadPackages())
    .catch(errors.onError);
const Q = require('q');

const questions = require('./_questions');
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
    .then(() => questions.askNodeEnv())
    .then((nodeEnv) => { process.env.NODE_ENV = nodeEnv; })
    .then(() => upgradeVersions())
    .then(() => releaseDists())
    .then(() => packageProjects())
    .then(() => uploadPackages())
    .catch(errors.onError);

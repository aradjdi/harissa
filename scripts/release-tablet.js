const Q = require('q');

const questions = require('./_questions');
const versions = require('./_versions');

const builds = require('./_builds');
const deploy = require('./_deploy');
const cordova = require('./_cordova');
const errors = require('./_errors');

const releaseDists = () => Q()
    .then(() => builds.releaseDistTabletIOS())
    .then(() => builds.releaseDistTabletAndroid());

const packageProjects = () => cordova.packageTabletProjects();

const uploadPackages = () => deploy.uploadTabletPackages();

Q()
    .then(() => questions.askNodeEnv())
    .then((nodeEnv) => { process.env.NODE_ENV = nodeEnv; })
    .then(() => versions.upgradeVersions())
    .then(() => releaseDists())
    .then(() => packageProjects())
    .then(() => uploadPackages())
    .catch(errors.onError);

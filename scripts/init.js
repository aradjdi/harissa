const Q = require('q');

const template = require('./_template');
const cordova = require('./_cordova');
const errors = require('./_errors');

Q()
    .then(() => template.getProjectInfos())
    .then(() => template.duplicateProjectTemplates())
    .then(() => cordova.createApplications())
    .then(() => template.installDependencies())
    .catch(errors.onError);

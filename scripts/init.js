const Q = require('q');

const questions = require('./_questions');
const template = require('./_template');
const cordova = require('./_cordova');
const errors = require('./_errors');

Q()
    .then(() => questions.askProjectInfos())
    .then(appInfos => template.duplicateProjectTemplates(
        appInfos.name,
        appInfos.id,
    ))
    .then(() => cordova.createApplications())
    .then(() => template.installDependencies())
    .catch(errors.onError);

const Q = require('q');

const banner = require('./_banner');
const questions = require('./_questions');
const template = require('./_template');
const cordova = require('./_cordova');
const errors = require('./_errors');

const init = () => {
    Q()
        .then(() => questions.askProjectInfos())
        .then(appInfos => template.duplicateProjectTemplates(appInfos.name, appInfos.id))
        .then(() => cordova.createApplications())
        .then(() => template.installDependencies())
        .catch(errors.onError);
};

module.exports = {
    init() {
        banner.show().then(init);
    }
};

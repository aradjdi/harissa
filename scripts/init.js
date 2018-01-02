const Q = require('q'); require('./_spy');

const banner = require('./_banner');
const questions = require('./_questions');
const template = require('./_template');
const cordova = require('./_cordova');
const errors = require('./_errors');

const getProjectsInfos = () => Q()
    .spy(() => questions.askProjectInfos(), 'questions', 'askProjectInfos');

const createProjects = infos => Q()
    .spy(() => template.duplicateProjectTemplates(infos.name, infos.id), 'template', 'duplicateProjectTemplates')
    .spy(() => cordova.createSmartphoneProjects(infos.id, infos.name), 'cordova', 'createSmartphoneProjects')
    .spy(() => cordova.createTabletProjects(infos.id, infos.name), 'cordova', 'createTabletProjects');

const installDependencies = () => Q()
    .spy(() => template.installDependencies(), 'template', 'installDependencies');

const init = () => Q()
    .then(() => getProjectsInfos())
    .then(appInfos => createProjects(appInfos))
    .then(() => installDependencies())
    .catch(errors.onError);

module.exports = {
    init() {
        banner.show().then(init);
    }
};

const Q = require('q'); require('./_spy');

const template = require('./_template');
const cordova = require('./_cordova');
const errors = require('./_errors');

const duplicateTemplate = (name, id) => Q()
    .spy(() => template.duplicateProjectTemplates(name, id), 'template', 'duplicateProjectTemplates');

const createProjects = (name, id) => Q()
    .spy(() => cordova.createSmartphoneProjects(id, name), 'cordova', 'createSmartphoneProjects')
    .spy(() => cordova.createTabletProjects(id, name), 'cordova', 'createTabletProjects');

const installDependencies = () => Q()
    .spy(() => template.installDependencies(), 'template', 'installDependencies');

const init = ({ name, id }) => Q()
    .then(() => duplicateTemplate(name, id))
    .then(() => createProjects(name, id))
    .then(() => installDependencies())
    .catch(errors.onError);

module.exports = init;

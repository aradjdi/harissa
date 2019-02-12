const Q = require('q'); require('./_spy');

const template = require('./_template');
const cordova = require('./_cordova');
const errors = require('./_errors');

const duplicateTemplate = (name, id) => Q()
    .spy(() => template.duplicateProjectTemplates(name, id), 'template', 'duplicateProjectTemplates');

const createProjects = (name, id) => Q()
    .spy(() => cordova.createProjects(id, name, 'smartphone'), 'cordova', 'createProjects')
    .spy(() => cordova.createProjects(id, name, 'tablet'), 'cordova', 'createProjects');

const installDependencies = () => Q()
    .spy(() => template.installDependencies(), 'template', 'installDependencies');

const init = ({ name, id }) => Q()
    .then(() => duplicateTemplate(name, id))
    .then(() => createProjects(name, id))
    .then(() => installDependencies())
    .catch(errors.onError);

module.exports = init;

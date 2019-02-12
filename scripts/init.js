const Q = require('q'); require('./_spy');

const template = require('./_template');
const cordova = require('./_cordova');
const capacitor = require('./_capacitor_exec');
const errors = require('./_errors');

const FRAMEWORKS = require('../bin/_questions').FRAMEWORKS_SUPPORTED;

const duplicateTemplate = (name, id) => Q()
    .spy(() => template.duplicateProjectTemplates(name, id), 'template', 'duplicateProjectTemplates');

const createProjects = (name, id) => Q()
    .spy(() => cordova.createProjects(id, name, 'smartphone'), 'cordova', 'createProjects')
    .spy(() => cordova.createProjects(id, name, 'tablet'), 'cordova', 'createProjects');

const installDependencies = () => Q()
    .spy(() => template.installDependencies(), 'template', 'installDependencies');

const createCordovaProject = () => Q()
    .then(() => duplicateTemplate(name, id))
    .then(() => createProjects(name, id))
    .then(() => installDependencies());

const createCapacitorProject = (name, id) => Q()
    .then(() => capacitor.createProject(name, id));

const createProject = (techEnv, name, id) => Q()
    .then(() => {
        switch (techEnv) {
            case FRAMEWORKS.cordova:
                createCordovaProject(name, id);
                break;
            case FRAMEWORKS.capacitor:
                createCapacitorProject(name, id);
                break;
            default:
                throw 'A framework choose but not available from harissa project ! ! !';
        }
    });

const init = ({ name, id, techEnv }) => Q()
    .then(() => createProject(techEnv, name, id))
    .catch(errors.onError);

module.exports = init;

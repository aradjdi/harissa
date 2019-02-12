const Q = require('q');

const paths = require('./_paths');
const cordovaExec = require('./_cordova-exec');

const createProjects = (id, name, device) => {
    const templateDir = `${paths.templatesDir}/cordova/smartphoneTpl`;
    return Q()
        .then(() => cordovaExec.createProject(`${paths.cordovaDir}/dev/${device}`, `${id}.dev.${device}`, `${name}Dev`, templateDir))
        .then(() => cordovaExec.createProject(`${paths.cordovaDir}/preprod/${device}`, `${id}.preprod.${device}`, `${name}Preprod`, templateDir))
        .then(() => cordovaExec.createProject(`${paths.cordovaDir}/prod/${device}`, `${id}.${device}`, name, templateDir));
};

const packageProject = device => cordovaExec.packageProject(`${paths.cordovaDir}/${process.env.NODE_ENV}/${device}`);

const runProject = (device, platform) => cordovaExec.runProject(platform, `${paths.cordovaDir}/${process.env.NODE_ENV}/${device}`);

module.exports = {
    createProjects,
    packageProject,
    runProject
};

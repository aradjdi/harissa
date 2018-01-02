const Q = require('q');

const paths = require('./_paths');
const cordovaExec = require('./_cordova-exec');

const createSmartphoneProjects = (id, name) => {
    const templateDir = `${paths.templatesDir}/cordova/smartphoneTpl`;
    return Q()
        .then(() => cordovaExec.createProject(`${paths.cordovaDir}/dev/smartphone`, `${id}.dev.smartphone`, `${name}Dev`, templateDir))
        .then(() => cordovaExec.createProject(`${paths.cordovaDir}/preprod/smartphone`, `${id}.preprod.smartphone`, `${name}Preprod`, templateDir))
        .then(() => cordovaExec.createProject(`${paths.cordovaDir}/prod/smartphone`, `${id}.smartphone`, name, templateDir));
};

const createTabletProjects = (id, name) => {
    const templateDir = `${paths.templatesDir}/cordova/tabletTpl`;
    return Q()
        .then(() => cordovaExec.createProject(`${paths.cordovaDir}/dev/tablet`, `${id}.dev.tablet`, `${name}Dev`, templateDir))
        .then(() => cordovaExec.createProject(`${paths.cordovaDir}/preprod/tablet`, `${id}.preprod.tablet`, `${name}Preprod`, templateDir))
        .then(() => cordovaExec.createProject(`${paths.cordovaDir}/prod/tablet`, `${id}.tablet`, name, templateDir));
};

const packageSmartphoneProjects = () => cordovaExec.packageProject(`${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone`);
const packageTabletProjects = () => cordovaExec.packageProject(`${paths.cordovaDir}/${process.env.NODE_ENV}/tablet`);
const runSmartphone = platform => cordovaExec.runProject(platform, `${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone`);
const runTablet = platform => cordovaExec.runProject(platform, `${paths.cordovaDir}/${process.env.NODE_ENV}/tablet`);

module.exports = {
    createSmartphoneProjects,
    createTabletProjects,
    packageSmartphoneProjects,
    packageTabletProjects,
    runSmartphone,
    runTablet,
};

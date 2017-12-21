const Q = require('q');

const exec = require('./_exec');
const paths = require('./_paths');

const initProject = (appPath, id, name, templatePath) => Q()
    .then(() => exec.executeCommand(`cordova create ${appPath} ${id} ${name} --template ${templatePath}`))
    .then(() => exec.executeCommand('cordova prepare', appPath));

const initProjects = (appPath, id, name, templatePath) => Q()
    .then(() => initProject(`${appPath}/smartphone`, `${id}.smartphone`, name, `${templatePath}/smartphoneTpl`))
    .then(() => initProject(`${appPath}/tablet`, `${id}.tablet`, name, `${templatePath}/tabletTpl`));

const createApplications = () => {
    const templateDir = `${paths.templatesDir}/cordova`;
    const appId = require(`${paths.appDir}/package.json`).name;
    const appName = require(`${paths.appDir}/package.json`).displayName;

    return Q()
        .then(() => initProjects(`${paths.cordovaDir}/dev`, `${appId}.dev`, `${appName}Dev`, templateDir))
        .then(() => initProjects(`${paths.cordovaDir}/preprod`, `${appId}.preprod`, `${appName}Preprod`, templateDir))
        .then(() => initProjects(`${paths.cordovaDir}/prod`, `${appId}`, `${appName}`, templateDir));
};

const packageCmd = 'cordova build android ios --device';
const packageSmartphoneProjects = () => exec.executeCommand(
    packageCmd,
    `${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone`
);
const packageTabletProjects = () => exec.executeCommand(
    packageCmd,
    `${paths.cordovaDir}/${process.env.NODE_ENV}/tablet`
);

const runSmartphone = (platform) => {
    console.log('cordova start');
    return exec.executeCommand(
        `cordova run ${platform}`,
        `${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone`
    );
};
const runTablet = platform => exec.executeCommand(
    `cordova run ${platform}`,
    `${paths.cordovaDir}/${process.env.NODE_ENV}/tablet`
);

module.exports = {
    createApplications,
    packageSmartphoneProjects,
    packageTabletProjects,
    runSmartphone,
    runTablet,
};

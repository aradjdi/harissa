const Q = require('q');

const exec = require('./_exec');
const paths = require('./_paths');

const initCordovaProject = (appPath, id, name, templatePath) => Q()
  .then(() => exec.executeCommand(`cordova create ${appPath} ${id} ${name} --template ${templatePath}`))
  .then(() => exec.executeCommand('cordova prepare', appPath));

const initCordovaProjects = (appPath, id, name, templatePath) => Q()
  .then(() => initCordovaProject(`${appPath}/smartphone`, `${id}.smartphone`, name, `${templatePath}/smartphoneTpl`))
  .then(() => initCordovaProject(`${appPath}/tablet`, `${id}.tablet`, name, `${templatePath}/tabletTpl`));

const createCordovaApplications = () => {    
  const templateDir = `${paths.templatesDir}/cordova`;
  const appId = require(`${paths.appDir}/package.json`).name;
  const appName = require(`${paths.appDir}/package.json`).displayName;
  
  return Q()
    .then(() => initCordovaProjects(`${paths.cordovaDir}/dev`, `${appId}.dev`, `${appName}Dev`, templateDir))
    .then(() => initCordovaProjects(`${paths.cordovaDir}/preprod`, `${appId}.preprod`, `${appName}Preprod`, templateDir))
    .then(() => initCordovaProjects(`${paths.cordovaDir}/prod`, `${appId}`, `${appName}`, templateDir));
}

const packageCmd = 'cordova build android ios --device';
const packageCordovaProjects = () => Q()
  .then(() => exec.executeCommand(packageCmd, `${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone`))
  .then(() => exec.executeCommand(packageCmd, `${paths.cordovaDir}/${process.env.NODE_ENV}/tablet`));

const runSmartphone = platform => exec.executeCommand(
  `cordova run ${platform}`,
  `${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone`
);
const runTablet = platform => exec.executeCommand(
  `cordova run ${platform}`,
  `${paths.cordovaDir}/${process.env.NODE_ENV}/tablet`
);

module.exports = {
  createCordovaApplications,
  packageCordovaProjects,
  runSmartphone,
  runTablet
}
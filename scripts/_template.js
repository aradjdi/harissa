const Q = require('q');
const fs = require('fs-extra');
const replace = require('replace');
const inquirer = require('inquirer');

const paths = require('./_paths');

let appName = 'HelloWorld';
let appId = 'com.mousquetaires.helloworld';

const getProjectInfos = () => inquirer.prompt([
  {type: 'input', name: 'name', message: 'Project name ?', default: 'HelloWorld'},
  {type: 'input', name: 'id', message: 'Project id ?', default: 'com.mousquetaires.helloworld'}
]).then(appInfos => {
  appName = appInfos.name;
  appId = appInfos.id;
});

const duplicateProjectTemplates = () => Q.all([
  fs.copy(`${paths.templatesDir}/app`, `${paths.appDir}`),
  fs.copy(`${paths.templatesDir}/conf`, `${paths.confDir}`),
])
  .then(() => replace({ regex: "<%name%>", replacement: appName, paths: [paths.currentDir], recursive: true, silent: true }))
  .then(() => replace({ regex: "<%id%>", replacement: appId, paths: [paths.currentDir], recursive: true, silent: true }));


module.exports = {
  getProjectInfos,
  duplicateProjectTemplates,
}
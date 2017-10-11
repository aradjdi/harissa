const fs = require('fs-extra');
const replace = require('replace');
const inquirer = require('inquirer');
const pathUtils = require('../pathUtils');

const duplicateTemplate = () => fs.copy(
  `${pathUtils.templatesDir}/app`,
  `${pathUtils.destDir}`
);

const promptApplicationInfos = () => inquirer.prompt([
  {type: 'input', name: 'name', message: 'Application name ?', default: 'HelloWorld'},
  {type: 'input', name: 'id', message: 'Application id ?', default: 'com.mousquetaires.helloworld'}
]);

const replaceApplicationInfos = appInfos => {
  replace({
    regex: "<%name%>",
    replacement: appInfos.name,
    paths: [pathUtils.destDir],
    recursive: true,
    silent: true
  });

  replace({
    regex: "<%id%>",
    replacement: appInfos.id,
    paths: [pathUtils.destDir],
    recursive: true,
    silent: true
  });

  return appInfos;
};

const initializeProject = () => duplicateTemplate()
  .then(() => promptApplicationInfos())
  .then(appInfos => replaceApplicationInfos(appInfos));

module.exports = {
  initializeProject: initializeProject
}
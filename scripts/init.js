const Q = require('q');
const fs = require('fs-extra');
const replace = require('replace');
const inquirer = require('inquirer');

const exec = require('./_exec');
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

const duplicateProjectTemplates = () => fs.copy(`${paths.templatesDir}/app`, `${paths.destDir}`)
  .then(() => replace({
    regex: "<%name%>",
    replacement: appName,
    paths: [paths.destDir],
    recursive: true,
    silent: true
  }))
  .then(() => replace({
    regex: "<%id%>",
    replacement: appId,
    paths: [paths.destDir],
    recursive: true,
    silent: true
  }));

const createProjectApplications = () => [
  `cordova create ${paths.smartphoneDir} ${appId} ${appName} --template ${paths.templatesDir}/cordova/smartphoneTpl`,
  `cordova create ${paths.tabletDir} ${appId} ${appName} --template ${paths.templatesDir}/cordova/tabletTpl`
]
  .reduce(
    (executePromise, cmd) => executePromise.then(
      () => exec.executeCommand(cmd)
    ),
    Q()
  );

const prepareProjectApplications = () => {
  const cmd = 'cordova prepare';

  return Q.all([
    exec.executeCommand(cmd, paths.smartphoneDir),
    exec.executeCommand(cmd, paths.tabletDir)
  ]);
};

const addProjectDependencies = () => {
  const cmd = `npm install`;
  
  return exec.executeCommand(cmd);
};

Q()
  .then(() => getProjectInfos())
  .then(() => duplicateProjectTemplates())
  .then(() => createProjectApplications())
  .then(() => prepareProjectApplications())
  .then(() => addProjectDependencies())
  .catch(error => {    
    console.log(error);
    const fs = require('fs');
    fs.writeFile('error.log', error, err => {
        if (err) {
          console.log(err);
        }
    
        console.log('The file was saved!');
    });
  });
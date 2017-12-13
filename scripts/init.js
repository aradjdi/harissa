const Q = require('q');

const exec = require('./_exec');
const template = require('./_template');
const cordova = require('./_cordova');
const errors = require('./_errors');

const paths = require('./_paths');

Q()
  .then(() => template.getProjectInfos())
  .then(() => template.duplicateProjectTemplates())
  .then(() => cordova.createCordovaApplications())
  .then(() => exec.executeCommand('npm install', paths.appDir))
  .catch(errors.onError);
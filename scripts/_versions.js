const Q = require('q');
const inquirer = require('inquirer');

const exec = require('./_exec');
const paths = require('./_paths');

const initVersion = () => inquirer.prompt([{
  type: 'list',
  name: 'versionType',
  message: 'Version Type ?',
  choices: ['patch', 'minor', 'major', 'other'],
  default: 'patch',
}]).then((values) => {
  const { versionType } = values;

  if (versionType !== 'other') {
    return values;
  }

  return inquirer.prompt([
    { type: 'input', name: 'versionType', message: 'Version ?' },
  ]);
}).then(values => values.versionType);

const upgradeVersions = () => Q()
  .then(() => initVersion())
  .then((version) => {
    const versionCmd = `npm version ${version} --no-git-tag-version`;

    return Q.all([
      exec.executeCommand(versionCmd, paths.srcDir),
      exec.executeCommand(versionCmd, `${paths.cordovaDir}/${process.env.NODE_ENV}/smartphone`),
      exec.executeCommand(versionCmd, `${paths.cordovaDir}/${process.env.NODE_ENV}/tablet`),
    ]);
  });

module.exports = { upgradeVersions };

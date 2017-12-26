const inquirer = require('inquirer');

const askProjectInfos = () => inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'Project name ?',
    default: 'HelloWorld',
},
{
    type: 'input',
    name: 'id',
    message: 'Project id ?',
    default: 'com.mousquetaires.helloworld',
}]);

const askNodeEnv = () => inquirer.prompt([{
    type: 'list',
    name: 'nodeEnv',
    message: 'Node Environnement ?',
    choices: ['dev', 'preprod', 'prod'],
    default: 'dev',
}]).then(values => values.nodeEnv);

const askVersionType = () => inquirer.prompt([{
    type: 'list',
    name: 'versionType',
    message: 'Version Type ?',
    choices: ['patch', 'minor', 'major', 'other'],
    default: 'patch',
}]).then(values => values.versionType);

const askVersionName = () => inquirer.prompt([{
    type: 'input',
    name: 'versionName',
    message: 'Version ?',
}]).then(values => values.versionName);

module.exports = {
    askProjectInfos,
    askNodeEnv,
    askVersionType,
    askVersionName,
};
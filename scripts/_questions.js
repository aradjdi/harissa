const inquirer = require('inquirer');

const askProjectInfos = () => inquirer.prompt([
    {
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
    }
]);

const askNodeEnv = () => inquirer.prompt([{
    type: 'list',
    name: 'nodeEnv',
    message: 'Node Environnement?',
    choices: ['dev', 'preprod', 'prod'],
    default: 'dev',
}]).then(values => values.nodeEnv);

const askDevice = () => inquirer.prompt([{
    type: 'list',
    name: 'device',
    message: 'Type of device?',
    choices: ['smartphone', 'tablet'],
    default: 'smartphone',
}]).then(values => values.device);

const askOS = () => inquirer.prompt([{
    type: 'list',
    name: 'os',
    message: 'OS target?',
    choices: ['android', 'ios'],
    default: 'android',
}]).then(values => values.os);

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

const askChanges = () => inquirer.prompt([{
    type: 'input',
    name: 'changes',
    message: 'Changes ?',
}]).then(values => values.changes);

module.exports = {
    askProjectInfos,
    askNodeEnv,
    askVersionType,
    askVersionName,
    askDevice,
    askChanges,
    askOS
};

const inquirer = require('inquirer');

const FRAMEWORKS_SUPPORTED = {
    cordova:    'cordova',
    capacitor:  'capacitor',
}

const askProjectName = () => inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'Project name ?',
    default: 'HelloWorld',
}]).then(values => values.name);

const askTechnicalEnvironment = () => inquirer.prompt({
    type: 'list',
    name: 'techEnv',
    message: 'Web container',
    choices: [
        FRAMEWORKS_SUPPORTED.cordova,
        FRAMEWORKS_SUPPORTED.capacitor
    ],
    default: FRAMEWORKS_SUPPORTED.capacitor
}).then(values => values.techEnv);

const askProjectId = () => inquirer.prompt([{
    type: 'input',
    name: 'id',
    message: 'Project id ?',
    default: 'com.mousquetaires.helloworld',
}]).then(values => values.id);

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

const askVersion = () => askVersionType().then(
    version => version === 'other' ? askVersionName() : version
)

const askChanges = () => inquirer.prompt([{
    type: 'input',
    name: 'changes',
    message: 'Changes ?',
}]).then(values => values.changes);

module.exports = {
    FRAMEWORKS_SUPPORTED,
    askTechnicalEnvironment,
    askProjectName,
    askProjectId,
    askNodeEnv,
    askVersionType,
    askVersionName,
    askVersion,
    askDevice,
    askChanges,
    askOS
};

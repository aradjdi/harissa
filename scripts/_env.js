const inquirer = require('inquirer');

const initNodeEnv = () => inquirer.prompt([{
    type: 'list',
    name: 'nodeEnv',
    message: 'Node Environnement ?',
    choices: ['dev', 'preprod', 'prod'],
    default: 'dev',
}]).then((values) => {
    process.env.NODE_ENV = values.nodeEnv;
});

module.exports = { initNodeEnv };

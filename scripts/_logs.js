const chalk = require('chalk');
const readline = require('readline');

const infoFormat = chalk.reset.blue;
const successFormat = chalk.reset.green;
const warningFormat = chalk.reset.yellow;
const errorFormat = chalk.bold.red;

const info = (title, message, option = '') => {
    const maxSize = process.stdout.columns - 1;

    message = `${message}`.trim();
    if (title && message) {
        message = `${title} - ${message} - ${option}`;
        message = infoFormat(message);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(message.substr(0, maxSize));
    }
};
const success = (title, message, option = '') => {
    message = `${message}`.trim();
    if (title && message) {
        message = successFormat(`${title} - ${message} - ${option}`);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(message);
        process.stdout.write('\n');
    }
};
const warning = (title, message, option = '') => {
    message = `${message}`.trim();
    if (title && message) {
        message = warningFormat(`${title} - ${message} - ${option}`);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(message);
        process.stdout.write('\n');
    }
};
const error = (title, message, option = '') => {
    message = `${message}`.trim();
    if (title && message) {
        message = errorFormat(`${title} - ${message} - ${option}`);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(message);
        process.stdout.write('\n');
    }
};

module.exports = {
    info,
    success,
    warning,
    error,
};

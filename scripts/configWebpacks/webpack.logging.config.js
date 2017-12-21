const {ProgressPlugin} = require('webpack');
const chalk = require('chalk');

class LoggerPlugin {
    constructor() {
        this.lineCaretPosition = 0;
    }

    goToLineStart(nextMessage) {
        let str = '';
        for (; this.lineCaretPosition > nextMessage.length; this.lineCaretPosition--) {
            str += '\b \b';
        }
        for (let i = 0; i < this.lineCaretPosition; i++) {
            str += '\b';
        }
        this.lineCaretPosition = nextMessage.length;

        if (str) {
            process.stderr.write(str);
        }
    }

    apply(compiler) {
        new ProgressPlugin((percentage, message, moduleProgress, activeModules, moduleName) => {
            if (percentage < 1) {
                percentage = Math.floor(percentage * 100);
                message = chalk.yellow(`${percentage}% ${message}`);
            }

            this.goToLineStart(message);
            process.stderr.write(message);

        }).apply(compiler);
    }
}

module.exports = LoggerPlugin;

module.exports = {
    plugins: [
        new LoggerPlugin()
    ]
};

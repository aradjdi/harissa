const childProcess = require('child-process-promise');

const logs = require('./_logs');

const { spawn } = childProcess;

const executeCommand = (cmd, cwd) => {
    const cmdArgs = cmd.split(' ');
    const cmdName = cmdArgs.shift();
    const promise = spawn(cmdName, cmdArgs, cwd ? { cwd } : {});

    const spawnProcess = promise.childProcess;
    logs.info(`-- -- spawn ${cmdName}`, `start pid ${spawnProcess.pid}`);
    spawnProcess.stdout.on('data', data => logs.info(
        `-- -- spawn ${cmdName}`,
        `pid ${spawnProcess.pid}`,
        data.toString()
            .replace(/(\r\n|\n|\r)/gm, '')
            .replace(/(\t)/gm, ' ')
    ));
    spawnProcess.stderr.on('data', data => logs.warning(
        `-- -- spawn ${cmdName}`,
        `pid ${spawnProcess.pid}`,
        data.toString()
            .replace(/(\r\n|\n|\r)/gm, '')
            .replace(/(\t)/gm, ' ')
    ));

    return promise.then(() => {
        logs.success(`-- -- spawn ${cmdName}`, `finish pid ${spawnProcess.pid}`);
    }).catch((err) => {
        logs.error(`-- -- spawn ${cmdName}`, `pid ${spawnProcess.pid} failed`, err);
    });
};

module.exports = {
    executeCommand
};

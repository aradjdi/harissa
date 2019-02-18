const childProcess = require('child-process-promise');

const logs = require('./_logs');

const { spawn } = childProcess;

const executeCommand = (cmd, cwd) => {
    const cmdArgs = cmd.split(' ');
    const cmdName = cmdArgs.shift();
    const promise = spawn(cmdName, cmdArgs, cwd ? { cwd } : {});

    const spawnProcess = promise.childProcess;
    logs.info(`-- -- spawn ${cmdName}`, `start pid ${spawnProcess.pid}`);

    const stdout = [];
    const stderr = [];

    spawnProcess.stdout.on('data', data => {
        logs.info(
            `-- -- spawn ${cmdName} --- ${data}`,
            `pid ${spawnProcess.pid}`,
            data.toString()
                .replace(/(\r\n|\n|\r)/gm, '')
                .replace(/(\t)/gm, ' '));
            stdout.push(data.toString());
    });
    spawnProcess.stderr.on('data', data => {
        logs.warning(
            `-- -- spawn ${cmdName}`,
            `pid ${spawnProcess.pid}`,
            data.toString()
                .replace(/(\r\n|\n|\r)/gm, '')
                .replace(/(\t)/gm, ' '));
        stderr.push(data.toString());
    });

    return promise.then(() => {
        logs.success(`-- -- spawn ${cmdName}`, `finish pid ${spawnProcess.pid}`);
        return stdout;
    }).catch((err) => {
        logs.error(`-- -- spawn ${cmdName}`, `pid ${spawnProcess.pid} failed`, err);
        return stderr;
    });
};

module.exports = {
    executeCommand
};

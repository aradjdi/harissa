const childProcess = require('child-process-promise');

const { exec } = childProcess;

const onExecFinish = (result, cmd) => {
  if (result.stderr) {
    console.error('********************* Warning ****************************');
    console.error(`Executing : ${cmd}`);
    console.error(`Result: ${result.stderr.toString()}`);
    console.error('**********************************************************');
  }
  return result.stdout.toString();
};

const executeCommand = (cmd, srcDir) => {
  const options = { maxBuffer: 1024 * 5000 };

  if (srcDir) options.cwd = srcDir;

  return exec(cmd, options).then(result => onExecFinish(result, cmd));
};

module.exports = { executeCommand };

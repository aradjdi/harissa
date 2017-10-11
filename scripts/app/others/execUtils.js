const exec = require('child-process-promise').exec;

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
  const options = {maxBuffer: 1024 * 500};
  
  if (srcDir) options.cwd = srcDir;

  return exec(cmd, options).then(
    result => onExecFinish(result, cmd)
  );
}

module.exports = {
  executeCommand: executeCommand
}
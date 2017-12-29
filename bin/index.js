#!/usr/bin/env node

const program = require('commander');
const timer = require('../scripts/_timer');

const { init } = require('../scripts/init');
const { run } = require('../scripts/run');
const { serve } = require('../scripts/serve');
const { release, build } = require('../scripts/release');

const time = (scriptPath) => {
    timer.start();

    require(scriptPath)
        .init()
        .then(() => console.log('cordova finish'))
        .then(() => timer.end())
        .then(duration => console.log(`BUILD SUCCESSFUL in ${duration}s`));
};

program.version(require('../package').version);

program
    .command('init')
    .description('create a new harissa project!')
    .action(init);

program
    .command('release [device]')
    .description('release and deploy for target devices')
    .option('-e, --env <type>', 'Specify target environment <type>')
    .action((device, options) => release(device, options.env));

program
    .command('build [device]')
    .description('release and deploy for target devices')
    .option('-e, --env <type>', 'Specify target environment <type>')
    .action((device, options) => build(device, options.env));

program
    .command('run [device] [os]')
    .description('run on selected device and os')
    .option('-e, --env <type>', 'Specify target environment <type>')
    .action((device, os, options) => run(device, os, options.env));

program
    .command('serve')
    .description('serve on local browser')
    .option('-e, --env <type>', 'Specify target environment <type>')
    .action(options => serve(options.env));

program
    .command('serve-vue')
    .action(() => require('../scripts/serve-vue'));

program
    .command('');

program.parse(process.argv);

#!/usr/bin/env node

const program = require('commander');

const { init } = require('../scripts/init');
const { run } = require('../scripts/run');
const { serve } = require('../scripts/serve');
const { release, build } = require('../scripts/release');

program.version(require('../package').version);

program.command('init')
    .description('create a new harissa project!')
    .action(init);

program.command('release [device]')
    .description('release and deploy for target devices')
    .option('-e, --env <type>', 'Specify target environment <type>')
    .option('--skip-test', 'release without launching tests')
    .action((device, options) => release(device, options.env, options.skipTest));

program.command('build [device]')
    .description('release and deploy for target devices')
    .option('-e, --env <type>', 'Specify target environment <type>')
    .option('--skip-test', 'build without launching tests')
    .action((device, options) => build(device, options.env, options.skipTest));

program.command('run [device] [os]')
    .description('run on selected device and os')
    .option('-e, --env <type>', 'Specify target environment <type>')
    .option('--skip-test', 'run without launching tests')
    .action((device, os, options) => run(device, os, options.env, options.skipTest));

program.command('serve')
    .description('serve on local browser')
    .option('-e, --env <type>', 'Specify target environment <type>')
    .action(options => serve(options.env));

program.command('serve-test')
    .action(() => require('../scripts/serve-test'));

program.command('serve-vue')
    .action(() => require('../scripts/serve-vue'));

program.command('');

program.parse(process.argv);

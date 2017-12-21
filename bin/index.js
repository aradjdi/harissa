#!/usr/bin/env node

const program = require('commander');
const timer = require('../scripts/_timer');

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
    .action(() => require('../scripts/init'));

program
    .command('release')
    .action(() => require('../scripts/release'));

program
    .command('release-smartphone')
    .action(() => require('../scripts/release-smartphone'));

program
    .command('release-tablet')
    .action(() => require('../scripts/release-tablet'));

program
    .command('run-smartphone-android')
    .action(() => time('../scripts/run-smartphone-android'));

program
    .command('run-smartphone-ios')
    .action(() => require('../scripts/run-smartphone-ios'));

program
    .command('run-tablet-android')
    .action(() => require('../scripts/run-tablet-android'));

program
    .command('run-tablet-ios')
    .action(() => require('../scripts/run-tablet-ios'));

program
    .command('serve')
    .action(() => require('../scripts/serve'));

program
    .command('serve-vue')
    .action(() => require('../scripts/serve-vue'));

program.parse(process.argv);

#!/usr/bin/env node

const program = require('commander');

program
  .command('init')
  .action(options => require('../scripts/init'));

program
  .command('release')
  .action(options => require('../scripts/release'));

program
  .command('run-smartphone-android')
  .action(options => require('../scripts/run-smartphone-android'));

program
  .command('run-smartphone-ios')
  .action(options => require('../scripts/run-smartphone-ios'));

program
  .command('run-tablet-android')
  .action(options => require('../scripts/run-tablet-android'));

program
  .command('run-tablet-ios')
  .action(options => require('../scripts/run-tablet-ios'));

program
  .command('serve')
  .action(options => require('../scripts/serve'));

program
  .command('serve-vue')
  .action(options => require('../scripts/serve-vue'));

program.parse(process.argv);
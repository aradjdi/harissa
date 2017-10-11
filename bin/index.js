#!/usr/bin/env node

const program = require('commander');

program
  .command('init')
  .description('init Harissa project')
  .action(options => require('../scripts/init'))
  .on('--help', () => {
    console.log('  Examples:');
    console.log();
    console.log('    $ harissa init ');
    console.log();
  });

program
  .command('serve')
  .description('serve Harissa project')
  .action(options => require('../scripts/serve'))
  .on('--help', () => {
    console.log('  Examples:');
    console.log();
    console.log('    $ harissa serve ');
    console.log();
  });

program
  .command('release')
  .description('release Harissa project')
  .action(options => require('../scripts/release'))
  .on('--help', () => {
    console.log('  Examples:');
    console.log();
    console.log('    $ harissa release ');
    console.log();
  });

program.parse(process.argv);
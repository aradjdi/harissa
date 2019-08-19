#!/usr/bin/env node

const program = require('commander');

const banner = require('./_banner');
const params = require('./_params');

const init = require('../scripts/init');
const serve = require('../scripts/serve');
const build = require('../scripts/build');
const release = require('../scripts/release');
const upload = require('../scripts/upload');
const run = require('../scripts/run');

program.version(require('../package').version);

// harissa init
// harissa init -n HelloWorld -i com.mousquetaires.helloworld
// harissa init --project-name HelloWorld --project-id com.mousquetaires.helloworld
program
    .command('init')
    .description('create a new harissa project!')
    .option('-n, --project-name <type>', 'Specify project name')
    .option('-i, --project-id <type>', 'Specify project id')
    .action(async (...initParams) => {
        // await banner.show();
        return init(
            await params.init(...initParams)
        );
    });

// harissa sev
// harissa sev -e dev
// harissa sev --env dev
program
    .command('serve')
    .description('serve on local browser')
    .option('-e, --env <type>', 'Specify target environment <type>')
    .action(async (...serveParams) => {
        // await banner.show();
        return serve(
            await params.serve(...serveParams)
        );
    });

// harissa run
// harissa run smartphone
// harissa run smartphone android
// harissa run smartphone android -e dev
// harissa run smartphone android --env dev
program
    .command('run [device] [os]')
    .description('run on selected device and os')
    .option('-e, --env <type>', 'Specify target environment <type>')
    .action(async (...runParams) => {
        // await banner.show();
        return run(
            await params.run(...runParams)
        );
    });

// harissa build
// harissa build smartphone
// harissa build smartphone -e dev
// harissa build smartphone --env dev
program
    .command('build [device]')
    .description('release and deploy for target devices')
    .option('-e, --env <type>', 'Specify target environment <type>')
    .action(async (...buildParams) => {
        // await banner.show();
        return build(
            await params.build(...buildParams)
        );
    });

// harissa release
// harissa release smartphone
// harissa release smartphone -e dev
// harissa release smartphone --env dev
program
    .command('release [device]')
    .description('release and deploy for target devices')
    .option('-e, --env <type>', 'Specify target environment <type>')
    .action(async (...releaseParams) => {
        // await banner.show();
        return release(
            await params.release(...releaseParams)
        );
    });

// harissa upload
// harissa upload smartphone
// harissa upload smartphone -e dev -c "my change log"
// harissa upload smartphone --env dev --changes "my change log"
program
    .command('upload [device]')
    .description('upload to appaloosa')
    .option('-e, --env <type>', 'Specify target environment <type>')
    .option('-c, --changes <type>', 'Specify change log')
    .action(async (...uploadParams) => {
        // await banner.show();
        return upload(
            await params.upload(...uploadParams)
        );
    });

program
    .command('serve-vue')
    .action(() => require('../scripts/serve-vue'));

program
    .command('');

program.parse(process.argv);

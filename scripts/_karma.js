const Q = require('q');
const karma = require('karma');

const logs = require('./_logs');

const startKarma = (conf) => {
    const deferred = Q.defer();
    
    logs.info('-- -- karma', 'start karma', conf);

    const server = new karma.Server(conf, (exitCode, a, b, c) => {
        if (exitCode !== 0) {
            logs.error('-- -- karma', 'server karma failed', exitCode);

            deferred.reject(exitCode);
        } else {
            logs.success('-- -- karma', 'finish karma');

            deferred.resolve();
        }
    });
    server.start();
    return deferred.promise;
};

module.exports = { startKarma };

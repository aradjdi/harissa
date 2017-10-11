const Q = require('q');
const karma = require('karma');

const startKarma = conf => {
  const deferred = Q.defer();
  const server = new karma.Server(conf, exitCode => {
    if (exitCode !== 0) deferred.reject(exitCode);
    else                deferred.resolve();
  });
  server.start();
  return deferred.promise;
}

module.exports = {
  startKarma: startKarma
}
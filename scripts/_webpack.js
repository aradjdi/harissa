const Q = require('q');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const devServerConfig = require('./configWebpacks/webpack.devserver.config');

const compile = (config) => {
  const deferred = Q.defer();
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    if (err) deferred.reject(err);
    else deferred.resolve(stats);
  });
  return deferred.promise;
};

const serve = (config) => {
  const deferred = Q.defer();
  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, devServerConfig);
  server.listen(8080, 'localhost', deferred.resolve);
  return deferred.promise;
};

module.exports = {
  compile,
  serve,
};

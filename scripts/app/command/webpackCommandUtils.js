const Q = require('q');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfigUtils = require('../config/webpackConfigUtils');

const createCompiler = config => {
  return webpack(config);
}

const compileProject = compiler => {
  const deferred = Q.defer();
  console.log('*******************************************')
  console.log('*******************************************')
  console.log('*******************************************')
  console.log('*******************************************')
  console.log('*******************************************')
  compiler.run((err, stats) => {
    if (err) deferred.reject(err);
    else     deferred.resolve(stats);
  });
  return deferred.promise;
};

const launchDevServer = compiler => {
  const deferred = Q.defer();
  const config = webpackConfigUtils.getDevServerConfig();
  const server = new webpackDevServer(compiler, config);
  server.listen(8080, 'localhost', deferred.resolve);
  return deferred.promise;
};

module.exports = {
  createCompiler: createCompiler,
  compileProject: compileProject,
  launchDevServer: launchDevServer
}
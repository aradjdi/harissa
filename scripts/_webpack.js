const Q = require('q');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const logs = require('./_logs');

const devServerConfig = require('./configWebpacks/webpack.devserver.config');

const compile = (config) => {
    const deferred = Q.defer();

    logs.info('-- -- webpack', 'start compilation', config);

    const compiler = webpack(config);
    compiler.run((err, stats) => {
        if (err) {
            logs.error('-- -- webpack', 'compilation failed', err);

            deferred.reject(err);
        } else {
            logs.success('-- -- webpack', 'finish  compilation', stats);

            deferred.resolve(stats);
        }
    });
    return deferred.promise;
};

const serve = (config) => {
    const deferred = Q.defer();
    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, devServerConfig);
    server.listen(3000, 'localhost', deferred.resolve);
    return deferred.promise;
};

module.exports = {
    compile,
    serve
};

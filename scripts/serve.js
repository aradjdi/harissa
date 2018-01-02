const Q = require('q'); require('./_spy');

const banner = require('./_banner');
const questions = require('./_questions');
const builds = require('./_builds');
const errors = require('./_errors');

const initNodeEnv = (env) => {
    let promise;
    if (!env) {
        promise = Q().spy(() => questions.askNodeEnv(), 'questions', 'askNodeEnv');
    } else {
        promise = Q(env);
    }

    return promise.then((nodeEnv) => { process.env.NODE_ENV = nodeEnv; });
};

const buildAndServeDist = () => Q()
    .spy(() => builds.serveDistVue(), 'build', 'serveDistVue');

const serve = nodeEnv => Q()
    .then(() => initNodeEnv(nodeEnv))
    .then(() => buildAndServeDist())
    .catch(errors.onError);

module.exports = {
    serve(nodeEnv) {
        return banner.show().then(() => serve(nodeEnv));
    }
};

const Q = require('q');

const banner = require('./_banner');
const questions = require('./_questions');
const builds = require('./_builds');
const errors = require('./_errors');

const setEnv = env => Q().then(() => {
    process.env.NODE_ENV = env;
    return env;
});

const askEnv = () => Q()
    .then(() => questions.askNodeEnv())
    .then(env => setEnv(env))
    .catch(errors.onError);

const serveDist = () => Q()
    .then(() => builds.serveDist())
    .catch(errors.onError);

const environment = env => (env ? setEnv.bind(this, env) : askEnv);

const executeRunners = runners => runners.reduce((promise, runner) => promise.then(() => runner()), Q());

const serve = (env) => {
    banner
        .show()
        .then(() => {
            const runners = [];
            runners.push(environment(env));
            runners.push(serveDist);
            return executeRunners(runners);
        });
};

module.exports = { serve };

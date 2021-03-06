const Q = require('q'); require('./_spy');

const questions = require('./_questions');

const builds = require('./_builds');
const errors = require('./_errors');

const initNodeEnv = () => Q()
    .spy(() => questions.askNodeEnv(), 'questions', 'askNodeEnv')
    .then((nodeEnv) => { process.env.NODE_ENV = nodeEnv; });

const buildAndServeDist = () => Q()
    .spy(() => builds.serveDistVue(), 'build', 'serveDistVue');

Q()
    .then(() => initNodeEnv())
    .then(() => buildAndServeDist())
    .catch(errors.onError);

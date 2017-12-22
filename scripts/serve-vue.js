const Q = require('q');

const questions = require('./_questions');

const builds = require('./_builds');
const errors = require('./_errors');

Q()
    .then(() => questions.askNodeEnv())
    .then((nodeEnv) => { process.env.NODE_ENV = nodeEnv; })
    .then(() => builds.serveDistVue())
    .catch(errors.onError);

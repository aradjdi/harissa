const Q = require('q'); require('./_spy');

const questions = require('./_questions');

const tests = require('./_tests');
const errors = require('./_errors');

const initNodeEnv = () => Q()
    .spy(() => questions.askNodeEnv(), 'questions', 'askNodeEnv')
    .then((nodeEnv) => { process.env.NODE_ENV = nodeEnv; });

const serveTests = () => Q()
    .spy(() => tests.serveProject(), 'tests', 'serveTests');

Q()
    .then(() => initNodeEnv())
    .then(() => serveTests())
    .catch(errors.onError);

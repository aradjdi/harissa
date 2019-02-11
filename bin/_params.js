#!/usr/bin/env node

const questions = require('./_questions');

const init = async ({ projectName, projectId }) => ({
    name: projectName || await questions.askProjectName(),
    id: projectId     || await questions.askProjectId()
});

const serve = async ({ env }) => ({
    env: env || await questions.askNodeEnv()
});

const build = async (device, { env, buildVersion }) => ({
    device: device        || await questions.askDevice(),
    env: env              || await questions.askNodeEnv(),
    version: buildVersion || await questions.askVersion()
});

const run = async (device, os, { env }) => ({
    device: device || await questions.askDevice(),
    os: os         || await questions.askOS(),
    env: env       || await questions.askNodeEnv()
});

const release = async (device, { env, releaseVersion, changes }) => ({
    device: device          || await questions.askDevice(),
    env: env                || await questions.askNodeEnv(),
    version: releaseVersion || await questions.askVersion(),
    changes: changes        || await questions.askChanges()
});

const upload = async (device, { env, changes }) => ({
    device: device   || await questions.askDevice(),
    env: env         || await questions.askNodeEnv(),
    changes: changes || await questions.askChanges()
})

module.exports = {
    init,
    serve,
    build,
    run,
    release,
    upload
};

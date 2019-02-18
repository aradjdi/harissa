#!/usr/bin/env node

const questions = require('./_questions');

const init = async ({ projectName, projectId, technicalEnvironment }) => ({
    name: projectName || await questions.askProjectName(),
    id: projectId     || await questions.askProjectId(),
    techEnv: technicalEnvironment || await questions.askTechnicalEnvironment()
});

const serve = async ({ env }) => ({
    env: env || await questions.askNodeEnv()
});

const run = async (device, os, { env, technicalEnvironment, projectId }) => ({
    device: device || await questions.askDevice(),
    os: os         || await questions.askOS(),
    env: env       || await questions.askNodeEnv(),
    techEnv: technicalEnvironment || await questions.askTechnicalEnvironment(),
    id: projectId     || await questions.askProjectId(),
});

const build = async (device, { env, buildVersion, technicalEnvironment }) => ({
    device: device        || await questions.askDevice(),
    env: env              || await questions.askNodeEnv(),
    version: buildVersion || await questions.askVersion(),
    techEnv: technicalEnvironment || await questions.askTechnicalEnvironment()
});

const release = async (device, { env }) => ({
    device: device          || await questions.askDevice(),
    env: env                || await questions.askNodeEnv()
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

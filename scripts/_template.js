const Q = require('q');
const fs = require('fs-extra');
const replace = require('replace');

const exec = require('./_exec');

const paths = require('./_paths');

const duplicateProjectTemplates = (appName, appId) => Q.all([
    fs.copy(`${paths.templatesDir}/app`, `${paths.appDir}`),
    fs.copy(`${paths.templatesDir}/conf`, `${paths.confDir}`),
])
    .then(() => replace({
        regex: '<%name%>',
        replacement: appName,
        paths: [paths.currentDir],
        recursive: true,
        silent: true,
    }))
    .then(() => replace({
        regex: '<%id%>',
        replacement: appId,
        paths: [paths.currentDir],
        recursive: true,
        silent: true,
    }));

const installDependencies = () => exec.executeCommand('npm install', paths.appDir);

module.exports = {
    duplicateProjectTemplates,
    installDependencies,
};

const versionsExec = require('./_versions-exec');

const buildPackageVersion = () => versionsExec.getPackageVersion()
    .then(version => versionsExec.setPackageVersion(version));

const buildAppVersion = () => versionsExec.getAppVersion()
    .then(version => versionsExec.setAppVersion(version));

const buildBuildVersion = () => versionsExec.getBuildVersion()
    .then(version => versionsExec.setBuildVersion(version));

module.exports = {
    buildPackageVersion,
    buildAppVersion,
    buildBuildVersion,
};

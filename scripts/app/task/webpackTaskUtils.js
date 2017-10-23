const Q = require('q');
const webpackConfigUtils = require('../config/webpackConfigUtils');
const webpackCommandUtils = require('../command/webpackCommandUtils');

const buildProject = () => Q()
  .then(() => webpackConfigUtils.getBuildConfig())
  .then(config => webpackCommandUtils.createCompiler(config))
  .then(compiler => webpackCommandUtils.compileProject(compiler));

const releaseProject = () => Q()
  .then(() => webpackConfigUtils.getReleaseConfig())
  .then(config => webpackCommandUtils.createCompiler(config))
  .then(compiler => webpackCommandUtils.compileProject(compiler));

const serveProject = () => Q()
  .then(() => webpackConfigUtils.getServeConfig())
  .then(config => webpackCommandUtils.createCompiler(config))
  .then(compiler => webpackCommandUtils.launchDevServer(compiler));

module.exports = {
  buildProject: buildProject,
  releaseProject: releaseProject,
  serveProject: serveProject
}
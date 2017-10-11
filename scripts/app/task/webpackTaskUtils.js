const Q = require('q');
const webpackConfigUtils = require('../config/webpackConfigUtils');
const webpackCommandUtils = require('../command/webpackCommandUtils');

const HtmlLoader = require('html-loader');
// console.log('html-loader', HtmlLoader);
const BabelLoader = require('babel-loader');

console.log('babel-loader', BabelLoader);

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
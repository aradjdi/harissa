const path = require('path');

const rootDir = path.join(__dirname, '..');
const templatesDir = path.join(rootDir, 'scripts/templates');

const currentDir = process.cwd();
const confDir = path.join(currentDir, '../conf');
const appDir = currentDir;

const distDir = path.join(appDir, 'dist');
const releaseDir = path.join(appDir, 'release');
const srcDir = path.join(appDir, 'src');
const testDir = path.join(appDir, 'test');
const cordovaDir = path.join(appDir, 'cordova');
const storeDir = path.join(cordovaDir, 'store');

module.exports = {
    rootDir,
    templatesDir,

    currentDir,
    confDir,
    appDir,

    distDir,
    releaseDir,
    srcDir,
    testDir,
    cordovaDir,
    storeDir,
};

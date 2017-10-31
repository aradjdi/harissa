const path = require('path');

const rootDir = path.join(__dirname, '..');
const templatesDir = path.join(rootDir, 'scripts/templates');

const destDir = process.cwd();
const distDir = path.join(destDir, 'dist');
const releaseDir = path.join(destDir, 'release');
const srcDir = path.join(destDir, 'src');
const testDir = path.join(destDir, 'test');
const smartphoneDir = path.join(destDir, 'cordova/smartphone');
const tabletDir = path.join(destDir, 'cordova/tablet');
const storeDir = path.join(destDir, 'cordova/store');

module.exports = {
  rootDir: rootDir,
  templatesDir: templatesDir,
  
  destDir: destDir,
  distDir: distDir,
  releaseDir: releaseDir,
  srcDir: srcDir,
  testDir: testDir,
  smartphoneDir: smartphoneDir,
  tabletDir: tabletDir,
  storeDir: storeDir
}
const Q = require('q');
const fs = require('fs-extra');

const exec = require('./_exec');
const paths = require('./_paths');
const buildUtils = require('./_run-build');

const buildSrc = () => Q()
  .then(() => buildUtils.buildDist())
  .then(() => buildUtils.buildDistTabletIOS());

const deploySmartphone = () => {
  const cmd = 'cordova run ios';
  
  return exec.executeCommand(cmd, paths.tabletDir);
}

Q()
  .then(() => buildSrc())
  .then(() => deploySmartphone())
  .catch(error => {    
    console.log(error);
    const fs = require('fs');
    fs.writeFile('error.log', error, err => {
        if (err) {
          console.log(err);
        }
    
        console.log('The file was saved!');
    });
  });
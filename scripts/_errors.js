const fs = require('fs');

const logs = require('./_logs');

const onError = (error) => {
    logs.error('deploy', 'starting', error);
    return fs.writeFile('error.log', error, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('The file was saved!');
    });
};

module.exports = { onError };

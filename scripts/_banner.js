const Q = require('q');
const imageToAscii = require('image-to-ascii');
const path = require('path');
const figlet = require('figlet');

const show = () => {
    const defer = Q.defer();

    imageToAscii(
        path.resolve(__dirname, '../logo/harissa.png'),
        {
            pxWidth: 1,
            size: {
                height: '45%'
            },
            white_bg: false
        }, (err, converted) => {

            if (err) {
                return defer.reject(err);
            }

            console.log('\n\n');
            console.log(`${figlet.textSync('    Harissa', {
                font: 'ANSI Shadow',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })} v ${require('../package').version}`);
            console.log(converted);
            console.log('\n\n');

            return defer.resolve();
        }
    );

    return defer.promise;
};

module.exports = { show };

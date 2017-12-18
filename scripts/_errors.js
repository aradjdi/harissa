const fs = require('fs');

const onError = (error) => {
  console.log(error);
  return fs.writeFile('error.log', error, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('The file was saved!');
  });
};

module.exports = { onError };

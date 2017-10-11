const Q = require('q');
const Sftp = require('sftp-upload');

const host = 'l203ed2049-adm1';
const username = 'etude';
const password = 'etude';

const uploadDir = (srcDir, destDir) => {
  const deferred = Q.defer();

  const sftpConfig = {
    host: host,
    username: username,
    password: password,
    path: srcDir,
    remoteDir: destDir
  };

  const uploader = new Sftp(sftpConfig);
  uploader.on('error', deferred.reject);
  uploader.on('completed', deferred.resolve);
  uploader.upload();

  return deferred.promise;
};

module.exports = {
  uploadDir: uploadDir
}
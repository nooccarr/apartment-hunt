const S3 = require('aws-sdk/clients/s3');
const crypto = require('crypto');
const Stream = require('stream');
const {ID, SECRET} = require('./s3Config.js');

const BUCKET_NAME = 'nate-pruitt-test-bucket-0001';

const algorithm = 'aes-192-cbc';
const password = '';
  // Use the async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
  // The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.
const s3 = new S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const encryptMessage = (unecryptedMessage) => {
    var cipher, result, iv;
    // Create an iv
    iv = crypto.randomBytes(16);

    // Create a new cipher
    cipher = crypto.createCipheriv(algorithm, key, iv);

    // Create the new chunk
    result = Buffer.concat([iv, cipher.update(unecryptedMessage), cipher.final()]);

    return result;
}

const uploadFile = (fileName) => {

  var encryptedBuffer = encryptMessage(fileName.buffer);
  const params = {
    Bucket: 'nate-pruitt-test-bucket-0001',
    Key: fileName.originalname,
    Body: encryptedBuffer, // Can this be binary files? Does it have to be a buffer? S
    ContentType: 'application/pdf'
  };

  return s3.upload(params).promise(); // return promise
};

const uploadVideo = (fileName) => {
  const params = {
    Bucket: 'nate-pruitt-test-bucket-0001',
    Key: fileName.originalname,
    Body: fileName.buffer, // Can this be binary files? Does it have to be a buffer? S
    ContentType: 'video/mp4'
  };

  return s3.upload(params).promise();
}

const getFile = (fileName) => {
  //const fileContent = fs.readFileSync(fileName);
  const params = {
    Bucket: 'nate-pruitt-test-bucket-0001',
    Key: fileName,
  };

  return s3.getObject(params).promise();
};

const decryptMessage = (encryptedMessage) => {
    var decipher,
        result,
        iv;
    // Get the iv: the first 16 bytes
    iv = encryptedMessage.slice(0, 16);

    // Get the rest
    encryptedMessage = encryptedMessage.slice(16);

    // Create a decipher
    decipher = crypto.createDecipheriv(algorithm, key, iv);

    // Actually decrypt it
    result = Buffer.concat([decipher.update(encryptedMessage), decipher.final()]);

    return result;
}

exports.uploadFile = uploadFile;
exports.getFile = getFile;
exports.decryptMessage = decryptMessage;
exports.uploadVideo = uploadVideo;
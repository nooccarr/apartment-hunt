const S3 = require('aws-sdk/clients/s3');
const crypto = require('crypto');
const Stream = require('stream');

const ID = 'AKIAJILEIOQG6YWW7APA';
const SECRET = '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';
const BUCKET_NAME = 'nate-pruitt-test-bucket-0001';

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
  // Use the async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
  // The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.
const s3 = new S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const uploadFile = (fileName) => {
  /*
  Comment out encryption
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(fileName.buffer);
  //encrypted += cipher.final();
  */
  const params = {
    Bucket: 'nate-pruitt-test-bucket-0001',
    Key: fileName.originalname,
    Body: fileName.buffer, // Can this be binary files? Does it have to be a buffer? S
    ContentType: 'application/pdf'
  };

  return s3.upload(params).promise(); // return promise
};

const getFile = (fileName) => {
  //const fileContent = fs.readFileSync(fileName);
  const params = {
    Bucket: 'nate-pruitt-test-bucket-0001',
    Key: fileName,
  };

  return s3.getObject(params).promise();
};

const decryptMessage = (encryptedMessage) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedMessage)
  //decrypted += decipher.final();
  return decrypted;
}


exports.uploadFile = uploadFile;
exports.getFile = getFile;
exports.decryptMessage = decryptMessage;
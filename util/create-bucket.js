const AWS = require('aws-sdk');

const ID = 'AKIAI3L7HBNGPU62UHFA';
const SECRET = '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';
const BUCKET_NAME = 'nate-pruitt-test-bucket-0001';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
    LocationConstraint: "us-east-2"
  }
}

s3.createBucket(params, (err, data) => {
  if (err) {
    console.log("Error in bucket creation! Error: ", err);
  } else {
    console.log("Bucket created successfully! Here: ", data.Location);
  }
})
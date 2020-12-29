const S3 = require('aws-sdk/clients/s3');



const ID = '';
const SECRET = '';
const BUCKET_NAME = '';

const s3 = new S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const getFile = (fileName, callback) => {
  //const fileContent = fs.readFileSync(fileName);
  const params = {
    Bucket: 'nate-pruitt-test-bucket-0001',
    Key: fileName,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.log("Error in download! Error: ", err);
    }
      console.log("File downloaded successfully!", data);
      callback({'data': data.Body});
  })
};



export default getFile;

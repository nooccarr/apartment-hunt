const S3 = require('aws-sdk/clients/s3');



const ID = '';
const SECRET = '';
const BUCKET_NAME = '';

const s3 = new S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const uploadFile = (fileName) => {
  //const fileContent = fs.readFileSync(fileName);


  const params = {
    Bucket: 'nate-pruitt-test-bucket-0001',
    Key: fileName.name,
    Body: fileName, // Can this be binary files? Does it have to be a buffer? S
    ContentType: 'application/pdf'
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log("Error in upload! Error: ", err);
    }
    console.log("File uploaded successfully!", data)
  })
};



export default uploadFile;

const fs = require('fs');
const AWS = require('aws-sdk');

// Enter copied or downloaded access ID and secret key here
const readAWS = fs.readFileSync("awskey.json");
const parseAWS = JSON.parse(readAWS);

//console.log(parseAWS.AWSKey);
const ID = parseAWS.AWSKey;
const SECRET = parseAWS.AWSSecretKey;

// The name of the bucket that you have created
const BUCKET_NAME = 'electric-avenue';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

exports.uploadFile = (fileName, data, callback) => {
    // Read content from the file
    //const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: data
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        callback(data.Location);
    });
};


//uploadFile('cat.jpg');
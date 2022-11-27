const AWS = require('aws-sdk');

AWS.config.update({
    region: "global",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY

})

const db = new AWS.DynamoDB.DocumentClient();

const Table = 'Customers';

exports.db = {
    db
};

exports.Table = Table;



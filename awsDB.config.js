require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
    "region": "us-west-2",
    "endpoint": "http://dynamodb.us-west-2.amazonaws.com",
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID2,
    "secretAccessKey": process.env.AWS_SECRET_KEY2

})

const db = new AWS.DynamoDB.DocumentClient();

const Table = "Customers";

exports.awsConf = {
    Table,
    db
};


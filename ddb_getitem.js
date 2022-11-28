var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-west-2",
    "endpoint": "http://dynamodb.us-west-2.amazonaws.com",
    "accessKeyId": "AKIA443UG6AMXFHT2IRF", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
let fetchOneByKey = async function () {
    var params = {
        TableName: "Customers",
        Key: {
            CustomerID: "A6EE87B6FAEDB76AF8CC32A55A58BFDC"
        }
    };
    await docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
        }
    })
}


fetchOneByKey();
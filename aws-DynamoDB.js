const Table = require('./awsDB.config').awsConf.Table;
const db = require('./awsDB.config').awsConf.db;

//Read all customers
async function readAllCustomersFunc () {
    var params = {
        "TableName": Table,
        "Key": {
            CustomerID: "E304C0640B284ACE5358712F49FBCEFF"
        },
        //"AttributesToGet": ['CustomerName']
    };

    try{
        const Items = await db.get(params).promise();

        console.log("Success, data is retrieved");
        return {success : true, data: Items}
        
    } catch(err){
        throw err;
        console.log("Error",err);
        return {success : false, data: err}
    }
};

var readAllCustomers = readAllCustomersFunc();


exports.awsReadItem = {
    readAllCustomers
}



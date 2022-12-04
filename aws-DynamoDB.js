const Table = require('./awsDB.config').awsConf.Table;
const db = require('./awsDB.config').awsConf.db;

//Read all customers
async function readAllCustomersFunc () {
    var params = {
        "TableName": Table,
        "Key": {
            CustomerID: "12345VA"
        }
        //"AttributesToGet": ['CustomerName']
    };

    try{
        const Items = await db.get(params).promise();

        console.log("Success, data is retrieved",Items);
        return {success : true, data: Items}
        
    } catch(err){
        console.log("Error",err);
        throw err;
        return {success : false, data: err}

    }
};

var readAllCustomers = readAllCustomersFunc();


exports.awsReadItem = {
    readAllCustomers
}



const Table = require('./awsDB.config').Table;
const db = require('./awsDB.config').db;

//Read all customers
readAllCustomers = async() => {
    const params = {
        TableName: Table,
    }

    try{
        const {Items = []} = await db.scan(params).promise()
        return {success : true, data: Items}
    } catch(err){
        return {success : false, data: null}
    } 
};


exports.readAllCustomers = {
    readAllCustomers
}



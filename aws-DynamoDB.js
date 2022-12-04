import {Table} from './awsDB.config.js';
import {db} from './awsDB.config.js';

//Read all customers
export default async function readAllCustomers () {
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
        return {success : false, data: err}
        throw err;


    }
};






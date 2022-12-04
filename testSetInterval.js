import express from 'express';
import mysql from 'mysql2';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
import {db} from "./server.js";  //important
import readAllCustomers from './aws-DynamoDB.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


var ItemCached = "";



var PORT = 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//Check to see if a user is connected or disconnected
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('a user disconnected!')
    })
});

//Emitting messages + capturing events
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

io.on('connection', async (socket) => {

    const intervalID2 =  await setInterval(emitToFront, 5000);
    
    async function emitToFront() {

        let { success, data } = await readAllCustomers();
        let ItemCached1 = data;

        socket.emit('pushFront', ItemCached1);
    }
        
    intervalID2;


});



app.get('/test', (req, res) => {
    
    res.sendFile(__dirname + '/index2.html');

})

/* app.get('/aws' , async (req,res) => {
  
  let { success, data } = await readAllCustomers;

  if(success){
    return res.send(JSON.stringify(data)),
    console.log('Data retrieved!', success);
  } else {
    return res.status(500).json({success:false, messsage: data}),
    console.log("Error", JSON.stringify(data))
  }
  
}) */





server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
/* 

const intervalID = setInterval(myCallback, 500, 'Parameter 1', 'Parameter 2');

function myCallback(a, b)
{
 // Your code here
 // Parameters are purely optional.
 console.log(a);
 console.log(b);
}

intervalID; */
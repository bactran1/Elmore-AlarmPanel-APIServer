const express = require('express');
const mysql = require('mysql2');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var db = require("./server").db;  //important
//import { createOrUpdate, deleteUserById, getUserById, readAllUsers } from './aws-DynamoDB.js'
const readAllCustomers = require('./aws-DynamoDB').readAllCustomers;





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


app.get('/test', (req, res) => {
  db.connect(function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Connected!");
      db.query("SELECT * FROM alarmsMain where alarmID = 5", (err,rows) => {
        if(err) {
          throw err;
          console.log(err);
        } else {
          res.send(rows);
        }
      })
    };
  });
})

app.get('/aws' , async(req,res) => {
  const { err, data } = await readAllCustomers

  if(err){
    return res.status(500).json({success:false, messsage: "Error"}),
    console.log(err)
  } else {
      return res.json({data}),
      console.log('Connected!');
  }
  
})


server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
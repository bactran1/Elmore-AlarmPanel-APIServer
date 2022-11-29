const express = require('express');
const mysql = require('mysql2');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var db = require("./server").db;  //important
readAllCustomers = require('./aws-DynamoDB').awsReadItem.readAllCustomers;





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
      console.log("DB connection error", err);
    } else {
      console.log("Data Retrieved from MYSQL DB!");
      db.query("SELECT * FROM alarmsMain where alarmID = 5", (err,rows) => {
        if(err) {
          throw err;
          console.log(err);
        } else {
          res.send(rows);
          db.end();
          console.log("Ended connection!")
        }
      })
    };
  });
})

app.get('/aws' , async (req,res) => {
  
  let { success, data } = await readAllCustomers;

  if(success){
    return res.send(JSON.stringify(data)),
    console.log('Data retrieved!', success);
  } else {
    return res.status(500).json({success:false, messsage: data}),
    console.log("Error", JSON.stringify(data))
  }
  
})


server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
const express = require('express');
const mysql = require('mysql2');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//const db = require("./server");

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
    if (err) throw err;
    console.log("Connected!");
  });
})


server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
  });

  app.get('/blob', (req, res) => {
    res.sendFile(__dirname + '/assets/bg-yellow.svg');
  });

app.get('/chats', (req, res) => {
  res.sendFile(__dirname + '/html/chats.html');
});


io.on('connection', socket =>{
    socket.on('new-user', name =>{
        socket.broadcast.emit('user-connected', name);
    });

    socket.on('send-chat-message', (message, username) => {
        socket.broadcast.emit('chat-message', message, username)   
   
    });

    socket.on('someone-typing', (username)=>{
        socket.broadcast.emit('someone-typing', username)
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
  });

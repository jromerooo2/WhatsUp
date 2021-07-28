const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const { SocketAddress } = require('net');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bot = "MEEBEE6"

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
  });

  app.get('/chats', (req, res) => {
    res.sendFile(__dirname + '/html/chats.html');
  });

  app.get('/blob', (req, res) => {
    res.sendFile(__dirname + '/assets/bg-yellow.svg');
  });

  app.get('/scriptChat', (req, res) => {
    res.sendFile(__dirname + '/scriptChat.js');
  });
  app.get('/scriptJoin', (req, res) => {
    res.sendFile(__dirname + '/scriptJoin.js');
  });



io.on('connection', socket =>{
  
  socket.on('createRoom', (username) =>{
        socket.broadcast.emit('user-connected', username, socket.id);              
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

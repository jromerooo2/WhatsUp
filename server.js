const { Socket } = require('dgram');
const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const { SocketAddress } = require('net');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bot = "MEEBEE6"

//Main 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
  });

//Chats Route
app.get('/chats', (req, res) => {
    res.sendFile(__dirname + '/html/chats.html');
  });

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server-Side Socket.IO events
io.on('connection', socket =>{

  socket.emit("user-id", (socket.id))
  socket.on('someone-join', (username) =>{
        socket.broadcast.emit('user-connected', username);
        socket.emit              
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

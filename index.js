const io = require("socket.io")(3000,{
    cors: {
        origin: "*",
    },
});

io.on('connection', socket =>{
    socket.emit('chat-message', 'Hello from socket server')
});

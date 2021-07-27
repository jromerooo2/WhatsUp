const io = require("socket.io")(3000,{
    cors: {
        origin: "*",
    },
});

io.on('connection', socket =>{
    console.log('New User')
    socket.emit('chat-message')
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', message)
    })
});

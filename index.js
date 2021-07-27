const io = require("socket.io")(3000,{
    cors: {
        origin: "*",
    },
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

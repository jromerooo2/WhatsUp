const socket = io('http://localhost:3000');


$('#buttonLog').click(()=>{
    var username = $('#inputNick').val();
    var room = $('#inputRoom').val();
    if (username === "" || room === "") {
        alert("enter nickname")
    }else{
        window.location.href = "http://localhost:3000/chats?username="+username+"&server="+room;

        socket.emit('joinRoom', username, room);
    }
});

$('#buttonCreate').click(()=>{
    var username = $('#inputNick').val();
 
    if (username ==="") {
        alert("Please provide a nickname");
    }
    else{        

        window.location.href = "http://localhost:3000/chats?username="+username;
        socket.emit('createRoom', username);
    }
});

socket.on('accepted', (bot, msg) =>{
    alert(bot +": "+ msg) 
})

socket.on('accepted', (bot, msg) =>{
    alert(bot +": "+ msg)
})
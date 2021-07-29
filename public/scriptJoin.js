const socket = io('http://localhost:3000');

$("#buttonCreate").hover(()=>{
    var white = "ffff"
    $("#icon").css({stroke: '#'+white})
})

$( "#buttonCreate" ).mouseleave(()=> {
    var yellow = "FBBF24"
    $("#icon").css({stroke: '#'+yellow})
  });

  $("#buttonLog").hover(()=>{
    var white = "ffff"
    $("#icon2").css({stroke: '#'+white})
})

$( "#buttonLog" ).mouseleave(()=> {
    var green = "34D399"
    $("#icon2").css({stroke: '#'+green})
  });

  
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
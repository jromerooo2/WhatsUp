const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const username = prompt("Please Provide a Name");

appendMessage("You just joined the room, say Hi!")

//SOCKETS EVENTS
socket.emit('new-user', username)

socket.on('user-connected', name => {   
    if (name === null) {
        name = "Guest"
    }
    newUser(`${name} just joined!, say hi`);        
});

socket.on('chat-message', (data, name) => { 
    if (name === null) {
        name = "Guest"
    }
        deleteAlert();       
            appendMessage(name+": "+data);
                  
});

socket.on('someone-typing', (username) =>{
    if (username === null) {
        username = "Guest"
    }
    appendAlert(username);
});


//FUNCTIONS AND HTML EVENTS 
messageInput.addEventListener('keydown', ()=>{ 
    socket.emit('someone-typing', username)
});

messageForm.addEventListener('submit', e=>{
    e.preventDefault()
    const message = messageInput.value;
    socket.emit('send-chat-message', message, username)

    appendMessage(message)
    messageInput.value = '';
});

function appendMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}

function appendAlert(username){
    const messageElement = document.createElement('p');
    messageElement.setAttribute("id", "div-text-gray");
    if (!document.getElementById("div-text-gray")) 
    {
        messageElement.classList.add('animate-pulse')       
        messageElement.innerText = username +" is typing...";
        messageContainer.append(messageElement);
    }
    else{
        document.getElementById("div-text-gray").style.display = "block";
    }

}

function deleteAlert(){
    if (document.getElementById("div-text-gray")) 
    {
        document.getElementById("div-text-gray").remove();
    }
}

function newUser(name){
    const messageElement = document.createElement('div');
    messageElement.style.backgroundColor = "green";
    messageElement.style.color = "#fff"; 
    messageElement.innerText = name;
    messageContainer.append(messageElement);
}
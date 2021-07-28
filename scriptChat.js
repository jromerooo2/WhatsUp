const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');


appendMessage("You just joined the room, say Hi!")

//SOCKETS EVENTS

socket.on('user-connected', (name, id) => {   
    newUser(name + " just joined!, say hi✌" + id);        
});

socket.on('chat-message', (data, name) => { 
        deleteAlert();       
            appendMessage(name+": "+data);
                  
});

socket.on('someone-typing', (username) =>{
    appendAlert(username);
});


//FUNCTIONS AND HTML EVENTS 


messageInput.addEventListener('keydown', ()=>{ 

    let params = new URLSearchParams(document.location.search.substring(1));
    var userMessage = params.get("username")

    if (!userMessage) {
        userMessage = "Guest"
    }
    socket.emit('someone-typing', userMessage)
});

messageForm.addEventListener('submit', e=>{
    let params = new URLSearchParams(document.location.search.substring(1));

    var userMessage = params.get("username")
    if (!userMessage) {
        userMessage = "Guest"
    }

    e.preventDefault()
    const message = messageInput.value;
    socket.emit('send-chat-message', message, userMessage)

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
    messageElement.style.display ="block"
    messageElement.style.margin ="auto"
    messageElement.style.width = "50%"
    messageElement.style.backgroundColor = "#047857";
    messageElement.style.color = "#FFF"; 
    messageElement.innerText = name;
    messageContainer.append(messageElement);
}
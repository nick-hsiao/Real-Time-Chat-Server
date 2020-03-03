const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is  your name?')
postMessage('You joined')
socket.emit('new-user',name)

socket.on('chat-message',data => {
    postMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected',name=> {
    postMessage(`${name} connected`)
})

socket.on('user-disconnected',name=> {
    postMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit',e =>{
    e.preventDefault()
    const message = messageInput.value
    postMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = '' 

})

function postMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
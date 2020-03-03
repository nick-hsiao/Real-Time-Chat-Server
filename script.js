const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is  your name?')
const date = new Date()
postMessage(`[${date.getHours()}:${date.getMinutes()}] You joined`)
socket.emit('new-user',name)

socket.on('chat-message',data => {
    postMessage(`[${data.hour}:${data.minutes}] ${data.name}: ${data.message}`)
})

socket.on('user-connected',name=> {
    const date = new Date()
    postMessage(`[${date.getHours()}:${date.getMinutes()}] ${name} connected`)
})

socket.on('user-disconnected',name=> {
    const date = new Date()
    postMessage(`[${date.getHours()}:${date.getMinutes()}] ${name} disconnected`)
})

messageForm.addEventListener('submit',e =>{
    e.preventDefault()
    const message = messageInput.value
    const date = new Date()
    postMessage(`[${date.getHours()}:${date.getMinutes()}] You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = '' 

})

function postMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
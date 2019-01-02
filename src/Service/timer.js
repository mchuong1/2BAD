import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');
function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}

function messageToServer(name, message) {
    console.log("Sent: " + name + " " +message)
    socket.emit('messageToServer', {message: message, name: name});
    
    socket.on('messageToServer', function(data){
        console.log("Recieved: " + data.name + data.message);
        var output = document.getElementById('output');
        output.innerHTML += '<p><strong>' + data.name + ': </strong>' + data.message + '</p>'
    });
}
export { subscribeToTimer, messageToServer }

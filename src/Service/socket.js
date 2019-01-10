import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}

function connectionStatus(cb) {
    socket.on('connectionStatus', lobby => cb(null, lobby));
    socket.emit('sendStatus', 1000);
}

function messageToServer(name, message) {
    console.log("Sent: " + name + " " +message)
    socket.emit('messageToServer', {
        message: message, 
        name: name
    });
}

socket.on('messageToServer', function(data){
    //this function is sending out to all socket clients
    console.log("Recieved: " + data.name + data.message);
    var output = document.getElementById('output');
    output.innerHTML += '<p><strong>' + data.name + ': </strong>' + data.message + '</p>'
});

function coinCounter(coin){
    console.log("Coin count: " + coin);
    socket.emit('coinCounter', {coin:coin});
}

socket.on('coinCounter', function(data){
    console.log('Recieved coin amount: ' + data.coin +'\n From client: ' + data.clientID);
});

socket.on('connect', (data) => {
    console.log("Connected to socket.io");
    console.log(data);
});

socket.on('disconnect', (data) => {
    console.log("Someone disconnected");
    console.log("Disconnected: " + data.clientID + "\nLobby Number: " + data.lobbyNum);
})

export { subscribeToTimer, messageToServer, coinCounter, connectionStatus }

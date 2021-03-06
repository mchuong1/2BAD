var express = require('express');
var bodyParser = require('body-parser');
var uuid = require('uuid');
var io = require('socket.io')(app);
var app = express();
var port = process.env.PORT || 4200;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/count/?*', function(request, response){
     var received = new Date().getTime();
     var original = request.query.time;
     console.log(original);

    //var original = request.body["timeSent"];
    response.setHeader('Access-Control-Allow-Origin', '*');
    //response.send(request.body);

    var jsonString = '[{ "original" : ' + original + ', "received" : ' + received + ', "transmitted" : ' + new Date().getTime() + ', "id": "' + uuid.v4() + '" }]';

    console.log(jsonString);
    response.send(jsonString);


    console.log('DONE\n');
        // respond with json
});

    app.post('/submitping', function(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    console.log(request.body);
    var timeDiff = request.body.diff;
    var clientID = request.body.id;
    console.log('timeDiff: ' + timeDiff + '\nclientID: ' + clientID);

    setTimeDiff(clientID, timeDiff);
    console.log(getTimeDiff(clientID));
    if(getTimeDiffSize() < 3) {
			//1st and 2nd execute this
			console.log('NUMBER OF PLAYERS IN LOBBY = ' + getTimeDiffSize());
			response.status(200);
			console.log(stallGame(clientID));
			response.send(stallGame(clientID));
		} else {

			finalCheckIn = getCheckIn() + 1000;
			party_checkin_status = true;
			response.status(200);
			calculateStartDates();
			var checkInFromNow = finalCheckIn - (new Date().getTime());
			//var checkInFromNow = nextCheckIn - (new Date().getTime());
			setTimeout(function() {
			response.send(startGame(clientID));
			}, checkInFromNow); //checkInFromNow + 4000);
    }
});

app.get('/lobby/?*', function(request, response){
    response.setHeader('Access-Control-Allow-Origin', '*');
    var result;
    var id = request.query.id;
    console.log('CHECKIN STATUS @@@@@@@@@@@@@@@ : ' + party_checkin_status);
    if(count === 2) result = startGame(id);
    else {
   // if (party_checkin_status) {
    //finalCheckin = checkInTime + 4000;
    			console.log('##########################');

			result = stallGame();
			//bit = true
			
    }

    /*

     var clientID = request.query.time;

    response.setHeader('Access-Control-Allow-Origin', '*');

    var jsonString = '[{ "original" : ' + original + ', "received" : ' + received + ', "transmitted" : ' + new Date().getTime() + ', "id": "' + uuid.v4() + '" }]';

    console.log(jsonString);
    response.send(jsonString);

    */
    response.send(result);
    console.log('Sent to ' + id + ' | Number of Players Ready: ' + clientsWaiting.size +
    '\n' + result + '\n');
        // respond with json
});

    function calculateStartDates() {
    var i;
    var keys = Object.keys(timeDiffs);
    keys.forEach(function(key){
    var sendTime = timeDiffs[key];
    var startTime = 5000 - sendTime;
    startDates[key] = startTime;
    });

    }



    function startGame(id) {
    	var date;
    	console.log('--------New game | Sent at ' + new Date() + ' Final CheckIn: ' + finalCheckIn + '----------');
    	return '{ "gameReady" : ' + true + ', "date" : ' + startDates[id] + ', "checkin":' + null + '}';
    }

    function stallGame() {

			//provides gameready, date, checkin time
			console.log('STALL GAME')
    	return '{ "gameReady" : ' + false + ', "date" : ' + 00000000000 + ', "checkin": ' + getCheckIn() +' }';
		}
		
		function getNextCheckInTime(id){
        console.log('Set length: ' + clientsWaiting.size);
        if (clientsWaiting.size > 0) {
            if(!clientsWaiting.has(id)) clientsWaiting.add(id);
            checkInCount++;

        } else {
            clientsWaiting.add(id);
            nextCheckIn = new Date().getTime();
            checkInCount++;
        }

            if (checkInCount === clientsWaiting.size) {
            nextCheckIn += 2000;
            checkInCount = 0;
            }
            console.log('NEXT CHECKIN: ' + getCheckIn() + '\nCOUNT: ' + checkInCount);
            if (party_checkin_status) {
            console.log('party is full! let\'s go!');
            nextCheckIn = finalCheckIn;
            flag = true;
            }

            return nextCheckIn;

		/*
			var current = new Date().getTime();
			var leftover = current % 2000;
			if(leftover === 0 & leftover < current) leftover = 2000;
			var checkin = current - leftover + 4000;
			return checkin;
			*/
		}

		function getCheckIn() {
		console.log('NEXT CHECKIN: ' + currentCheckIn);

		 if (party_checkin_status) {
                    console.log('CALL CALL CALL');
                    currentCheckIn = finalCheckIn;
                    count++;
                    }

		return currentCheckIn;
		}

    var count = 0;
    var nextCheckIn;
    var finalCheckIn;
    var checkInCount = 0;
	  var party_checkin_status = false;
	  var clientsWaiting = new Set();
    var timeDiffs = {};
    var startDates = {};
    var currentCheckIn = new Date().getTime() + 2000;

    function setTimeDiff(id, diff) {
    timeDiffs[id] = diff;
    }

    function getTimeDiff(id) {
    return timeDiffs[id];
    }

    function getTimeDiffSize() {
    return Object.keys(timeDiffs).length
    }

    app.listen(port, 'localhost',function(){
        console.log('Server is now running my app on PORT: ' + port);
    });

    setInterval(function() {
    if(!party_checkin_status) currentCheckIn += 500;
    }, 500)

    //socket.io code
    var ioPort = 8000
    var numConnectedClients = 0;
    var clients = [];
    
    io.on('connection', (client) => {
		console.log("Made socket connection..." + client.id);
        numConnectedClients++; //keeps count of howmany people in lobby

        var player = {
            clientID: client.id,
            coin: 0
        }
        
        clients.push(player); //add client to clients object array

        client.on('subscribeToTimer', (interval)=> {
            //sends seconds
            setInterval(()=>{
                client.emit('timer', new Date().getTime());
            }, interval);
        });
        
        client.on('sendStatus', (interval) => {
            //keeps track how many people in lobby
            setInterval(() => {
                console.log("Lobby Status: " + numConnectedClients);
                console.log("Clients: ");
                console.log(clients);
                client.emit('connectionStatus', JSON.stringify(clients))
            }, interval)
        })

		client.on('messageToServer', function(data) {
            //controls the messaging center
			io.emit('messageToServer', data); //emits to all clients when they are connected
			console.log(data);
		}); 

		client.on('coinCounter', function(data) {
            //keeps track of coins per client
            console.log("From Bank: " + data.coin);
            clients.map(player => {
                if(player.clientID === client.id) {
                    player.coin = data.coin
                }
            })
        });

        client.on('disconnect', (reason) => {
                numConnectedClients--;
                var data = {
                    lobbyNum: numConnectedClients,
                    clientID: client.id
                }
                console.log('Disconnected Client: ' + client.id + "\nReason: " + reason);
                io.emit('disconnect', data);

                //deletes diconnected client from array
                var index = clients.findIndex(i => i.clientID = client.id) ;
                clients.splice(index, 1); //not working as expected
                setTimeout(() => {console.log(clients)},0);
        });//end disconnect

	});//end connection

    io.listen(ioPort);
    console.log('Socket.io listening on port ', ioPort);

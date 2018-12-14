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
    response.status(200);
    response.send(stallGame());
    } else {
    response.status(200);
    calculateStartDates();
    response.send(startGame(clientID));

    }
});

app.get('/lobby/?*', function(request, response){
    var result;
    if (getTimeDiffSize() < 3) {
    result = stallGame();
    } else {
    result = startGame();
    }


     var clientID = request.query.time;

    response.setHeader('Access-Control-Allow-Origin', '*');

    var jsonString = '[{ "original" : ' + original + ', "received" : ' + received + ', "transmitted" : ' + new Date().getTime() + ', "id": "' + uuid.v4() + '" }]';

    console.log(jsonString);
    response.send(jsonString);


    console.log('DONE\n');
        // respond with json
});

    function calculateStartDates() {
    var i;
    var keys = Object.keys(timeDiffs);
    keys.forEach(function(key){
    var sendTime = timeDiffs[key];
    var startTime = 1000 - sendTime;
    startDates[key] = startTime;
    });

    }


    function startGame(id) {
    var date;
    return '{ "gameReady" : ' + true + ', "date" : ' + startDates[id] + ' }';
    }

    function stallGame() {
    return '{ "gameReady" : ' + false + ', "date" : ' + "undefined" + ' }';
    }


    var timeDiffs = {};
    var startDates = {};

    function setTimeDiff(id, diff) {
    timeDiffs[id] = diff;
    }

    function getTimeDiff(id) {
    return timeDiffs[id];
    }

    function getTimeDiffSize() {
    return Object.keys(timeDiffs).length
    }

    app.listen(port,/*'10.1.10.138',*/ function(){
        console.log('Server is running my app on PORT: ' + port);
    });

    //socket.io practice
    var ioPort = 8000

    io.on('connection', (client) => {
        client.on('subscribeToTimer', (interval)=> {
            setInterval(()=>{
                client.emit('timer', new Date().getTime());
            }, interval);
        });
    });

    io.listen(ioPort);
    console.log('Socket.io listening on port ', ioPort);

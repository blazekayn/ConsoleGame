var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ucm = require('./private/UserCommandProcessing.js');
var go = require('./private/GameObjects.js');
var hf = require('./private/HelperFunctions.js')

//Start the game world
var g_world = new go.World();
g_world.addRoom(new go.Point(0,0));

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});


io.on('connection', function(socket){
	console.log('a user connected');
	socket.emit('fromServer', {message: 'Who are you?', color: 'yellow'});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('fromClient', function(data){
    	console.log('fromClient: ' + data);
    	data = hf.stripHTML(data);
    	//line for testing
    	socket.emit('fromServer', {message: '@echo ' + data, color: 'yellow'});

    	var commandResult = ucm.process(data, socket, g_world);
    	socket.emit('fromServer', commandResult)
  	});

  	socket.on('sendName', function(data){
    	console.log('sendName: ' + data);
  		var username = hf.stripHTML(data)
  		if(g_world.addPlayer(username)){
  			socket.username = username;
  			console.log(socket.username);	
  		}else{
  			socket.emit('fromServer', {message: 'NAME TAKEN' + username, color: 'red'});
  		}
  		
  	});
});
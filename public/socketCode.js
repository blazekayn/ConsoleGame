var socket = io(); //reference to socket for sending/receiving data
//socket.emit('funciton',data);
//socket.on('userInfo', function(data){

$(document).ready(function(){
	//Commands we can recieve from the server
	socket.on('fromServer', function(data){
		printServerLine(data.message, 'server', data.color);
	});
});

function sendCommand(data){
	socket.emit('fromClient', data);
}

function sendName(data){
	socket.emit('sendName', data);
}
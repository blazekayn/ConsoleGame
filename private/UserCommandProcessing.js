var commands = [
	{name:'NAME', command: 'name', desc: 'DISPLAYS THE CURRENT USERNAME'},
	{name:'HELP', command: 'help', desc: 'DISPLAY LIST OF COMMANDS'},
	{name:'WHO', command: 'players', desc: 'DISPLAY LIST OF ONLINE PLAYERS'},
	{name:'T', command: 'talk', desc: 'TOGGLE THE CHAT OPTION WHEN TRUE YOU WILL TALK IN LOCAL NOT ENTER COMMANDS'},
	{name:'/T', command: 'endtalk', desc: 'END THE CHAT OPTION AND ALLOW COMMANDS'}
];

function getUserMode(data, world){
	return world.getPlayer(data.username).mode;
}

//TODO: Do I need to expose all these functions? Can I just have Process in here and
//		put the rest up above as private functions?
module.exports = {
	process: function(message, data, world){
		var mode = getUserMode(data, world);

		if(mode === 'CMD'){
			for(var i = 0; i < commands.length; i++){
				if(commands[i].name === message.toUpperCase()){
					return this[commands[i].command](data, world);
				}
			}
		}else if(mode === 'T'){
			this.sayLocal(message, data, world);
		}
		return {message: 'ERR: NOT A VALID COMMAND. TRY TYPING HELP.', color: 'red'};
	},
	name: function(data, world){
		if(data && data.username){
			return {message: data.username, color: 'yellow'};
		}else{
			return {message: 'ERR: NO USERNAME', color: 'red'};
		}
	},
	help: function(data, world){
		var message = '<br/>';
		for(var i = 0; i < commands.length; i++){
			message += commands[i].name + ': ' + commands[i].desc + '<br/>';
		}
		if(message === '<br/>'){
			return {message: message, color: 'yellow'};
		}else{
			return {message: 'ERR: NO COMMANDS AVAILABLE', color: 'red'};
		}
	},
	players: function(data, world){
		if(world && world.players){
			var message = '';
			for(var i = 0; i < world.players.length; i++){
				message += world.players[i].username + '<br/>';
			}
			return {message: message, color: 'yellow'};
		}else{
			return {message: 'ERR: NO PLAYERS', color: 'red'};
		}
	},
	talk: function(data, world){
		if(world.getPlayer(data.username).mode === 'CMD'){
			world.getPlayer(data.username).mode = 'T';
			return {message: 'MODE SET TO TALK', color:'orange'};
		}else{
			world.getPlayer(data.username).mode = 'CMD';
			return {message: 'MODE SET TO COMMANDS', color:'orange'};
		}
		return {message: 'ERR: COULD NOT SET MODE', color: 'red'};
	},
	sayLocal: function(message, data, world){
		//hmm this will follow a different patter because it needs to relay a message
		//to each user in the same room. Probably a world.getPlayerByRoom call and
		//then we still have to pass back up to the server the players to update.
	}
};
var g_name = '';

$( document ).ready(function(){
	//focus the textbox and make in always focused
	$('.main-input').focus();
	$('.main-input').focusout(function(){
			$('.main-input').focus();
		});
		
});

$(document).on('keypress',function(e) {
	if(e.which == 13) {
		var message = $('.main-input').val();
		printServerLine(message, 'user', 'green');
		$('.main-input').val('');
		//if we already set our name its safe to send messages
		if(g_name){
			sendCommand(message);
		}else{
			//send our name to the server
			sendName(message);
			g_name = message;
		}
	}
});

//Prints a message from the server to the cosole. Appends timestamp and strips html
//
//text - the message to be printed.
//type - Integer (see list of types) - optional parameter if type is provided it will change the 
//			type of message shown. if not it will be a default message.
function printServerLine(text, type, color){
	//create the message
	text = '<div class="line-' + type + '-' + color + '">' + getDateStamp() + text + "</div>";
	//print the message
	$('#divOutput').append(text);
	//keep the page scrolled down
	$('body')[0].scrollTop = $('body')[0].scrollHeight;
}

//Returns string - the standard time stamp used on all messages
function getDateStamp(){
	var currentdate = new Date(); 
	var stamp = '['  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + '] ';
	return stamp;
}
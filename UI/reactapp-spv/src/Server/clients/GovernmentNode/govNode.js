const io = require('socket.io')();

io.on("connect", function (){
	socket.on("blockVerify", function(block){
		console.log(block)
	})	
});
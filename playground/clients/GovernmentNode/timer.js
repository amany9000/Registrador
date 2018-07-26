
const async = require("async");
const fs  = require("fs");
const io = require('socket.io')();

const {blockMaker} = require("./blockMaker");
const {updateDB} = require("./updateDB")
const {selectBlock} = require("./selectBlock")

var flag1 = true;
var flag2 = true;
async.whilst(
	function () {return true;},
	function (callback){
		if(new Date().getMinutes() === 33){
			flag1 = true
		}

		if(new Date().getMinutes() === 55 && new Date().getSeconds() === 0 && flag1){
			setTimeout(callback, 1000);
			blockMaker((reply)=>{
				console.log(reply);
				fs.writeFileSync("./clients/GovernmentNode/block.json",JSON.stringify(reply,undefined,2));
				io.emit('blockCreated', reply);
			});
    		flag1 = false; 
		}
		else{
			setTimeout(callback, 1000);
		}

		if(new Date().getMinutes() === 55 && new Date().getSeconds() === 0){
			flag2 = true;
		}
		if(new Date().getMinutes() === 49 && new Date().getSeconds() === 0 && flag2){
			setTimeout(callback, 1000);
			console.log("selectBlock");
			
			selectBlock((block)=>{
				console.log(block);
				updateDB(block, (reply) => {
					console.log(reply)
				})
				io.emit('blockSelected', block);
			});
    		flag2 = false; 
		}
		else{
			setTimeout(callback, 1000);
		}
	}
)

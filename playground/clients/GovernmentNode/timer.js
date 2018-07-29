
const async = require("async");
const fs  = require("fs");
const io = require('socket.io')();

const {blockMaker} = require("./blockMaker");
const {selectBlock} = require("./selectBlock")
var {transactionVerify} = require("./transactionVerify")

var flag1 = true;
var flag2 = true;
async.whilst(
	function () {return true;},
	function (callback){
		if(new Date().getMinutes() === 33){
			flag1 = true
		}
		if(new Date().getMinutes() === 55 && new Date().getSeconds() === 0){
			flag2 = true;
		}
		
		if(new Date().getMinutes() === 3 && new Date().getSeconds() === 0 && flag1){
			setTimeout(callback, 1000);
			blockMaker((reply)=>{
				console.log(reply);
				fs.writeFileSync("./clients/GovernmentNode/block.json",JSON.stringify(reply,undefined,2));
				io.emit('blockCreated', reply);
			});
    		flag1 = false; 
		}

		else if(new Date().getMinutes() === 4 && new Date().getSeconds() === 0 && flag2){
			setTimeout(callback, 1000);
			console.log("selectBlock");
			
			selectBlock((block, reply)=>{
				console.log(reply);
				io.emit('blockSelected', block);
				fs.writeFileSync("./clients/GovernmentNode/transactionList.json",[]);					
				fs.writeFileSync("./clients/GovernmentNode/halted.log","true");
				fs.writeFileSync("./clients/GovernmentNode/recievedBlocks.json",[]);
				// transaction element and pending list
 				var transElementList = JSON.parse(fs.readFileSync("./clients/GovernmentNode/transactionElement.json").toString());				 
 				for(var i in transElementList){
 					var flag3 = false;
 					for(var j in block.transactionList){
 						if(transElementList[i].transaction.data.landID === block.transactionList[j]){
 							flag3 = true;
 						}
 					}
 					if(!flag3){
 						transElementList.pop(transElementList[i]);
 					}
 				}
 				
 				var pendingList = fs.readFileSync("./clients/GovernmentNode/pendingList.json").toString();				 
				for(var i in pendingList){
					var flag4 = false;
					for(var j in transElementList){
						if(pendingList[i] == transElementList[i].transaction.landID){
							flag4 = true;
						}
					}
					if(flag3){
						pendingList.pop(pendingList[i])
					}
				}
			});
    		flag2 = false;
		}
		else{
			setTimeout(callback, 1000);
		}


	}
)

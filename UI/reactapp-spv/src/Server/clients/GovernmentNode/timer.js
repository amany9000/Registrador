
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

		else if(new Date().getMinutes() === 8	 /*&& new Date().getSeconds() === 0 */&& flag2){
			setTimeout(callback, 1000);
			console.log("selectBlock");
			fs.writeFileSync("./clients/GovernmentNode/pendingList.log","");              
			
			selectBlock((block, reply)=>{
				console.log("rep",reply);
				var blockChain = JSON.parse(fs.readFileSync("./clients/GovernmentNode/blockChain.json").toString());				 
				blockChain.push(block);
				fs.writeFileSync("./clients/GovernmentNode/blockChain.json",JSON.stringify(blockChain,undefined,2));					
				fs.writeFileSync("./clients/GovernmentNode/transactionList.json",JSON.stringify([],undefined,2));					
				fs.writeFileSync("./clients/GovernmentNode/halted.log","true");
				fs.writeFileSync("./clients/GovernmentNode/recievedBlocks.json",JSON.stringify([],undefined,2));
				// transaction element and pending list
 				var transElementList = JSON.parse(fs.readFileSync("./clients/GovernmentNode/transactionElement.json").toString());				 
 				
 				var blockTransList = [];
 				for(var i in block.transactionList){
 					blockTransList.push(JSON.parse(block.transactionList[i]));
 				} 				
 				for(var i in transElementList){
 					var flag3 = false;
 					for(var j in blockTransList){
 						if(transElementList[i].transaction.data.landID === blockTransList[j].data.landID){
 							console.log("transactionElements");
 							flag3 = true;
 						}
 					}
 					if(flag3){
 						transElementList.pop(transElementList[i]);
 					}
 				}
 			console.log("transactionElement - ", transElementList)
			fs.writeFileSync("./clients/GovernmentNode/transactionElement.json", JSON.stringify(transElementList,undefined,2)); 				
            var pendingList = [];                
			for(var i in transElementList){
				pendingList.push(transElementList[i].transaction.data.landID);
			}
			fs.writeFileSync("./clients/GovernmentNode/pendingList.log", pendingList);              
			});
    		flag2 = false;
		}
		else{
			setTimeout(callback, 1000);
		}
	}
)

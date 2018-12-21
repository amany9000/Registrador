  
const async = require("async");
const fs  = require("fs");
const io = require('socket.io')();

const {blockMaker} = require("./blockMaker");
const {selectBlock} = require("./selectBlock")
const {transactionVerify} = require("./transactionVerify")
const {createBranch} = require("./createBranch") 

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
		
		if(new Date().getMinutes() === 18 && new Date().getSeconds() === 0 && flag1){
			setTimeout(callback, 1000);
			blockMaker((reply)=>{
				console.log(reply);
				if(reply.class === "block"){
					fs.writeFileSync("./clients/GovernmentNode/block.json",JSON.stringify(reply,undefined,2));
				}
				fs.writeFileSync("../TransactionList/transList.json",JSON.stringify([],undefined,2));								
			});
    		flag1 = false; 
		}

		else if(new Date().getMinutes() === 20	&& new Date().getSeconds() === 0 && flag2){
			setTimeout(callback, 1000);
			console.log("selectBlock");
			
			selectBlock((block, reply)=>{
				console.log("rep",reply,block);
				var blockChain = JSON.parse(fs.readFileSync("../Blockchain/Blockchain.json").toString());				 
				blockChain.push(block);
				var transList = [];
				for(var i in block.transactionList){
					transList.push(JSON.parse(block.transactionList[i]))
				}				
				//createBranch(transList, block.header.hashMerkleRoot);
				
				fs.writeFileSync("../Blockchain/Blockchain.json",JSON.stringify(blockChain,undefined,2));					
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
				fs.writeFileSync("./clients/GovernmentNode/halted.log","true");			
			});
    		flag2 = false;
		}
		else{
			setTimeout(callback, 1000);
		}
	}
)

  
const async = require("async");
const fs  = require("fs");
const io = require('socket.io')();

const {blockMaker} = require("./blockMaker");
const {selectBlock} = require("./selectBlock")
const {transactionVerify} = require("./transactionVerify")
const {createBranch} = require("./createBranch") 
var base64Img = require('base64-img');

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
		
		if(new Date().getMinutes() === 51 && new Date().getSeconds() === 0 && flag1){
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

		else if(new Date().getMinutes() === 16	&& new Date().getSeconds() === 0 && flag2){
			setTimeout(callback, 1000);
			console.log("selectBlock");
			
			selectBlock((block, reply)=>{
				console.log("rep",reply,block);

				if(block.class){	
					var blockChain = JSON.parse(fs.readFileSync("../Blockchain/Blockchain.json").toString());				 
					blockChain.push(block);
					fs.writeFileSync("../Blockchain/Blockchain.json",JSON.stringify(blockChain,undefined,2));					
					
					var trans
					for(var i in block.transactionList){
						trans = JSON.parse(block.transactionList[i]);
						base64Img.imgSync( trans.data.picture, `../pictures`, `${block.header.blockHeight}_${trans.data.landID}`)
					}				
					delete trans;				
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
 					fs.writeFileSync("./clients/GovernmentNode/transactionElement.json", JSON.stringify(transElementList,undefined,2)); 				
            		var pendingList = [];                
					for(var i in transElementList){
						pendingList.push(transElementList[i].transaction.data.landID);
					ed7813a5ad8954dfd4abbf3bae3a9af872cd2f77250266068a267b89abc1fe88}
					fs.writeFileSync("./clients/GovernmentNode/pendingList.log", pendingList);              

					createBranch(blockTransList, block.header, block.landID);
	    	        
	    	        delete blockTransList,transElementList,blockChain;
 				}

				fs.writeFileSync("./clients/GovernmentNode/halted.log","true");
				fs.writeFileSync("./clients/GovernmentNode/recievedBlocks.json",JSON.stringify([],undefined,2));				
			});
    		flag2 = false;
		}
		else{
			setTimeout(callback, 1000);
		}
	}
)

 
const b64u =  require("b64u");
const crypto = require("crypto")
const fs = require('fs')  

var	{transactionVerify} = require("./transactionVerify")
var {getMerkleTree} = require("./../merkle");
var {block} = require("./db/dbModels/block");
var {blockSigCreate} = require("./governmentNodeSig")

const myPublicKey = fs.readFileSync('publicSeller.pem').toString();
var signature   = "blockGenerator's_Signature"; 

var blockMaker = async (callback) => {
 	var transElementList = JSON.parse(fs.readFileSync("./clients/GovernmentNode/transactionElement.json").toString());
 	var transactionList = JSON.parse(fs.readFileSync("../TransactionList/transList.json").toString()); 	
 	var blockElementList = [];    //list of transactions going in the block
 	for(var i=0;i<transElementList.length;i++){
 		transElementList[i].priority++;
 		if(blockElementList.length < 3){
 			blockElementList.push(transElementList[i].transaction);
 			transElementList.splice(i,i+1);
 			i--
 		}
 	}
	console.log("list", transactionList)
	fs.writeFileSync("./clients/GovernmentNode/pendingList.log","");              
	await transactionVerify(transactionList, (reply)=>{
		var sortedTrans = [];     // sorted list of recieved(valid) transactions 

		console.log("trans rep",reply)
		for(i in transactionList){
			if(reply[i]){
				var hash = crypto.createHash('sha256');
				hash.update(JSON.stringify(transactionList[i],undefined,2));
				sortedTrans.push({hash: hash.digest('hex'), transaction : transactionList[i]});
			}
		}
		sortedTrans.sort((a,b) => {return (a.hash > b.hash) ? 1 : ((a.hash < b.hash) ? -1 : 0);})
		for(i in sortedTrans){
			if(blockElementList.length < 3 ){
 			blockElementList.push(sortedTrans[i].transaction);
			}
			else{
				transElementList.push({priority: 0,transaction: sortedTrans[i].transaction});
			}
		}
		getMerkleTree(blockElementList,(tree) => {
			block.find().sort("-header.blockHeight").exec((err,recievedBlock) => {
				if(err || block == undefined || block == null){
					return callback("error in previous block retrieval");
				}
				else{
					var blockCreated = {};
					var blockHeight = -1;
					var hashPrevBlock = "";
					//console.log("r",recievedBlock)
					if( recievedBlock.length == 0){ // genesisBlock
						blockHeight = 0;
						hashPrevBlock = null;
					}
					else if(recievedBlock[0].header.blockHeight >=0){
						blockHeight = recievedBlock[0].header.blockHeight + 1;
						var hash = crypto.createHash('sha256');
						hash.update(JSON.stringify(recievedBlock[0],undefined,2));
						hashPrevBlock =  hash.digest('hex');						
					}
					
					for(i in blockElementList){
						blockElementList[i] = JSON.stringify(blockElementList[i],undefined,2)
					}
					blockCreated = {
						class : "block", 
						header : {
					        blockHeight   : blockHeight,
					        hashPrevBlock : hashPrevBlock,
					        hashMerkleRoot : tree.root(),
					        blockTimeStamp : new Date().getTime() 
						},
					    transactionCount : blockElementList.length,
					    transactionList : blockElementList,
					    blockGenerator  : myPublicKey,
					}
					//create signature
					var signature  = blockSigCreate(blockCreated);
					blockCreated["signature"] = signature; 
					fs.writeFileSync("./transactionElement.json", JSON.stringify(transElementList,undefined,2));
					return callback(blockCreated);
				}
			});
		});
	});
	fs.writeFileSync("./clients/GovernmentNode/pendingList.log","");              
}
/*
blockMaker((reply) =>{
		console.log(reply,blockSigVerify(reply));
});
*/
module.exports = {blockMaker};


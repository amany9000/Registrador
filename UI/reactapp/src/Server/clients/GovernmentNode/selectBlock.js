
const crypto = require("crypto")
const fs = require('fs')

const {updateDB} = require("./updateDB")
function compare(a,b){
	if(a.hash > b.hash)
		return 1;
	if(a.hash < b.hash)
		return -1;
	return 0;
}

var selectBlock = async (callback) =>{
	var receivedBlocks = JSON.parse(fs.readFileSync("./clients/GovernmentNode/recievedBlocks.json").toString());  
	if(receivedBlocks.length == 0 ){
		return  callback({},"No correct blocks recieved");
	}
	else{	
		//console.log(receivedBlocks);
		var blockHashList = [];
		var blockFreqList = [];
		var len = receivedBlocks.length
		var selectedBlockElement = {};
		let temp = [];
		for(var i in receivedBlocks){
			temp.push({"generator": receivedBlocks[i]["blockGenerator"], "sig": receivedBlocks[i]["signature"] });
			delete receivedBlocks[i]["signature"];
			delete receivedBlocks[i]["blockGenerator"];
		}
		//	console.log("selectBlock", receivedBlocks)
		for(var i = 0; i<len; i++){
			var hash = crypto.createHash('sha256');
			hash.update(JSON.stringify(receivedBlocks[i],undefined,2));
			blockHashList.push({hash:hash.digest("hex"), block : receivedBlocks[i]});
		}
		blockHashList.sort(compare)
		//console.log(blockHashList);
		var count = 0;
		for(var i = 0; i<len; i++){
			blockFreqList.push({hash: blockHashList[i].hash, block: blockHashList[i].block, freq: 1})
			var j = i + 1;
			while(j<len && blockHashList[i].hash === blockHashList[j].hash){
				blockFreqList[count].freq++;
				j++;
			}
			i = j-1;
			count++; 
		}
	
		//console.log(blockFreqList);
		fs.writeFileSync("./clients/GovernmentNode/blockFreqList.json",JSON.stringify(blockFreqList,undefined,2));						
		selectedBlockElement = blockFreqList[0]; 
		selectedBlockElement.block["signature"] = temp[0]["sig"]
		selectedBlockElement.block["blockGenerator"] = temp[0]["generator"]
		for(i = 1; i<blockFreqList.length; i++){
			if(blockFreqList[i].freq > selectedBlockElement.freq){
				selectedBlockElement = blockFreqList[i];
				selectedBlockElement.block["signature"] = temp[i]["sig"]
				selectedBlockElement.block["blockGenerator"] = temp[i]["generator"]
			}
		}
		//return callback(selectedBlockElement.block, "done")
		let rep;
		await updateDB(selectedBlockElement.block, (reply) => {
		})
		return callback(selectedBlockElement.block, "Database Updated")		
	}	
}
/*
selectBlock( (reply)=>{
	console.log(reply)
})*/
module.exports = {selectBlock}

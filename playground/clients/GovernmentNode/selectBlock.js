
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
	//console.log(receivedBlocks);
	var blockHashList = [];
	var blockFreqList = [];
	var len = receivedBlocks.length
	var selectedBlockElement = {};
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
	selectedBlockElement = blockFreqList[0]; 
	for(i = 1; i<blockFreqList.length; i++){
		if(blockFreqList[i].freq > selectedBlockElement.freq){
			selectedBlockElement = blockFreqList[i];
		}
	}
	return callback(selectedBlockElement.block, "done")
	/*await updateDB(selectedBlockElement.block, (reply) => {
		return callback(selectedBlockElement.block, reply)
	})	*/
}
/*
selectBlock( (reply)=>{
	console.log(reply)
})*/
module.exports = {selectBlock}

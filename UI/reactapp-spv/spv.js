const {getBranch} = require("./fullNode");
const merkle = require("merkle");
const fs = require("fs")
var crypto = require("crypto")

const checkBranch = async(reply) => {
	const branch = reply.data.branch;		
	return new Promise((resolve, reject) => {
		var hash1 = crypto.createHash('sha256');		
		var transactions = JSON.parse(fs.readFileSync("./src/pendingTrans.json").toString(),undefined,2);
		var trans = {};
		for(let i in transactions){
			if(reply.data.landID == transactions[i].data.landID){
				trans = transactions[i];
				break;
			}
		}
//		hash1.update(JSON.stringify(trans)); // hash of first transaction(to verify)
		var hashTrans = merkle("sha256").sync([JSON.stringify(trans,undefined,2)]).root()
		console.log("t",hashTrans)
		
		if(reply.data.branch === "Single Transaction"){
	   		if(hashTrans.toUpperCase() === reply.data.header.hashMerkleRoot){
	   			console.log("Merry Chritsmas Transation Verified");
	    	    var transList = JSON.parse(fs.readFileSync("./src/transList.json").toString());               
	    	    transList.push(trans)
	    	    fs.writeFileSync("./src/transList.json", JSON.stringify(transList,undefined,2));   		
	   			resolve(true);
	   		}
			else{
				console.log("A",calculatedHash)
				console.log("B",reply.data.header.hashMerkleRoot)
				resolve(false);
			}
		}

		var last = hashTrans;
		var calculatedHash = "";
		for(var i=0; i< branch.length ; i++){
			var hash = crypto.createHash('sha256');
			if(branch[i].hash == last){
				continue;
			}
			if(branch[i].position == "right")
				hash.update((last.toUpperCase()) + branch[i].hash);
			else if(branch[i].position == "left")
				hash.update((branch[i].hash + last.toUpperCase()));
			calculatedHash = hash.digest('hex');
			last = calculatedHash;
		    console.log("l",last ,"b", branch[branch.length - 1]);
		    //hash.end();
		    delete hash;
		}
	   	if(calculatedHash.toUpperCase() === reply.data.header.hashMerkleRoot){
	   		console.log("Merry Chritsmas Transation Verified");
	        var transList = JSON.parse(fs.readFileSync("./src/transList.json").toString());               
	        transList.push(trans)
	        fs.writeFileSync("./src/transList.json", JSON.stringify(transList,undefined,2));   		
	   		resolve(true);
	   	}
		else{
			console.log("A",calculatedHash)
			console.log("B",reply.data.header.hashMerkleRoot)
			resolve(false);
		}
	})	
};

module.exports = {checkBranch}



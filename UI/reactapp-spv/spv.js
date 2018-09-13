const {getBranch} = require("./fullNode");
var crypto = require("crypto")

const checkBranch = async(reply) => {
	const branch = reply.data.branch;		
	return new Promise((resolve, reject) => {
	var hash1 = crypto.createHash('sha256');		
	var trans = JSON.parse(fs.readFileSync("./pendingTrans.json").toString(),undefined,2);
	hash1.update(trans); // hash of first transaction(to verify)
	var hashTrans = hash1.digest("hex");

	var last = hashTrans;
	var calculatedHash = "";
	for(var i=0; i< branch.length - 1; i++){
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
	    hash.end();
	    delete hash;
	}
   	if(calculatedHash.toUpperCase() == reply.data.header.hashMerkleRoot)
   		console.log("Merry Chritsmas Transation Verified");
        var transList = JSON.parse(fs.readFileSync("./transList.json").toString());               
        transList.push(trans)
        fs.writeFileSync("./transaList.json", JSON.stringify(transList,undefined,2));   		
   		resolve(true);
   	});
	else{
		resolve(false);
	}
};



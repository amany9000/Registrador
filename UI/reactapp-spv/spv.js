const {getBranch} = require("./fullNode");
var crypto = require("crypto")

const checkBranch = async(branch) => {
			
	return new Promise((resolve, reject) => {
	var hashTrans = JSON.parse(fs.readFileSync("./pendingTrans.json").toString(),undefined,2); // hash of first transaction(to verify)
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
   	if(calculatedHash.toUpperCase() == branch[-1])
   		console.log("Merry Chritsmas Transation Verified");
   		resolve(true);
   	});
	else{
		resolve(false);
	}
};



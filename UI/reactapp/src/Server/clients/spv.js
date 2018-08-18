const {getBranch} = require("./fullNode");
const readline = require('readline');
var crypto = require("crypto")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the Buyer whose transaction will be verified - ", (buyer) => {

	getBranch(buyer,(branch) => {
			var hashTrans = '6E1EC1E1E491C492D7ECFB73C9AA3C4560444AF3518D0735C4C51193746DDE7F'; // hash of first transaction(to verify)
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
			    console.log("l",last ,"b", branch[i]);
			    hash.end();
			    delete hash;
			}

    		if(calculatedHash.toUpperCase() == branch[3])
    			console.log("Merry Chritsmas Transation Verified");
    		});

  rl.close();
});




var {getLand, getUser} = require("./db/getDoc");

transactionList = [ '{\n  "class": "transaction",\n  "timeStamp": 1234,\n  "landID": "land2345",\n  "from": [\n    "User1"\n  ],\n  "to": [\n    "User1"\n  ],\n  "amount": "1342"\n}',
  '{\n  "class": "transaction",\n  "timeStamp": "1234512",\n  "landID": "land67",\n  "from": [\n    "User2"\n  ],\n  "to": [\n    "User2"\n  ],\n  "amount": "134"\n}' ];

var transactionVerify = async (transactionList, callback) => {
	
	var landIDs  = [];
	var trans = [];
	var owners = [];
	var buyers = [];
	
	for (var i in transactionList){
		var transaction = JSON.parse(transactionList[i]);
		trans.push(transaction);
		// timeStamp is less than the current time
		var currentTime = new Date().getTime();	
		if(currentTime < transaction.timeStamp){
			return callback("Timestamp isn't correct");
		}
		
		//Signature is correct
		if(!blockSigVerify(receivedBlock))
			return callback("Signature Not Valid");
		
		landIDs.push(transaction.landID);
		
		for(var j in transaction.from){
			if(owners.indexOf(transaction.from[j]) == -1)
				owners.push(transaction.from[j]);
		}
		
		for(var j in transaction.to){
			if(buyers.indexOf(transaction.to[j]) == -1)
				buyers.push(transaction.to[j]);
		}		
	}

			// land exits in the db and is owned by the "from" users
	await getLand(landIDs, (landList) => {
		var validOwner = false;
		if(!landList || landList.length == 0)
			return callback("Land not found");				
		for(var i in landList){	
			validOwner = false;
			for(var j in trans){
				if(trans[j].landID == landList[i].id && (trans[j].from.every((u,k) => {return u == landList[i].owner[k]}))){
					validOwner = true;
					break;
				}
			}
			if(!validOwner)
				return callback("Owner Not Correct")	
		}
	});
	
	// "from" users exist and (jointly) own the land
	await getUser(owners, (userList) => {
		
		var validOwner = false;
		if(!userList || userList.length == 0)
			return callback("Seller(s) not found");				
		
		for(var i in trans){	
			validOwner = false;
			for(var j in userList){
				for(var k in trans[i].from){
					if(trans[i].from[k] == userList[j].publicKey && (userList[j].currentAssets.includes(trans[i].landID))){
						validOwner = true;
						break;
					}
				}
			}
			if(!validOwner)
				return callback("Land isn't owned by the Seller(s)");	
		}		
	});

	// "to" users exist
	await getUser(buyers, (userList) => {

		var validOwner = false;
		if(!userList || userList.length == 0 || (userList.length != buyers.length)){
			return callback("Buyer(s) not found");						 	
		}
	});	
}

module.exports = {transactionVerify}
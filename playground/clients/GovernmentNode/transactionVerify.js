
var {getLand, getUser} = require("./db/getDoc");

var transactionVerify = async (transactionList, callback) => {
	
	var landIDs  = [];
	var trans = [];
	var owners = [];
	var buyers = [];
	console.log("trans",transactionList)
	/*for(var i in transactionList){
		transactionList[i] = JSON.parse(transactionList[i]); 
	}*/
	var returnBool = Array(transactionList.length).fill(true);
	if(!Array.isArray(transactionList) || transactionList.length == 0){
		console.log("Transaction not present");
		return callback(returnBool.fill(false,0));
	}	
	
	for (var i in transactionList){
		
		if(!returnBool){
			continue;
		}
		var transaction = transactionList[i];
		// timeStamp is less than the current time
		var currentTime = new Date().getTime();	
		if(transaction.timeStamp == undefined || transaction.timeStamp === null || currentTime < transaction.timeStamp ){
			returnBool[i] = false;
			console.log("Timestamp isn't correct");
        }
		
		if(transaction.landID== undefined || transaction.landID == null){
			returnBool[i] = false;			
		}
		if(transaction.from== undefined || transaction.from == null || transaction.from.length == 0){
			returnBool[i] = false;
		}
		if(transaction.to== undefined || transaction.to == null || transaction.to.length == 0){
			returnBool[i] = false;			
		}
		if(transaction.class != "transaction" || transaction.amount == undefined || transaction.amount == null){
			returnBool[i] = false;
		}
		trans.push(transaction);
		//Signature is correct
		/*if(!blockSigVerify(receivedBlock)){
			returnBool[i] = false;			
			console.log("Signature Not Valid");
			}*/

		
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
		
		var validTrans = false;
		if(!landList || landList.length == 0){
			return callback(returnBool.fill(false,0))
			console.log("Land not found");				
		}
		
		for(var i in trans){		
			if(!returnBool[i])
				continue;
			validTrans = false;
			for(var j in landList){
				if(trans[i].landID == landList[j].id && (trans[i].from.every((u,k) => {return u == landList[j].owner[k]}))){
					validTrans = true;
					break;
				}
			}
			if(!validTrans){
				returnBool[i] = false;
				console.log("Land and Owner Don't match. Trancation No. ",i)	
			}
		}
	});
	
	// "from" users exist and (jointly) own the land
	await getUser(owners, (userList) => {
		

		if(!userList || userList.length == 0){
			return callback(returnBool.fill(false,0));
			console.log("Seller(s) not found");				
		}
		
		for(var i in trans){	
			if(!returnBool[i])
				continue;
			var validTrans = true;
			
			for(var j in trans[i].from){
				var validseller = false;
				for(var k in userList){
					if(trans[i].from[j] == userList[k].publicKey && (userList[k].currentAssets.includes(trans[i].landID))){
						validseller = true;
						break;
					}
				}
				if(!validseller){
					validTrans = false;
					break;
				}
			}
			if(!validTrans){
				returnBool[i] = false;
				console.log("Land and Owner Don't match. Trancation No. ",i);	
			}
		}		
	});

	// "to" users exist
	await getUser(buyers, (userList) => {


		if(!userList || userList.length == 0){
			return callback(returnBool.fill(false,0));
			console.log("Buyer(s) not found");						 	
		}
		
		else if(userList.length != buyers.length){
		
			for(var i in trans){	
				if(!returnBool[i])
					continue;
				var validTrans = true;
				for(var j in trans[i].to){
					var validBuyer = false;
					for(var k in userList){
						if(trans[i].to[j] === userList[k].publicKey){
							validBuyer = true;
							break;
						}
					}
					if(!validBuyer){
						validTrans = false;
						break;
					}
				}
				if(!validTrans){
					returnBool[i] = false;
					console.log("Buyer(s) doesn't exist. Transaction No. ",i);	
				}
			}
		}
	});
	return callback(returnBool);
}
/*
transactionVerify([{
			class: "transaction",
			timeStamp: 31456,
			landID: "land2345",
			from: ["User1"],
			to: ["User2"],
			amount: 90123213 
		},{
			class: "transaction",
			timeStamp: 12345,
			landID: "land67",
			from: ["User2"],
			to: ["User1"],
			amount: 345 
		}],(reply) => {
	console.log("rep",reply);
});
*/
module.exports = {transactionVerify};

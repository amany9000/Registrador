
const fs = require("fs");
var {getLand, getUser} = require("./db/getDoc");

var transactionVerify = async (transactionList, callback) => {
	
	var landIDs  = [];
	var trans = [];
	var owners = [];
	var buyers = [];
	//console.log("trans",transactionList)
	/*for(var i in transactionList){
		transactionList[i] = JSON.parse(transactionList[i]); 
	}*/
	var returnBool = Array(transactionList.length).fill(true);
    var pendingList = (fs.readFileSync("./clients/GovernmentNode/pendingList.log").toString()).split(",");                
  	if(pendingList.indexOf('') != -1){
        pendingList.splice(pendingList.indexOf(''),1)
    }

	for(var i in transactionList){
		for(j in pendingList){
			if(transactionList[i].data.landID === pendingList[j]){
				returnBool[i] = false;
				break;
			}
		}
	}	
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
		if(transaction.data.timeStamp == undefined || transaction.data.timeStamp === null || currentTime < transaction.data.timeStamp ){
			returnBool[i] = false;
			console.log("Timestamp isn't correct",transaction.data);
        }
		
		if(transaction.data.landID== undefined || transaction.data.landID == null){
			returnBool[i] = false;			
		}
		if(transaction.data.from== undefined || transaction.data.from == null || transaction.data.from.length == 0){
			returnBool[i] = false;
		}
		if(transaction.data.to== undefined || transaction.data.to == null || transaction.data.to.length == 0){
			returnBool[i] = false;			
		}
		if(transaction.class != "transaction" || transaction.data.amount == undefined || transaction.data.amount == null){
			returnBool[i] = false;
		}
		trans.push(transaction);
		//Signature is correct
		/*if(!blockSigVerify(receivedBlock)){
			returnBool[i] = false;			
			console.log("Signature Not Valid");
			}*/

		
		landIDs.push(transaction.data.landID);
		
		for(var j in transaction.data.from){
			if(owners.indexOf(transaction.data.from[j]) == -1)
				owners.push(transaction.data.from[j]);
		}
		
		for(var j in transaction.data.to){
			if(buyers.indexOf(transaction.data.to[j]) == -1)
				buyers.push(transaction.data.to[j]);
		}		
	}
		// land exits in the db and is owned by the "from" users
	await getLand(landIDs, (landList) => {
							//console.log("HEYYYYYYYY",landList)
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
				if(trans[i].data.landID == landList[j].id && (trans[i].data.from.every((u,k) => {return u == landList[j].owner[k]}))){
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
			
			for(var j in trans[i].data.from){
				var validseller = false;
				for(var k in userList){
					if(trans[i].data.from[j] == userList[k].publicKey && (userList[k].currentAssets.includes(trans[i].data.landID))){
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
				for(var j in trans[i].data.to){
					var validBuyer = false;
					for(var k in userList){
						if(trans[i].data.to[j] === userList[k].publicKey){
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
transactionVerify([{ class: 'transaction',
    data:
     { timeStamp: '1234345',
       landID: 'land2345',
       from: ["User2"],
       to: ["User1"],
       amount: '12345' },
    buyerSignature: 'sig1',
    selerSignature: 'sig2' } ,{ class: 'transaction',
    data:
     { timeStamp: '1234345',
       landID: 'land67',
       from: ["User1"],
       to: ["User2"],
       amount: '12345' },
    buyerSignature: 'sig1',
    selerSignature: 'sig2' },{
      class: "transaction",
      data: {
          timeStamp: "1234345",
          landID : "land2345",
          from: ["User2"],
          to: ["User1"],
          amount: "12345",
        },
      buyerSignature: "sig1",
      selerSignature: "sig2",
      } ],(reply) => {
	console.log("rep",reply);
});
*/
module.exports = {transactionVerify};

 
var {sold} = require("./db/updateLand");
var {buyLand, sellLand} = require("./db/updateUser");
var {addBlock} = require("./db/addBlock");

var updateDB = async (recievedBlock, callback) =>{
	await addBlock(recievedBlock, (err,doc) => {
		//console.log(doc,err);
		if(err){
			return callback("Block Not Included");
		}
		else{
			callback("Block Added to the Database");
		}
	});

	var landData = [];
	var sellerData = []; 
	var buyerData = []; 
	for (var i in recievedBlock.transactionList){
		var trans = JSON.parse(recievedBlock.transactionList[i]);
		console.log(trans)
		landData.push({buyer: trans.data.to, landID: trans.data.landID, amount: trans.data.amount});
		sellerData.push({seller: trans.data.from,landID: trans.data.landID});
		buyerData.push({buyer: trans.data.to,landID:trans.data.landID});
		//console.log("main", sellerData[i],buyerData[i]);			
	}
	console.log("landData", landData)
	for(var i in landData){
		await sold(landData[i], (err, doc) =>{
			if(err){
				return callback("Can't update land collection");
			}
			else{
				callback("Land Collection Updated.");
			}				
		});				 
	}
	for(var i in sellerData){
		await sellLand(sellerData[i], (err, doc) =>{
			if(err){
				return callback("Can't update user collection");
			}
			else{
				callback("Seller's info updated");
			}
	});
		
		await buyLand(buyerData[i], (err, doc) =>{
			if(err){
				return callback("Can't update user collection");
			}
			else{
				callback("buyer's info updated");
			}	
		});				 
	}		
}
/*
updateDB({ class: 'block',
  header:
   { blockHeight: 568,
     hashPrevBlock:
      'fea8529a5e893b0bc507a2aba9c201d33885b0665d8017ee1c9f18d1dc33b16b',
     hashMerkleRoot:
      '6CBC1924435767BE98FF9B66B824FE5CED17B9B3C627C089A3CE92CDF529CBBF',
     blockTimeStamp: 1531399180434 },
  transactionCount: 2,
  transactionList:
   [ '{\n  "class": "transaction",\n  "timeStamp": 123456,\n  "landID": "land67",\n  "from": [\n    "User2"\n  ],\n  "to": [\n    "User1"\n  ],\n  "amount": 23211213\n}',
     '{\n  "class": "transaction",\n  "timeStamp": 1456,\n  "landID": "land2345",\n  "from": [\n    "User1"\n  ],\n  "to": [\n    "User2"\n  ],\n  "amount": 9012321113\n}' ],
  blockGenerator:
   '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0gv4+6ExB1KFh6AjTv5N\nVjUirfA39/bikodnmWQdsrBcCclLS2avt262M4DoWPiSgjB78be2AH4qwk2Lz7xe\ny3A+smCPfLaA5hUbwYfW1pfmrgMqXUEmpQ95vTPG21lZ246xk7Ozej4pABKlQeJw\nmZszKF5H5rI7S4XGAfpYK56163hefIQuhXmAz/ncUaLBCzxL0rS8yYyudC5z1OYd\n9Jl/KVWKJn+KvzO/jJ3FWrGA759jhdf+c8j9PJHI7uq5kVbOvCxXAgw7VzrcGOao\nWN3+Yn7ZComWS2NdDG5iTp/sZhPKxuJGc9GhIh7AA5iRQvNOuFYtmnEdQFJey2ds\nQwIDAQAB\n-----END PUBLIC KEY-----\n',
  signature:
   'WTqMyQuvgVNTztrG/FGod/P/C/or7IOklw55yNelBT8GRv0U+1kugsDDJ36/UeZbKsOT2vCpK7D2C/S6DUQlT8GfHh5z1z+3kCkaQyjh/fyDV82/LwciEb3imegMTT0hPSsIG6mWR4joHGUvMMuZj+/QF0APtR97tUOiQwyvMlzcnm7Qa+ZwV+Jl34QLzL3PWsGCfj3vhofzJw06BnyFhYLjX3ybXpscbwskJtHUHIYh8r7kO03K6VfOvrnFZJZJkJk/hcV/E4PnkppcPEpwe1zzkUzhSDxFFfsm7NM0uCcSxyF9u579Ij6I8WwW2iykneto1W81Rgza4W1UkMdqEQ==' }, (reply)=>{
	console.log(reply);
}); 
*/
module.exports = {updateDB};  

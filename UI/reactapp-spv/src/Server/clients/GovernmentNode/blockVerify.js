
var b64u =  require("b64u");
var crypto = require("crypto")

var {getUser} = require("./db/getDoc");
var {block} = require("./db/dbModels/block");
var {getMerkleTree} = require("./../merkle");
var	{transactionVerify} = require("./transactionVerify")
var {blockSigVerify} = require("./governmentNodeSig")


var blockVerify = async (receivedBlock, callback) => {
var hash = crypto.createHash('sha256');
		
	// timestamp shouldn't be greater than the current value  	
	var currentTime = new Date().getTime();	
	if(receivedBlock == null || receivedBlock.header == null || receivedBlock.header.blockTimeStamp == null || currentTime < receivedBlock.header.blockTimeStamp )
		return callback("Timestamp isn't correct ");

	// verify transactionCount is equal to length of transactionlist 
	else if(receivedBlock.transactionList.length != receivedBlock.transactionCount)
		return callback("transactionCount isn't correct");
	
	else {
		
		
		// verify if blockGenerator is a gov node 
		await getUser(receivedBlock.blockGenerator, (User)=> {
			if(!User)
				return callback("BlockGenerator Not Found");
			else if(User[0].type != 'GovNode'){
				return callback("BlockGenerator is Not a Government Node");
			}
			
			else{
		// verify signature
		if(!blockSigVerify(receivedBlock))
			return callback("Signature Not Valid");
		
		else {

			// current block's height shouldn't be in the db or higher
			block.find().sort("-header.blockHeight").exec( (err,Block) => {

				if(!Block){
					return callback("No blocks found");
				}
				else if( (Block.length>0)  && ((receivedBlock.header.blockHeight) != (Block[0].header.blockHeight + 1))){
					return callback("Block Height is incorrect");
				}
				else if((Block.Length == 0) && (receivedBlock.header.height != 0))
					return callback("Genesis Block Must have a height of 0");
				
				else{
		            // previous block's hash should be equal to prevhash 
					hash.update(JSON.stringify(Block[0],undefined,2));
					var calculatedHash = hash.digest('hex');
					if(calculatedHash != receivedBlock.header.hashPrevBlock)
						return callback("Hash of Prevoious Block Didn't Match");				
					else{
						var transList = [];
						for(var i in receivedBlock.transactionList){
							transList.push(JSON.parse(receivedBlock.transactionList[i]))
						}
						getMerkleTree(transList,(tree) => {
							if(receivedBlock.header.hashMerkleRoot != tree.root()){
								console.log(receivedBlock.header.hashMerkleRoot, tree.root())
								return callback("Hash of merkel root of transactions, didn't match");
							}
							else{
								var transList = [];
								for(var i in receivedBlock.transactionList){
									transList.push(JSON.parse(receivedBlock.transactionList[i]))
								}
								transactionVerify(transList, (reply)=>{
									console.log("trans",reply)
									var flag = true;
									for(var i in reply){
										if(!reply[i]){
											flag = false;
											break;
										}
										if(flag)
											return callback("verified")
										else
											return callback("Transaction List not correct")
									}
								});
							}	
						});
					}
				}
			});
			// hash of merkle root of transactions should be verified


			// Verify each transaction

		}
		}
	});
	}	
}

/*blockVerify({ class: 'block',
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
});*/
module.exports = {blockVerify};
 


var b64u =  require("b64u");
var crypto = require("crypto")

var {getBlock, getUser} = require("./db/getDoc");
var {block} = require("./db/dbModels/block");
var {getMerkleTree} = require("./../merkle");

var hash = crypto.createHash('sha256');

var testBlock = {
	class : "block", 
	header : {
        blockHeight   : 568,
        hashPrevBlock : "90117f54b4c9337d93495a39af0e70c687eb74dcf33b77134802f399e5fc8c98",
        hashMerkleRoot : "867DCF7B85EF7F732DF9B91094D864D35FD6AC0513BD7E56EB0D01D08B28A3FE",
        blockTimeStamp : 255443     
	},
    transactionCount : 2,
    transactionList : [ '{\n  "class": "transaction",\n  "timestamp": 1234,\n  "landID": "land2345",\n  "from": [\n    "User1"\n  ],\n  "to": [\n    "User2"\n  ],\n  "amount": "1342"\n}',
  '{\n  "class": "transaction",\n  "timestamp": "12345",\n  "landID": "land67",\n  "from": [\n    "User2"\n  ],\n  "to": [\n    "User1"\n  ],\n  "amount": "134"\n}' ],
    blockGenerator  : "User2",
    signature    :  "blockGenerator's_Signature"
}

var testBlockString = JSON.stringify(testBlock,undefined,2);
var block64 =  b64u.encode(testBlockString);

var blockVerify = async (block64,callback) => {
	
	var receivedBlockString = b64u.decode(block64);
	var receivedBlock = JSON.parse(receivedBlockString);
	
	// timestamp shouldn't be greater than the current value  	
	var currentTime = new Date().getTime();	
	if(currentTime < receivedBlock.header.blockTimeStamp)
		callback("Timestamp isn't correct");

	// verify transactionCount is equal to length of transactionlist 
	else if(receivedBlock.transactionList.length != receivedBlock.transactionCount)
		callback("transactionCount isn't correct");
	
	else {
		
		delete receivedBlock["class"];
		
		// verify if blockGenerator is a gov node 
		await getUser(receivedBlock.blockGenerator, (User)=> {
			if(!User)
				callback("BlockGenerator Not Found");
			else if(User[0].type != 'GovNode'){
				callback("BlockGenerator is Not a Government Node");
			}
		});
		
		// verify signature
		
		if(!blockSigVerify(receivedBlock))
			callback("Signature Not Valid");
		
		else {

			// current block's height shouldn't be in the db or higher
			await block.find().sort("-header.blockHeight").exec( (err,Block) => {

				if(!Block){
					callback("No blocks found");
				}
				else if( (Block.length>0)  && ((receivedBlock.header.blockHeight) != (Block[0].header.blockHeight + 1))){
					callback("Block Height is incorrect");
				}
				else if((Block.Length == 0) && (receivedBlock.header.height != 0))
					callback("Genesis Block Must have a height of 0");
				
				else{
		            // previous block's hash should be equal to prevhash 
					hash.update(JSON.stringify(Block[0],undefined,2));
					var calculatedHash = hash.digest('hex');
					if(calculatedHash != receivedBlock.header.hashPrevBlock)
						callback("Hash of Prevoious Block Didn't Match");				
				}
			});
			// hash of merkle root of transactions should be verified
			await getMerkleTree(receivedBlock.transactionList,(tree) => {
				if(receivedBlock.header.hashMerkleRoot != tree.root())
					callback("Hash of merkel root of transactions, didn't match");
			});

			// Verify each transaction
			// await transactionVerify(receivedBlock.transactionlist, ()=>{});
		}
	}	
}
 

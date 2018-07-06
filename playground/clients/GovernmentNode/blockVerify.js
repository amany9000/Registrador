
var b64u =  require("b64u");

var {getBlock, getUser} = require("./db/getDoc");
var {block} = "./db/dbModels/block.js";
var {mongoose} = require("./db/mongoose.js");

var testBlock = {
	class : "block", 
	header : {
        blockHeight   : 567,
        hashPrevBlock : "dips",
        hashMerkleRoot : "hASH",
        blockTimeStamp : 7890765     
	},
	blockSize : 52,
    transactionCount : 3,
    transactionList : ["trans4","trans4","trans6"],
    blockGenerator  : "User2",
    signature    :  "blockGenerator's_Signature"
}
var testBlockString = JSON.stringify(testBlock);
var block64 =  b64u.encode(testBlockString);

//var blockVerify = async (block64,callback){
	
	var receivedBlockString = b64u.decode(block64);
	var receivedBlock = JSON.parse(receivedBlockString);
	delete receivedBlock["class"];
	
	// verify if blockGenerator is a gov node 
	getUser(receivedBlock.blockGenerator, (User)=> {
		if(!User)
			console.log("BlockGenerator Not Found");
		else if(User[0].type != 'GovNode'){
			console.log("BlockGenerator is Not a Government Node");
		}
	});
	
	// verify signature
	
	/*if(!blockSigVerify(receivedBlock))
		callback("Signature Not Valid");
	
	else*/ {
		
		// current block's height shouldn't be in the db or higher
		block.find().sort("header.blockHeight").exec( (err,Block) => {
			console.log(Block);
		}); 		
	}

	

//}
 
// (current blockheight -1)'s hash should be equal to prevhash 
// hashofmerkeet root should be verified
// timestamp shouldn's be greater than the current timestamp 
// verify blocksize, using sizeof()
// verify transactionCount is equal to length of transactionlist 
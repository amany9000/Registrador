
var b64u =  require("b64u");

var {block}  = require("./dbModels/block.js");
var {mongoose} = require("./mongoose.js");

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
    blockGenerator  : "GovGuy's_Public_Key",
    signature    :  "blockGenerator's_SIgnature"
}
var testBlockString = JSON.stringify(testBlock);
var block64 =  b64u.encode(testBlockString);

//var addBlock = (block64) => {
	var receivedBlockString = b64u.decode(block64);
	var receivedBlock = JSON.parse(receivedBlockString);
	
	delete receivedBlock["class"];
	
	var newBlock = new block(receivedBlock);
	
	newBlock.save().then((doc) => {
		return doc;
	}, (e) => {
		return e;
	});
//}

//module.exports = {addBlock};	
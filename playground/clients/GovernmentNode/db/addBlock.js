
var b64u =  require("b64u");

var {block}  = require("./dbModels/block.js");
var {mongoose} = require("./mongoose.js");

var testBlock = {
	class : "block", 
	header : {
        blockHeight   : 565,
        hashPrevBlock : "bips",
        hashMerkleRoot : "hash2",
        blockTimeStamp : 3234342432     
	},
    transactionCount : 2,
    transactionList : ["Trans99","Trans100"],
    blockGenerator  : "GovGuy's_Public_Key2",
    signature    :  "blockGenerator's_SIgnature2"
}
var testBlockString = JSON.stringify(testBlock);
var block64 =  b64u.encode(testBlockString);

//var addBlock = (block64) => {
	var receivedBlockString = b64u.decode(block64);
	var receivedBlock = JSON.parse(receivedBlockString);
	
	delete receivedBlock["class"];
	
	var newBlock = new block(receivedBlock);
	
	newBlock.save().then((doc) => {
		console.log(doc);
	}, (e) => {
		console.log(e);
	});
//}

//module.exports = {addBlock};	
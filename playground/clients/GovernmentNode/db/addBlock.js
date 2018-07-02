
var {block}  = require("./dbModels/block.js");
var {mongoose} = require("./mongoose.js");

var newBlock = new block({
	header : {
        blockHeight   : 123,
        hashPrevBlock : "dipu",
        hashMerkleRoot : "SomehASH",
        blockTimeStamp : 98765     
	},
	blockSize : 56,
    transactionCount : 3,
    transactionList : ["trans1","trans2","trans3"],
    blockGenerator  : "GovGuy's_Public_Key"
});

newBlock.save().then((doc) => {
	console.log(doc);
}, (e) => {
	console.log(e);
});
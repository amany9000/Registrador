 
var b64u =  require("b64u");

var {block}  = require("./dbModels/block.js");
var {mongoose} = require("./mongoose.js");

var addBlock = async (receivedBlock, callback) => {
		
	var newBlock = new block(receivedBlock);	
	await newBlock.save().then((doc) => {
		return callback (undefined, doc);
	}, (e) => {
		return callback(e,undefined);
	});
}

module.exports = {addBlock};	
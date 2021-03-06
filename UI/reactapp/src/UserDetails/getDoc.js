
var {mongoose} = require("../Server/clients/GovernmentNode/db/mongoose.js");
var {block}  = require("../Server/clients/GovernmentNode/db/dbModels/block.js");
var {user}  = require("../Server/clients/GovernmentNode/db/dbModels/user.js");
var {land}  = require("../Server/clients/GovernmentNode/db/dbModels/land.js");

/*var userPublicKey = "User1";
var blockHeight = 567;
var landID = "land2345";
*/
var getUser = async (userPublicKey, callback)=>{
	await user.find({publicKey: userPublicKey}).then((doc) =>{
	if(doc.length == 0){
			callback(null);
		}	
		else
			callback(doc);
	}, (e) => {callback(e)});
};

var getBlock = async (blockHeight, callback)=>{
	await block.find({"header.blockHeight": blockHeight}).then((doc) =>{
		if(doc.length == 0){
			callback(null);
		}	
		else
			callback(doc);
	}, (e) => {callback(e)});
};

var getLand = async (landID, callback)=>{
	await land.find({id : landID}).then((doc) =>{
		
		if(doc.length == 0){
		return callback(null);
		}	
		return callback(doc);
	}, (e) => {callback(e)});
}; 

module.exports = {getLand, getBlock, getUser};
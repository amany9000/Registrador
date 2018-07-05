
var {mongoose} = require("./mongoose.js");
var {block}  = require("./dbModels/block.js");
var {user}  = require("./dbModels/user.js");
var {land}  = require("./dbModels/land.js");

var userPublicKey = "User1";
var blockHeight = 567;
var landID = "land2345";

//var getUser = (userID)=>{
	user.find({publicKey: userPublicKey}).then((doc) =>{
		if(doc.length == 0)
			return null;
		return doc;
	}, (e) => {return e});
//};

//var getBlock = (blockID)=>{
	block.find({"header.blockHeight": blockHeight}).then((doc) =>{
		if(doc.length == 0)
			return null;
		return doc;
	}, (e) => {return e});
//};

//var getLand = (landID)=>{
	land.find({id : landID}).then((doc) =>{
		if(doc.length == 0)
			return null;
		return doc;
	}, (e) => {return e});
//}; 

//module.exports = {getLand, getBlock, getUser};
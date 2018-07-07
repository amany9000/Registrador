
var {user}  = require("./dbModels/user.js");
var {mongoose} = require("./mongoose.js");

landID = "landID1998"
userPublicKey = "User2"
//var buyLand = (userPublicKey, landID) =>{
	user.findOneAndUpdate({publicKey : userPublicKey },
		{$push : {currentAssets : landID}},
		{new : true}).then((user) => { 
		return user;
	}).catch((e) =>{
		return e;
	});
//}

//var sellLand = (userPublicKey, landID) =>{
	user.findOneAndUpdate({publicKey : userPublicKey },
		{$pull : {currentAssets : landID} , $push : {previousAssets : landID}},
		{new : true}).then((user) => {
		return user;
	}).catch((e) => {
		return e;
	});
//} 

//module.exports = {buyLand, sellLand};
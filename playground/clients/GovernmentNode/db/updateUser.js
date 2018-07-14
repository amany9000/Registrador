 
var {user}  = require("./dbModels/user.js");
var {mongoose} = require("./mongoose.js");

var buyLand = async (buyerData, callback) =>{
	await user.findOneAndUpdate({publicKey : buyerData.buyer},
		{$push : {currentAssets : buyerData.landID}},
		{new : true}).then((user) => {
		return callback (err,undefined);
	}).catch((e) => {
		return callback (undefined,user);
	});
} 

var sellLand = async (sellerData, callback) => {
	await user.findOneAndUpdate({publicKey : sellerData.seller},
		{$pull : {currentAssets : sellerData.landID} , $push : {previousAssets : sellerData.landID}},
		{new : true}).then((user) => {
		return callback (err,undefined);
	}).catch((e) => {
		return callback (undefined,user);
	});
} 

module.exports = {buyLand, sellLand};
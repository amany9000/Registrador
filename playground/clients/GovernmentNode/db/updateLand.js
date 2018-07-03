
var {land}  = require("./dbModels/land.js");
var {mongoose} = require("./mongoose.js");


landID = "land2345";
buyerPublicKey = ["User32"];
sellerPublicKey = ["User70","User71"];	
prevOwners = [ ["User6"],["User9"],["User69"] ]
//var sold = (buyerPublicKey, sellerPublicKey, prevOwners, landID) =>{
	prevOwners.push(sellerPublicKey);

	land.findOneAndUpdate({id: landID },
	{ $set : {owner : buyerPublicKey , previousOwners : prevOwners}},
	{new : true})
	.then((land) => { 
		console.log(land);
	}).catch((e) =>{
		return e;
	});
//}

// disintegration 

// joining 
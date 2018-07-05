
var {land}  = require("./dbModels/land.js");
var {mongoose} = require("./mongoose.js");

landID = "land2345";
buyerPublicKey = ["User2"];
saleAmount = 1.23;
/*var sold = (buyerPublicKey, landID, saleAmount) =>{
	
	land.findOne({id : landID}).exec( async function (err, landFind)  {
		if(err){
			return null;
		}
		if((landFind == undefined) || (landFind == null)){
			return null;
		}
		var sellerPublicKey = landFind.owner;
		var prevOwners = landFind.previousOwners;
		prevOwners.push(sellerPublicKey);
		
		land.findOneAndUpdate({id: landID },
		{ $set : {owner : buyerPublicKey ,previousOwners : prevOwners ,lastSellingPrice : saleAmount }},
		{new : true}).exec( function (err,landUpdate) {
			if(err){
				return null;
			}
			return landUpdate;		
		});
	});
}*/

var latLong1 = [{latitude : "47.47", longitude : "89.98"},{latitude : "65.76", longitude : "23.32"}];
var newOwner1 = ["User47"];
var  amount1  = 46.9;
var landID1   = "land23";
var  latLong2 = [{latitude : "6666.7", longitude : "900.76"},{latitude : "789.76", longitude : "4554.34"}];
var  newOwner2 = ["User69"];
var  amount2 = null;
var landID2  = "land45";
var  originalLandID = "land2345";

/*var divideLand = (lantLong1, newOwner1, amount1,landID1, latLong2, newOwner2, amount2,landID2, originalLandID) => {
	land.findOne({id : originalLandID}).exec( async function (err, landFind)  {
		if(err){
			return null;
		}
		if((landFind == undefined) || (landFind == null)){
			return landFind;
		}
		
		var sellerPublicKey = landFind.owner;
		var prevOwners = landFind.previousOwners;
		prevOwners.push(sellerPublicKey);
		
		var land1 = {
			id : landID1,
			lastSellingPrice : amount1,
			previousOwners : prevOwners.slice(0),
			owner : newOwner1,
			latLong : latLong1,
			previousLandID : originalLandID,
			address : landFind.address
		}
		var land2 = {
			id : landID2,
			lastSellingPrice : amount2,
			owner : newOwner2,
			latLong : latLong2,
			previousLandID : originalLandID,
			previousOwners : prevOwners.slice(0),
			address : landFind.address
		}

		if((amount2 == null) && ((newOwner2.length == sellerPublicKey.length) && 
			(newOwner2.every((u,i) => {return u = sellerPublicKey[i];})))){
			land2.previousOwners.pop();
		}
		else if((amount1 == null) && ((newOwner1.length == sellerPublicKey.length) && 
			(newOwner1.every((u,i) => {return u = sellerPublicKey[i];})))){
			land1.previousOwners.pop();
		}
		
		var newLand1 = new land(land1);
		newLand1.save();
		
		var newLand2 = new land(land2);
		newLand2.save();
		
		land.findOneAndUpdate({id: originalLandID },
		{ $set : {owner : null, previousOwners : prevOwners}},
		{new : true}).exec( function (err, landUpdate) {
			if(err){
				return null;
			}
			 return landUpdate;		
		});
	});	
} */ 

var originalLandID1 = "land23";
var originalLandID2 = "land45";
var newLatLong = [{latitude : "7647.47", longitude : "89.98"},{latitude : "7665.76", longitude : "4523.32"}]
var newLandID = "land67";
var saleAmount1 = 23.432;
var saleAmount2 = 6578567.4;

//var joinLand = (originalLandID1, saleAmount1, originalLandID2, saleAmount2, newLatLong, newLandID, buyerPublicKey) => {
	land.findOne({id : originalLandID1}).exec( async function (err, landFind)  {
		if(err){
			return null;
		}
		if((landFind == undefined) || (landFind == null)){
			return null;
		}
		var sellerPublicKey = landFind.owner;
		var prevOwners = landFind.previousOwners;
		prevOwners.push(sellerPublicKey);
		
		var newLand = new land ({
			latLong : newLatLong,
			id : newLandID,
			address : landFind.address.slice(0),
			owner : buyerPublicKey,
			lastSellingPrice : null,
			previousOwners : null,
			previousLandID : [originalLandID1 , originalLandID2]  
		});

		newLand.save();

		land.findOneAndUpdate({id: originalLandID1 },
		{ $set : {owner : null ,previousOwners : prevOwners, lastSellingPrice : saleAmount1}},
		{new : true}).exec( function (err,landUpdate) {		
		});
	});

	land.findOne({id : originalLandID2}).exec( async function (err, landFind)  {
		if(err){
			return null;
		}
		if((landFind == undefined) || (landFind == null)){
			return null;
		}
		var sellerPublicKey = landFind.owner;
		var prevOwners = landFind.previousOwners;
		prevOwners.push(sellerPublicKey);
		
		land.findOneAndUpdate({id: originalLandID2 },
		{ $set : {owner : null, previousOwners : prevOwners, lastSellingPrice: saleAmount2}},
		{new : true}).exec( function (err,landUpdate) {
			if(err){
				return null;
			}
			return landUpdate;		
		});
	});
//}

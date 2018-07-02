
var {land}  = require("./dbModels/land.js");
var {mongoose} = require("./mongoose.js");

var newland = new land({
	id : "land1",
    latLong : {
    	latitude : "45.232432",
    	longitude : "49.23412"
    },
    address : "IIITV Gandhinagar",
    owner : ["User1"],
    prevOwners : ["User4", "User5"],
    lastSellingPrice : 234234.67
});

newland.save().then((doc) => {
	console.log(doc);
}, (e) => {
	console.log(e);
});
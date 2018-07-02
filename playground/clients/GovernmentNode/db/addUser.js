
var {user}  = require("./dbModels/user.js");
var {mongoose} = require("./mongoose.js");

var newUser = new user({
	publicKey : "User1",
    type  : "GovNode",
    currentAssets : ["landID1","landID2","landID3"],
    previousAssets : ["landID4", "landID5"]
});

newUser.save().then((doc) => {
	console.log(doc);
}, (e) => {
	console.log(e);
});
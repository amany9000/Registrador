
var b64u = require("b64u");

var {user}  = require("./dbModels/user.js");
var {mongoose} = require("./mongoose.js");

var testUser = {
    class : "user",
    publicKey : "User2",
    type  : "GovNode",
    currentAssets : ["landID6","landID7","landID8"],
    previousAssets : ["landID9", "landID10"]
}

var testUserString = JSON.stringify(testUser);
var user64 =  b64u.encode(testUserString);

//var addUser = (user64) => {
    var receivedUserString = b64u.decode(user64);
    var receivedUser = JSON.parse(receivedUserString);
    delete receivedUser["class"];
    var newUser = new user(receivedUser);
    
    newUser.save().then((doc) => {
    	return doc;
    }, (e) => {
    	return e;
    });
//}    

//module.exports = {addUser}; 
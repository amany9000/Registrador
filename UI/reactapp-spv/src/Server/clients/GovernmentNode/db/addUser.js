
var b64u = require("b64u");

var {user}  = require("./dbModels/user.js");
var {mongoose} = require("./mongoose.js");

var testUser = {
    class : "user",
    publicKey : "User4",
    type  : "GovNode",
    currentAssets : ["land23"],
    previousAssets : ["landID9123", "landID1401"]
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
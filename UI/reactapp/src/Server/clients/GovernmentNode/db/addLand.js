
var b64u =  require("b64u");

var {land}  = require("./dbModels/land.js");
var {mongoose} = require("./mongoose.js");

var testLand = {
    class : "land",
    id : "land23",
    latLong :[
        {
            latitude : "123132312.23",
            longitude : "43243.32"
        },{
            latitude : "12.2323456789",
            longitude : "4.3"
        }
    ],
    address : "IIIT LKO", 
    owner : ["User109"],
    previousOwners : [],
    lastSellingPrice : 1234567.8,
    previousLandID : ["landID3"]  
}

var testLandString = JSON.stringify(testLand);
var land64 =  b64u.encode(testLandString);

//var addLand = (land64) => {
	var receivedLandString = b64u.decode(land64);
	var receivedLand = JSON.parse(receivedLandString);
	delete receivedLand["class"];
	var newland = new land(receivedLand);
	
	newland.save().then((doc) => {
		console.log(doc)
        return doc;
	}, (e) => {
        console.log(e)
		return e;
	});
//}

//module.exports = {addLand};	
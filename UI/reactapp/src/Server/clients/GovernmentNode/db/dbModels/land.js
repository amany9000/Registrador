var mongoose = require("mongoose");

var latLong = new mongoose.Schema({
        latitude   : {
        type: String,
        required :true,
        minlength : 1,
    },
        longitude : {
        type: String,
        required :true,
        minlength : 1,
    }    
});

var Land = new mongoose.Schema({
    latLong : [latLong],
    id : {
        type: String,
        required :true,
        minlength : 1,
        unique : true
    },
    address : {
        type: String,
        required :true,
        minlength : 1,
    },
    owner : {
        type: [String],
        minlength : 1,
    },
    previousOwners  : {
        type: [[String]],
        minlength : 1,
    },
    lastSellingPrice  : {
        type: mongoose.Schema.Types.Decimal128,
        minlength : 1,
    },
    previousLandID : {
        type: [String],
        required :true,
        minlength : 1,
    }   
}); 

var land = mongoose.model("land",Land);
module.exports = {land}
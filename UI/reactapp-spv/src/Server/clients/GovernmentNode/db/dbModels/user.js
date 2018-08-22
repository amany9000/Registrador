var mongoose = require("mongoose");

var User = new mongoose.Schema({
    publicKey : {
        type: String,
        required :true,
        minlength : 1,
        unique : true
    },
    type : {
        type: String,
        required :true,
        minlength : 1,
    },
    currentAssets : {
        type: [String],
        required :true,
        minlength : 1,
    },
    previousAssets  : {
        type: [String],
        required :true,
        minlength : 1,
    }   
}); 

var user = mongoose.model("user",User);
module.exports = {user}
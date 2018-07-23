var mongoose = require("mongoose");

var blockHeader = new mongoose.Schema({
        blockHeight   : {
        type: Number,
        required :true,
        minlength : 1,
        unique : true,
    },
        hashPrevBlock : {
        type: String,
        minlength : 1,
        unique : true
    },
        hashMerkleRoot : {
        type: String,
        required :true,
        minlength : 1,
        unique : true
    },
        blockTimeStamp : {
        type: Number,
        required :true,
        minlength : 1,
        unique : true
    }    
});

var Block = new mongoose.Schema({
    class : {
        type: String,
        required :true,
        minlength : 1,
    },    
    header : blockHeader,
    transactionCount : {
        type: Number,
        required :true,
        minlength : 1,
    },
    transactionList : {
        type: [String],
        required :true,
        minlength : 1,
        unique : true
    },
    blockGenerator  : {
        type: String,
        required :true,
        minlength : 1,
    },
    signature : {
        type: String,
        required :true,
        minlength : 1,    
    }   
}); 

var block = mongoose.model("block",Block);
module.exports = {block}
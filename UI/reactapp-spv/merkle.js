const merkle = require("merkle");

var getMerkleTree = function(transactionList,callback){
    var x = [];
    for(var i in transactionList){
        x.push(JSON.stringify(transactionList[i],undefined,2));
    } 
    
    merkle("sha256").async(x, (err,tree) => {
    if(err){
        return callback(null);
    }
    /*
    console.log("\nsha256 merkel root - ", tree.root());
    console.log("depth of the tree - ",tree.depth());
    console.log("Total no. of levels - ",tree.levels());
    console.log("total no. of nodes - ",tree.nodes());
    console.log("Level 3 of SHA256 hashes (leaves) -\n", tree.level(3))
    */
    return callback(tree);
    });
    /*
    merkle("sha512").async(x, (err,tree) => {
    console.log("\nsha512 merkel root - ", tree.root());  
    });
    */
}
/*
getMerkleTree([{ class: 'transaction',
    data:
     { timeStamp: '1234345',
       landID: 'land67',
       from: ["User2"],
       to: ["User1"],
       amount: '12345' },
    buyerSignature: 'sig1',
    selerSignature: 'sig2' } ,{ class: 'transaction',
    data:
     { timeStamp: '1234345',
       landID: 'land2345',
       from: ["User2"],
       to: ["User1"],
       amount: '12345' },
    buyerSignature: 'sig1',
    selerSignature: 'sig2' }], (tree) => {
        console.log(tree.root());
      })
 */     
module.exports = {getMerkleTree};

var params = require('webcoin-bitcoin').blockchain;
console.log(params.genesisHeader)

var levelup = require('level');
var db = levelup('bitcoin.chain', { db: require('memdown') });
var Blockchain = require('blockchain-spv');
var chain = new Blockchain(params.genesisHeader , db);
var u = require('bitcoin-util');
var newheader = [{
      version: 2,
      prevHash: u.toHash('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b'),
      merkleRoot: u.toHash('37f752dccde0e359ce5b028fed86a4e2f937e2d3091d99f795096198cbf5c67c'),
      timestamp: 1434257763,
      bits: 0x18162043,
      nonce: 1801335478
    },

{

 version: 3,
      prevHash: u.toHash('37f752dccde0e359ce5b028fed86a4e2f937e2d3091d99f795096198cbf5c67c'),
      merkleRoot: u.toHash('36f752dccde0e359ce5b028fed86a4e2f937e2d3091d99f795096198cbf5c67c'),
      timestamp: 1434257987,
      bits: 0x18162042,
      nonce: 1801367879

}


    ]


for(var head in newheader){
chain.addHeaders(head,(err, head)=>{
	if(err){
		return cb(err)
	}
});
}



for(var head in newheader){
	db.get(head,function(err,value){
		if(err){
			return cb(err)
		}
	})
}
//returns a stream that takes in the array of headers and add them to the chain




//console.log(params.genesisHeader);

chain.on('ready',function(err,chain){
if(err){

	return cb(err);
}
 
 else{
 	console.log(chain);
 	console.log(db);
 }
})


 
 
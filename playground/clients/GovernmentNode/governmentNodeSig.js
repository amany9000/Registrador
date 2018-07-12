const crypto = require('crypto');
const fs = require('fs');
const b64u = require('b64u');

const myPublicKey = fs.readFileSync('publicSeller.pem').toString();

// SENDER SIDE BUILD SIGNATURE FROM DATA FOR SENDING IN THE NETWORK

var blockSigCreate = (block) => {
    const blockString = JSON.stringify(block);
    const data = b64u.encode(blockString);
    const signSeller = crypto.createSign('SHA256');
    signSeller.update(data);
    const privateKeySeller = fs.readFileSync('privateSeller.pem').toString();
    const signatureSeller = signSeller.sign(privateKeySeller, 'base64');
    return signatureSeller;
}

var blockSigVerify = (block) => {
// Verify the signature

var signatureRecieved = block.signature;
var cloneBlock = JSON.parse(JSON.stringify(block));
delete cloneBlock["signature"];
var data = b64u.encode(JSON.stringify(cloneBlock));
const verifySeller = crypto.createVerify('SHA256');
verifySeller.update(data);

const match = verifySeller.verify(myPublicKey, signatureRecieved, 'base64');
console.log("match "+match);
return match;
}


module.exports = {blockSigCreate, blockSigVerify}

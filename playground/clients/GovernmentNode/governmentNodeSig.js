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

const match = verifySeller.verify(block.blockGenerator, signatureRecieved, 'base64');
console.log("match "+match);
return match;
}

var transSigVerify = (trans) => {
// Verify the signature

var buyerSignatureRecieved = trans.buyerSignature;
var sellerSignatureRecieved = trans.sellerSignature;

var data = b64u.encode(JSON.stringify(trans.data));

const verifySeller = crypto.createVerify('SHA256');
verifySeller.update(data);
const sellerMatch = verifySeller.verify(trans.data.from, sellerSignatureRecieved, 'base64');

const verifyBuyer = crypto.createVerify('SHA256');
verifyBuyer.update(data);
const buyerMatch = verifyBuyer.verify(trans.data.to, buyerSignatureRecieved, 'base64');

return sellerMatch && buyerMatch;
}

var escrowTransSigVerify = (trans) => {
  // Verify the signature
  
  var buyerSignatureRecieved = trans.buyerSignature;
  var sellerSignatureRecieved = trans.sellerSignature;
  var escrowSignatureRecieved = trans.escrowSignature;
  
  var data = b64u.encode(JSON.stringify(trans.data));
  
  const verifySeller = crypto.createVerify('SHA256');
  verifySeller.update(data);
  const sellerMatch = verifySeller.verify(trans.data.from, sellerSignatureRecieved, 'base64');
  
  const verifyBuyer = crypto.createVerify('SHA256');
  verifyBuyer.update(data);
  const buyerMatch = verifyBuyer.verify(trans.data.to, buyerSignatureRecieved, 'base64');
  
  const verifyEscrow = crypto.createVerify('SHA256');
  verifyEscrow.update(data);
  const escrowMatch = verifyEscrow.verify(trans.data.escrow, escrowSignatureRecieved, 'base64');

  return sellerMatch && buyerMatch && escrowMatch;
}

var joinTransSigVerify = (trans) => {
  // Verify the signature
  
  var buyerSignatureRecieved = trans.buyerSignature;
  var seller1SignatureRecieved = trans.sellerSignature1;
  var seller2SignatureRecieved = trans.sellerSignature2;
  
  var data = b64u.encode(JSON.stringify(trans.data));
  
  const verifySeller1 = crypto.createVerify('SHA256');
  verifySeller1.update(data);
  const sellerMatch1 = verifySeller1.verify(trans.data.from1, seller1SignatureRecieved, 'base64');
  
  const verifySeller2 = crypto.createVerify('SHA256');
  verifySeller2.update(data);
  const sellerMatch2 = verifySeller2.verify(trans.data.from2, seller2SignatureRecieved, 'base64');
  
  const verifyBuyer = crypto.createVerify('SHA256');
  verifyBuyer.update(data);
  const buyerMatch = verifyBuyer.verify(trans.data.to, buyerSignatureRecieved, 'base64');

  return sellerMatch1 && sellerMatch2 && buyerMatch;
}


var breakTransSigVerify = (trans) => {
  // Verify the signature
  
  var buyer1SignatureRecieved = trans.buyerSignature1;
  var buyer2SignatureRecieved = trans.buyerSignature2;
  var sellerSignatureRecieved = trans.sellerSignature;
  
  var data = b64u.encode(JSON.stringify(trans.data));
  
  const verifySeller = crypto.createVerify('SHA256');
  verifySeller.update(data);
  const sellerMatch = verifySeller.verify(trans.data.from, sellerSignatureRecieved, 'base64');
  
  const verifyBuyer1 = crypto.createVerify('SHA256');
  verifyBuyer1.update(data);
  const buyerMatch1 = verifyBuyer1.verify(trans.data.to1, buyer1SignatureRecieved, 'base64');
  
  const verifyBuyer2 = crypto.createVerify('SHA256');
  verifyBuyer2.update(data);
  const buyerMatch2 = verifyBuyer2.verify(trans.data.to2, buyer2SignatureRecieved, 'base64');

  return sellerMatch && buyerMatch1 && buyerMatch2;
}

/*
console.log(blockSigCreate({
        class: "block",
        header: {
          blockHeight: 570,
          hashPrevBlock: "c9e6d5695a81e3eab3573b5d4454ada5deb1272af7fa2e8af555b8a4876d6ff6",
          hashMerkleRoot: "EA39237351E74DE296CA0B4308570D37502EB624805629917AAFA085B04402F8",
          blockTimeStamp: 1532701980760
        },
        transactionCount: 2,
        transactionList: [ '{\n  "class": "transaction",\n  "data": {\n    "timeStamp": "1234345",\n    "landID": "land67",\n    "from": [\n      "User2"\n    ],\n    "to": [\n      "User1"\n    ],\n    "amount": "12345"\n  },\n  "buyerSignature": "sig1",\n  "selerSignature": "sig2"\n}',
        '{\n  "class": "transaction",\n  "data": {\n    "timeStamp": "1234345",\n    "landID": "land2345",\n    "from": [\n      "User2"\n    ],\n    "to": [\n      "User1"\n    ],\n    "amount": "12345"\n  },\n  "buyerSignature": "sig1",\n  "selerSignature": "sig2"\n}'],
        blockGenerator: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0gv4+6ExB1KFh6AjTv5N\nVjUirfA39/bikodnmWQdsrBcCclLS2avt262M4DoWPiSgjB78be2AH4qwk2Lz7xe\ny3A+smCPfLaA5hUbwYfW1pfmrgMqXUEmpQ95vTPG21lZ246xk7Ozej4pABKlQeJw\nmZszKF5H5rI7S4XGAfpYK56163hefIQuhXmAz/ncUaLBCzxL0rS8yYyudC5z1OYd\n9Jl/KVWKJn+KvzO/jJ3FWrGA759jhdf+c8j9PJHI7uq5kVbOvCxXAgw7VzrcGOao\nWN3+Yn7ZComWS2NdDG5iTp/sZhPKxuJGc9GhIh7AA5iRQvNOuFYtmnEdQFJey2ds\nQwIDAQAB\n-----END PUBLIC KEY-----\n"
      })) */

module.exports = {blockSigCreate, blockSigVerify, transSigVerify, escrowTransSigVerify, joinTransSigVerify, breakTransSigVerify}

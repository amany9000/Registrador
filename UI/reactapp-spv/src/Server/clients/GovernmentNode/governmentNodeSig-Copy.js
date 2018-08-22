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

var transSigVerify = (trans) => {
// Verify the signature

var signatureRecieved = trans.signature;

var cloneTrans = JSON.parse(JSON.stringify(trans));

delete cloneTrans["signature"];

var data = b64u.encode(JSON.stringify(cloneTrans));

const verifySeller = crypto.createVerify('SHA256');

verifySeller.update(data);

const match = verifySeller.verify(myPublicKey, signatureRecieved, 'base64');
console.log("match "+match);
return match;
}
/*
console.log(blockSigCreate({
        class: "block",
        header: {
          blockHeight: 570,
          hashPrevBlock: "c9e6d5695a81e3eab3573b5d4454ada5deb1272af7fa2e8af555b8a4876d6ff6",
          hashMerkleRoot: "F6DEF0D30CFE7EEC56550481825B1DAFFE9CBAD58F73AB4A8BB4FB0D185405B6",
          blockTimeStamp: 1532701980760
        },
        transactionCount: 3,
        transactionList: [ '{\n  "class": "transaction",\n  "data": {\n    "timeStamp": "1234345",\n    "landID": "land2345",\n    "from": [\n      "User2"\n    ],\n    "to": [\n      "User1"\n    ],\n    "amount": "12345"\n  },\n  "buyerSignature": "sig1",\n  "selerSignature": "sig2"\n}',
  '{\n  "class": "transaction",\n  "data": {\n    "timeStamp": "1234345",\n    "landID": "land67",\n    "from": [\n      "User1"\n    ],\n    "to": [\n      "User2"\n    ],\n    "amount": "12345"\n  },\n  "buyerSignature": "sig1",\n  "selerSignature": "sig2"\n}',
  '{\n  "class": "transaction",\n  "data": {\n    "timeStamp": "1234345",\n    "landID": "land2345",\n    "from": [\n      "User2"\n    ],\n    "to": [\n      "User1"\n    ],\n    "amount": "12345"\n  },\n  "buyerSignature": "sig1",\n  "selerSignature": "sig2"\n}' ],
        blockGenerator: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0gv4+6ExB1KFh6AjTv5N\nVjUirfA39/bikodnmWQdsrBcCclLS2avt262M4DoWPiSgjB78be2AH4qwk2Lz7xe\ny3A+smCPfLaA5hUbwYfW1pfmrgMqXUEmpQ95vTPG21lZ246xk7Ozej4pABKlQeJw\nmZszKF5H5rI7S4XGAfpYK56163hefIQuhXmAz/ncUaLBCzxL0rS8yYyudC5z1OYd\n9Jl/KVWKJn+KvzO/jJ3FWrGA759jhdf+c8j9PJHI7uq5kVbOvCxXAgw7VzrcGOao\nWN3+Yn7ZComWS2NdDG5iTp/sZhPKxuJGc9GhIh7AA5iRQvNOuFYtmnEdQFJey2ds\nQwIDAQAB\n-----END PUBLIC KEY-----\n"
      })) */

module.exports = {blockSigCreate, blockSigVerify,transSigVerify}

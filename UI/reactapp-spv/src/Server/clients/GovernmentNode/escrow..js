const crypto = require('crypto');
const fs = require('fs');
const b64u = require('b64u');

const publicKeySeller = fs.readFileSync('publicSeller.pem').toString();
const publicKeyBuyer = fs.readFileSync('publicBuyer.pem').toString();

///////////////////////////////////////////////////////////////////////////////
// SENDER SIDE BUILD SIGNATURE FROM DATA FOR SENDING IN THE NETWORK
const exampleData = {
    "class": "transaction",
    "timestamp": "something",
    "landID" : "someId",
    "seller": "Seller",
    "buyer": "Buyer",
    "amount": "1000"
};
const exampleDataString = JSON.stringify(exampleData);
const data = b64u.encode(exampleDataString);

const signSeller = crypto.createSign('SHA256');
signSeller.update(data);
const privateKeySeller = fs.readFileSync('privateSeller.pem').toString();
const signatureSeller = signSeller.sign(privateKeySeller, 'base64');
console.log("Signature Seller:");
console.log(signatureSeller);
console.log();

const signBuyer = crypto.createSign('SHA256');
signBuyer.update(data);
const privateKeyBuyer = fs.readFileSync('privateBuyer.pem').toString();
const signatureBuyer = signBuyer.sign(privateKeyBuyer, 'base64');
console.log("Signature Buyer:");
console.log(signatureBuyer);
console.log();;

const sendData = {
    "payload": data,
    "signatureSeller": signatureSeller,
    "signatureBuyer": signatureBuyer
};
const sendDataString = JSON.stringify(sendData);
const sendDataBase64Url = b64u.encode(sendDataString);


///////////////////////////////////////////////////////////////////////////////

const recieveDataBase64Url = sendDataBase64Url;

///////////////////////////////////////////////////////////////////////////////
// DATA RECIEVED BY NODE
const recievedDataString = b64u.decode(recieveDataBase64Url);
const recievedData = JSON.parse(recievedDataString);
console.log(recievedData)
console.log()

const signatureSellerRecieved = recievedData.signatureSeller;
const signatureBuyerRecieved = recievedData.signatureBuyer;
const payloadRecieved = recievedData.payload;
console.log("signatureSellerRecieved:");
console.log(signatureSellerRecieved);
console.log();
console.log("signatureBuyerRecieved:");
console.log(signatureBuyerRecieved);
console.log();
console.log("payloadRecieved:");
console.log(payloadRecieved);
console.log();

// Verify the signature
const verifySeller = crypto.createVerify('SHA256');
verifySeller.update(payloadRecieved);
console.log()

const verifyBuyer = crypto.createVerify('SHA256');
verifyBuyer.update(payloadRecieved);
console.log()

const matchSeller = verifySeller.verify(publicKeySeller, signatureSellerRecieved, 'base64');
console.log("match Seller: "+matchSeller);
console.log();

const matchBuyer = verifyBuyer.verify(publicKeyBuyer, signatureBuyerRecieved, 'base64');
console.log("match Buyer: "+matchBuyer);
console.log();

if( !matchSeller || !matchBuyer ) {
    // Signature incorrect
    if(!matchSeller) console.log("Signature Seller not correct\n");
    if(!matchBuyer) console.log("Signature Buyer not correct\n");
}else {
    // Signature correct
    console.log("Both signatures correct\n");
    var dataStringRecieved = b64u.decode(payloadRecieved);
    var dataJSONRecieved = JSON.parse(dataStringRecieved);
    console.log(dataJSONRecieved);
    console.log();

    // Get data from the transaction recieved
    var dataClass = dataJSONRecieved.class;
    var dataTimestamp = dataJSONRecieved.timestamp;
    var dataLandID = dataJSONRecieved.landID;
    var dataSeller = dataJSONRecieved.seller;
    var dataBuyer = dataJSONRecieved.buyer;
    var dataAmount = dataJSONRecieved.amount;
    console.log("Class of the transaction : "+dataClass);
    console.log("Timestamp of the transaction : "+dataTimestamp);
    console.log("landID of the transaction : "+dataLandID);
    console.log("Seller of the land: "+dataSeller);
    console.log("Buyer of the land : "+dataBuyer);
    console.log("Amount of the transaction : "+dataAmount);
}
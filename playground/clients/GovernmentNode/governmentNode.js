const crypto = require('crypto');
const fs = require('fs');
const b64u = require('b64u');


///////////////////////////////////////////////////////////////////////////////
// SENDER SIDE BUILD SIGNATURE FROM DATA FOR SENDING IN THE NETWORK
const exampleData = {
    "class": "transaction",
    "timestamp": "something",
    "landID" : "someId",
    "from": "Owner",
    "to": "Buyer",
    "amount": "1000"
};
const exampleDataString = JSON.stringify(exampleData);
const data = b64u.encode(exampleDataString);

const sign = crypto.createSign('SHA256');
sign.update(data);
const privateKey = fs.readFileSync('private.pem').toString();
const signature = sign.sign(privateKey, 'base64');
console.log("Signature:");
console.log(signature);
console.log();

const sendData = {
    "payload": data,
    "signature": signature
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

const signatureRecieved = recievedData.signature;
const payloadRecieved = recievedData.payload;
console.log("signatureRecieved:");
console.log(signatureRecieved);
console.log();
console.log("payloadRecieved:");
console.log(payloadRecieved);
console.log();

// Verify the signature
const verify = crypto.createVerify('SHA256');
verify.update(payloadRecieved);
const publicKey = fs.readFileSync('public.pem').toString();
console.log()
const match = verify.verify(publicKey, signatureRecieved, 'base64');
console.log("match: "+match);
console.log();

if(!match) {
    // Signature incorrect
    console.log("Signature not correct\n");
}else {
    // Signature correct
    console.log("Signature correct\n");
    var dataStringRecieved = b64u.decode(payloadRecieved);
    var dataJSONRecieved = JSON.parse(dataStringRecieved);
    console.log(dataJSONRecieved);
    console.log();

    // Get data from the transaction recieved
    var dataClass = dataJSONRecieved.class;
    var dataTimestamp = dataJSONRecieved.timestamp;
    var dataLandID = dataJSONRecieved.landID;
    var dataFrom = dataJSONRecieved.from;
    var dataTo = dataJSONRecieved.to;
    var dataAmount = dataJSONRecieved.amount;
    console.log("Class of the transaction : "+dataClass);
    console.log("Timestamp of the transaction : "+dataTimestamp);
    console.log("landID of the transaction : "+dataLandID);
    console.log("Present owner of the land: "+dataFrom);
    console.log("Buyer of the land : "+dataTo);
    console.log("Amount of the transaction : "+dataAmount);
}

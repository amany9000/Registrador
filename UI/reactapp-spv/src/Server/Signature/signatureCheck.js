const crypto = require('crypto');
const fs = require('fs');
const b64u = require('b64u');

///////////////////////////////////////////////////////////

const exampleData = {
    "title": "Person",
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string"
        },
        "lastName": {
            "type": "string"
        },
        "age": {
            "description": "Age in years",
            "type": "integer",
            "minimum": 0
        }
    },
    "required": ["firstName", "lastName"]
};

const exampleDataString = JSON.stringify(exampleData);

///////////////////////////////////////////////////////////

const data = b64u.encode(exampleDataString);

const sign = crypto.createSign('SHA256');
sign.update(data);
const privateKey = fs.readFileSync('private.pem').toString();
console.log(privateKey)
console.log()
const signature = sign.sign(privateKey, 'base64');
console.log("Signature: \n");
console.log(signature);
console.log()
console.log()

///////////////////////////////////////////////////////////

const verify = crypto.createVerify('SHA256');
verify.update(data);
const publicKey = fs.readFileSync('public.pem').toString();
console.log(publicKey)
console.log()
const match = verify.verify(publicKey, signature, 'base64');
console.log(match);

///////////////////////////////////////////////////////////

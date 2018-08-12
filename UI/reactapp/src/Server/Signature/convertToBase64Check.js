const b64u = require('b64u')

const exampleJson = {
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
console.log("exampleJson :");
console.log(exampleJson);
console.log();
console.log();


const exampleJsonB64 = b64u.encode(JSON.stringify(exampleJson));
console.log("exampleJson to string :");
console.log(JSON.stringify(exampleJson));
console.log();
console.log();
console.log("exampleJson to base64 :");
console.log(exampleJsonB64);
console.log();
console.log();

const exampleJsonOrignal = b64u.decode(exampleJsonB64);
console.log("exampleJson to orig :");
console.log(exampleJsonOrignal);
console.log();
console.log();
console.log("orignal JSON :");
console.log(JSON.parse(exampleJsonOrignal));
console.log();
console.log();

console.log(exampleJsonOrignal == (JSON.stringify(exampleJson)));
console.log(JSON.stringify(exampleJson) == JSON.stringify(JSON.parse(exampleJsonOrignal)));

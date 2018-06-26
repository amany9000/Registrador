var crypto = require('crypto')

// If need keys in base64
// crypto.DEFAULT_ENCODING = 'base64'

// If need keys in hex
crypto.DEFAULT_ENCODING = 'hex'

var user;
var userDh = crypto.createDiffieHellman(2048);
var userKey = userDh.generateKeys();
var userKeySet = {
    userPubKey: userDh.getPublicKey(),
    userPrivKey: userDh.getPrivateKey()
};

console.log("Public key:")
console.log(userKeySet.userPubKey)
console.log("Private key:")
console.log(userKeySet.userPrivKey)

var crypto = require('crypto')
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

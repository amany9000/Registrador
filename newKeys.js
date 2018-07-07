var crypto = require('crypto')
crypto.DEFAULT_ENCODING = 'hex'

var user;
var userDh = crypto.getDiffieHellman('modp2');
var userKey = userDh.generateKeys();
var userKeySet = {
    userPubKey: userDh.getPublicKey(),
    userPrivKey: userDh.getPrivateKey()
};

console.log("Public Key :")
console.log(userKeySet.userPubKey)
console.log("Length :")
console.log(userKeySet.userPubKey.length)
console.log()
console.log("Private Key :")
console.log(userKeySet.userPrivKey)
console.log("Length :")
console.log(userKeySet.userPrivKey.length)

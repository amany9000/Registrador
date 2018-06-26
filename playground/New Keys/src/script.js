const publicKey = document.getElementById('publicKey');
const privateKey = document.getElementById('privateKey');
const getKeys = document.getElementById('getKeys');

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

getKeys.onclick = function() {
    publicKey.textContent = userKeySet.userPubKey;
    privateKey.textContent = userKeySet.userPrivKey;
}

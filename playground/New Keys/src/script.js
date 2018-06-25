const publicKey = document.getElementById('publicKey');
const privateKey = document.getElementById('privateKey');
const getKeys = document.getElementById('getKeys');

var crypto = require('crypto')
crypto.DEFAULT_ENCODING = 'hex'

var user;
var userDh = crypto.getDiffieHellman('modp2');
var userKey = userDh.generateKeys();
var userKeySet = {
    userPubKey: userDh.getPublicKey(),
    userPrivKey: userDh.getPrivateKey()
};

getKeys.onclick = function() {
    publicKey.textContent = userKeySet.userPubKey;
    privateKey.textContent = userKeySet.userPrivKey;
}

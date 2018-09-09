const crypto = require('crypto');
const fs = require('fs');
const b64u = require('b64u');

var transSigCreate = async (trans) => {
	const transString = JSON.stringify(trans.data);
    const data = b64u.encode(transString);
    const signUser = crypto.createSign('SHA256');
    signUser.update(data);
    const privateKeyUser = await fs.readFileSync('private.pem').toString();
    const signatureUser = await signUser.sign(privateKeyUser, 'base64');
    return signatureUser;
} 

modules.export = {transSigCreate};
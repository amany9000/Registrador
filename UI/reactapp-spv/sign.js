const crypto = require('crypto');
const fs = require('fs');
const b64u = require('b64u');

const transSigCreate = async (trans) => {
	const transString = JSON.stringify(trans.data);
    const data = b64u.encode(transString);
    const signUser = crypto.createSign('SHA256');
    signUser.update(data);
    const privateKeyUser = await fs.readFileSync('private.pem').toString();
    const signatureUser = await signUser.sign(privateKeyUser, 'base64');
    return signatureUser;
} 
/*
const read = async ()=>{
console.log(await transSigCreate({ class: 'transaction',
  data:
   { timeStamp: 1536738266462,
     landID: 'land67',
     from:
      [ '-----BEGIN PUBLIC KEY----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAn2NG/V8gegcS5nQEALEU x20MILWUOkKmSvd43zCfO2WWUlb+q8Si/C7adHg2+35KhcpuB+t8WtVu5KmaCEtf 3HfBordD4GuG13LSa2RbVNCuEtMAs9kFGWwRhaaiA3kaIxl8Ip0csAxBuxzK+zFb JNlJ4wE8btRrFjW5iA6Qw/JTAa8fx3YK887qfDHvPuAkwTCFaCyj92UW+2Dh9n4l jnKcUuoFrjjg+xZwceGS1mXKg7xt9+yOciPX7it6EMVzvMoBEbPjdgB4YWB1Qjyt irjtr+GZ0VfmimKTnfDXFHnc4GD3n7W76+l4H4Pi6RUZSM5I5ehV5ztWvvpQ/iKx FwIDAQAB -----END PUBLIC KEY-----' ],
     to:
      [ '-----BEGIN PUBLIC KEY----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwH06hkpiKwiahkxFtNad OPjTtrueIz+/WIhQfwt4er34MT6b9DUv84CJULJNRQG64FYyqy9CGG/SNrAF43GX AuIRyPknSYPnOPWp8hfp+oYER3WCdshm5knWJBkEe8QWB6cEv9cgwtmfaONiJw4L hVw+fKRS3Sd+l7uT4q3W/4f4y0MQfRZB5CKerUHcGN3nXuH2Ld9UQ+1vsgFqmFkv E5yuSXYe8vQXwvuBn+YFIIHAtJEBcI8PBXLjGq/42O1jGCJBaKbRtGFYUehmoQvc q4vph8hTTLvU6Dv/AygjxJVshyVoBmGv7F+gY3dAdEM1R/MbNxs4bx/N5WB01LBn 7wIDAQAB -----END PUBLIC KEY-----' ],
     amount: '1234' },
  buyerSignature:
   'QMi4KYHB6VomzfxxwVgKmCUMFZ0LSaGh2F7aGUYDGuOVkJbZ5ZVf7jrdIlyya+fm5eyJsERmA7MV9zERK9KR1H070ZAUQM2Lh5eIqXnmPfRcNUwrKFvNDt2jrbXpcqw1OKbghbKX/VlYfBvX2QTPDyFaIcm9oZtYk0svUANm4NGl0Uj4IRdMoZWETsGLfJA5nN/gBJ2o84j5cfOQ7d0L5GKwsEl+OjLLNjfMkv8s7pP+LgqXXq594zj6h/O9n545xfXZg6dTk2AcVeaBKrFtsZgUjkMHyl1f8aOej2SpD21d/MD7oK2eOHkp0dK2Ej0mbh3I0alrpLCpIb3wDjsqYg==',
  sellerSignature: '' }
))	
}
//read();
*/
module.exports = {transSigCreate};
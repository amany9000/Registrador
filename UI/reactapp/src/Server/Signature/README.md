# Signature handling

## genrsanerate new public private keys

* To generate a new private key
```bash
openssl genrsa -out private.pem 2048
```

* To generate a public key associated to the private key
```bash
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```

## Understand Code [signatureCheck.js]()

* Import statements

* Take example JSON data and turn it into string

* Sign Data
    + Convert data in string to base64url form
    + Read private key from [private.pem]()
    + Sign data with private key
    + Get generated signature

* Verify signature
    + Get the data recieved
    + Read public key from [public.pem]()
    + Verify if signature matches or not

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

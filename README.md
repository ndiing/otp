# [otp](https://ndiing.github.io/otp/)
otp
### Install
```
npm install @ndiinginc/otp
```
### Usage
```js

const OTP = require('@ndiinginc/otp')

// Generate random secret
console.log(OTP.secret({encoding:'base32'}));
console.log(OTP.secret({encoding:'base64'}));
console.log(OTP.secret({encoding:'hex'}));
console.log(OTP.secret({encoding:'ascii'}));
console.log(OTP.secret({encoding:'base32', algorithm:'sha256'}));
console.log(OTP.secret({encoding:'base64', algorithm:'sha256'}));
console.log(OTP.secret({encoding:'hex', algorithm:'sha256'}));
console.log(OTP.secret({encoding:'ascii', algorithm:'sha256'}));

// Generate google authenticator
console.log(OTP.authenticator());

// Generate token
console.log(OTP.generate({
    type: "totp",
    secret: "MVEFKULLOE4HURTBIFNH",
    encoding: "base32",
    algorithm: "sha1",
}));

// Validate token
console.log(OTP.validate('745237',{
    type: "totp",
    secret: "MVEFKULLOE4HURTBIFNH",
    encoding: "base32",
    algorithm: "sha1",
}));

```
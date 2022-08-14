<a name="module_otp"></a>

## otp
### Install```npm install @ndiing/otp```### Usage```jsvar options = {    type: "totp", // default    label: "label", // default    // secret, // pass your secret / generate new    encoding: "base32", // default    issuer: "issuer", // default    algorithm: "sha1", // default    digits: 6, // default    // counter,    period: 30, // default};// Create otpauth URLconsole.log(OTP.otpauth(options));// output// {//     type: 'totp',//     label: 'label',//     encoding: 'base32',//     issuer: 'issuer',//     algorithm: 'sha1',//     digits: 6,//     counter: undefined,//     period: 30,//     secret: 'KJUGMRJWOV2VKNTXOBYE',//     otpauth: 'otpauth://totp/label?secret=KJUGMRJWOV2VKNTXOBYE&issuer=issuer&algorithm=SHA1&digits=6',//     qr: 'https://www.google.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/label?secret=KJUGMRJWOV2VKNTXOBYE&issuer=issuer&algorithm=SHA1&digits=6'//   }// Generate tokenoptions.secret='KJUGMRJWOV2VKNTXOBYE'console.log(OTP.generate(options))// Validate tokenoptions.secret='KJUGMRJWOV2VKNTXOBYE'var token = '185036'console.log(OTP.validate(token,options))```


* [otp](#module_otp)
    * [~Generator](#module_otp..Generator)
        * [.hotp(options)](#module_otp..Generator.hotp) ⇒ <code>String</code>
        * [.totp(options)](#module_otp..Generator.totp) ⇒ <code>String</code>
    * [~Validator](#module_otp..Validator)
        * [.hotp(token, options)](#module_otp..Validator.hotp) ⇒ <code>Boolean</code>
        * [.totp(token, options)](#module_otp..Validator.totp) ⇒ <code>Boolean</code>
    * [~OTP](#module_otp..OTP)
        * [.generate(options)](#module_otp..OTP.generate) ⇒ <code>String</code>
        * [.validate(token, options)](#module_otp..OTP.validate) ⇒ <code>Boolean</code>
        * [.randomSecret(options)](#module_otp..OTP.randomSecret) ⇒ <code>String</code>
        * [.otpauth(options)](#module_otp..OTP.otpauth) ⇒ <code>Object</code>

<a name="module_otp..Generator"></a>

### otp~Generator
**Kind**: inner class of [<code>otp</code>](#module_otp)  

* [~Generator](#module_otp..Generator)
    * [.hotp(options)](#module_otp..Generator.hotp) ⇒ <code>String</code>
    * [.totp(options)](#module_otp..Generator.totp) ⇒ <code>String</code>

<a name="module_otp..Generator.hotp"></a>

#### Generator.hotp(options) ⇒ <code>String</code>
HOTP: An HMAC-Based One-Time Password Algorithm

**Kind**: static method of [<code>Generator</code>](#module_otp..Generator)  
**See**: [https://www.rfc-editor.org/rfc/rfc4226](https://www.rfc-editor.org/rfc/rfc4226)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="module_otp..Generator.totp"></a>

#### Generator.totp(options) ⇒ <code>String</code>
TOTP: Time-Based One-Time Password Algorithm

**Kind**: static method of [<code>Generator</code>](#module_otp..Generator)  
**See**: [https://www.rfc-editor.org/rfc/rfc6238](https://www.rfc-editor.org/rfc/rfc6238)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="module_otp..Validator"></a>

### otp~Validator
**Kind**: inner class of [<code>otp</code>](#module_otp)  

* [~Validator](#module_otp..Validator)
    * [.hotp(token, options)](#module_otp..Validator.hotp) ⇒ <code>Boolean</code>
    * [.totp(token, options)](#module_otp..Validator.totp) ⇒ <code>Boolean</code>

<a name="module_otp..Validator.hotp"></a>

#### Validator.hotp(token, options) ⇒ <code>Boolean</code>
**Kind**: static method of [<code>Validator</code>](#module_otp..Validator)  

| Param | Type |
| --- | --- |
| token | <code>String</code> | 
| options | <code>Object</code> | 

<a name="module_otp..Validator.totp"></a>

#### Validator.totp(token, options) ⇒ <code>Boolean</code>
**Kind**: static method of [<code>Validator</code>](#module_otp..Validator)  

| Param | Type |
| --- | --- |
| token | <code>String</code> | 
| options | <code>Object</code> | 

<a name="module_otp..OTP"></a>

### otp~OTP
**Kind**: inner class of [<code>otp</code>](#module_otp)  

* [~OTP](#module_otp..OTP)
    * [.generate(options)](#module_otp..OTP.generate) ⇒ <code>String</code>
    * [.validate(token, options)](#module_otp..OTP.validate) ⇒ <code>Boolean</code>
    * [.randomSecret(options)](#module_otp..OTP.randomSecret) ⇒ <code>String</code>
    * [.otpauth(options)](#module_otp..OTP.otpauth) ⇒ <code>Object</code>

<a name="module_otp..OTP.generate"></a>

#### OTP.generate(options) ⇒ <code>String</code>
**Kind**: static method of [<code>OTP</code>](#module_otp..OTP)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.type | <code>String</code> |  | `hotp`, or `totp` |
| options.secret | <code>String</code> |  |  |
| options.encoding | <code>String</code> | <code>base32</code> | `base32`, `ascii`, `hex` |
| options.counter | <code>Number</code> | <code>0</code> | used with `hotp` |
| options.algorithm | <code>String</code> | <code>sha1</code> | `sha1`, `sha256`, or `sha512` |
| options.digits | <code>Number</code> | <code>6</code> |  |
| options.time | <code>Number</code> | <code>Date.now()/1000</code> | use with `totp` |
| options.epoch | <code>Number</code> | <code>0</code> | use with `totp` |
| options.period | <code>Number</code> | <code>30</code> | use with `totp` |

<a name="module_otp..OTP.validate"></a>

#### OTP.validate(token, options) ⇒ <code>Boolean</code>
**Kind**: static method of [<code>OTP</code>](#module_otp..OTP)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| token | <code>String</code> |  |  |
| options | <code>Object</code> |  |  |
| options.type | <code>String</code> |  | `hotp`, or `totp` |
| options.secret | <code>String</code> |  |  |
| options.encoding | <code>String</code> | <code>base32</code> | `base32`, `ascii`, `hex` |
| options.counter | <code>Number</code> | <code>0</code> | used with `hotp` |
| options.algorithm | <code>String</code> | <code>sha1</code> | `sha1`, `sha256`, or `sha512` |
| options.digits | <code>Number</code> | <code>6</code> |  |
| options.time | <code>Number</code> | <code>Date.now()/1000</code> | use with `totp` |
| options.epoch | <code>Number</code> | <code>0</code> | use with `totp` |
| options.period | <code>Number</code> | <code>30</code> | use with `totp` |

<a name="module_otp..OTP.randomSecret"></a>

#### OTP.randomSecret(options) ⇒ <code>String</code>
**Kind**: static method of [<code>OTP</code>](#module_otp..OTP)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="module_otp..OTP.otpauth"></a>

#### OTP.otpauth(options) ⇒ <code>Object</code>
**Kind**: static method of [<code>OTP</code>](#module_otp..OTP)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

**Properties**

| Name | Type | Default |
| --- | --- | --- |
| type | <code>String</code> | <code>totp</code> | 
| label | <code>String</code> | <code>label</code> | 
| secret | <code>String</code> | <code>&lt;AUTO&gt;</code> | 
| encoding | <code>String</code> | <code>base32</code> | 
| issuer | <code>String</code> | <code>issuer</code> | 
| algorithm | <code>String</code> | <code>sha1</code> | 
| digits | <code>String</code> | <code>6</code> | 
| counter | <code>String</code> |  | 
| period | <code>String</code> | <code>30</code> | 


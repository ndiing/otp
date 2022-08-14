<a name="module_otp"></a>

## otp
### Install```npm install @ndiing/otp```### Usage```js// Appendix D - HOTP Algorithm: Test Values//    The following test data uses the ASCII string//    "12345678901234567890" for the secret://    Secret = 0x3132333435363738393031323334353637383930//    Table 1 details for each count, the intermediate HMAC value.//    Count    Hexadecimal HMAC-SHA-1(secret, count)//    0        cc93cf18508d94934c64b65d8ba7667fb7cde4b0//    1        75a48a19d4cbe100644e8ac1397eea747a2d33ab//    2        0bacb7fa082fef30782211938bc1c5e70416ff44//    3        66c28227d03a2d5529262ff016a1e6ef76557ece//    4        a904c900a64b35909874b33e61c5938a8e15ed1c//    5        a37e783d7b7233c083d4f62926c7a25f238d0316//    6        bc9cd28561042c83f219324d3c607256c03272ae//    7        a4fb960c0bc06e1eabb804e5b397cdc4b45596fa//    8        1b3c89f65e6c9e883012052823443f048b4332db//    9        1637409809a679dc698207310c8c7fc07290d9e5//    Table 2 details for each count the truncated values (both in//    hexadecimal and decimal) and then the HOTP value.//                      Truncated//    Count    Hexadecimal    Decimal        HOTP//    0        4c93cf18       1284755224     755224//    1        41397eea       1094287082     287082//    2         82fef30        137359152     359152//    3        66ef7655       1726969429     969429//    4        61c5938a       1640338314     338314//    5        33c083d4        868254676     254676//    6        7256c032       1918287922     287922//    7         4e5b397         82162583     162583//    8        2823443f        673399871     399871//    9        2679dc69        645520489     520489var options = {    base: "hotp",    secret: "12345678901234567890",    count: 0,    algorithm: "sha1",    digit: 6,};for (let i = 0; i < 10; i++) {    options.count = i;    var token = OTP.generate(options);    console.log(token);}// Appendix B.  Test Vectors//    This section provides test values that can be used for the HOTP time-//    based variant algorithm interoperability test.//    The test token shared secrets use the following ASCII string values: Expand// - HMAC-SHA1: "12345678901234567890" (20 bytes)// - HMAC-SHA256: "12345678901234567890123456789012" (32 bytes)// - HMAC-SHA512://   "1234567890123456789012345678901234567890123456789012345678901234" (64 bytes)  With Time Step X = 30, and the Unix epoch as//    the initial value to count time steps, where T0 = 0, the TOTP//    algorithm will display the following values for specified modes and//    timestamps.//   +-------------+--------------+------------------+----------+--------+//   |  Time (sec) |   UTC Time   | Value of T (hex) |   TOTP   |  Mode  |//   +-------------+--------------+------------------+----------+--------+//   |      59     |  1970-01-01  | 0000000000000001 | 94287082 |  SHA1  |//   |             |   00:00:59   |                  |          |        |//   |      59     |  1970-01-01  | 0000000000000001 | 46119246 | SHA256 |//   |             |   00:00:59   |                  |          |        |//   |      59     |  1970-01-01  | 0000000000000001 | 90693936 | SHA512 |//   |             |   00:00:59   |                  |          |        |//   |  1111111109 |  2005-03-18  | 00000000023523EC | 07081804 |  SHA1  |//   |             |   01:58:29   |                  |          |        |//   |  1111111109 |  2005-03-18  | 00000000023523EC | 68084774 | SHA256 |//   |             |   01:58:29   |                  |          |        |//   |  1111111109 |  2005-03-18  | 00000000023523EC | 25091201 | SHA512 |//   |             |   01:58:29   |                  |          |        |//   |  1111111111 |  2005-03-18  | 00000000023523ED | 14050471 |  SHA1  |//   |             |   01:58:31   |                  |          |        |//   |  1111111111 |  2005-03-18  | 00000000023523ED | 67062674 | SHA256 |//   |             |   01:58:31   |                  |          |        |//   |  1111111111 |  2005-03-18  | 00000000023523ED | 99943326 | SHA512 |//   |             |   01:58:31   |                  |          |        |//   |  1234567890 |  2009-02-13  | 000000000273EF07 | 89005924 |  SHA1  |//   |             |   23:31:30   |                  |          |        |//   |  1234567890 |  2009-02-13  | 000000000273EF07 | 91819424 | SHA256 |//   |             |   23:31:30   |                  |          |        |//   |  1234567890 |  2009-02-13  | 000000000273EF07 | 93441116 | SHA512 |//   |             |   23:31:30   |                  |          |        |//   |  2000000000 |  2033-05-18  | 0000000003F940AA | 69279037 |  SHA1  |//   |             |   03:33:20   |                  |          |        |//   |  2000000000 |  2033-05-18  | 0000000003F940AA | 90698825 | SHA256 |//   |             |   03:33:20   |                  |          |        |//   |  2000000000 |  2033-05-18  | 0000000003F940AA | 38618901 | SHA512 |//   |             |   03:33:20   |                  |          |        |//   | 20000000000 |  2603-10-11  | 0000000027BC86AA | 65353130 |  SHA1  |//   |             |   11:33:20   |                  |          |        |//   | 20000000000 |  2603-10-11  | 0000000027BC86AA | 77737706 | SHA256 |//   |             |   11:33:20   |                  |          |        |//   | 20000000000 |  2603-10-11  | 0000000027BC86AA | 47863826 | SHA512 |//   |             |   11:33:20   |                  |          |        |//   +-------------+--------------+------------------+----------+--------+//                             Table 1: TOTP Tablevar options = {    base: "totp",    algorithm: "sha1",    digit: 6,    // time: new Date(),    epoch: 0,    step: 30,};let secs = [    //    59, //    1111111109,    1111111111,    1234567890,    2000000000,    20000000000,];for (let i = 0; i < secs.length; i++) {    const sec = secs[i];    options.time = sec;    // 20 bytes    options.secret = "12345678901234567890";    options.algorithm = "sha1";    var token = OTP.generate(options);    console.log(new Date(options.time * 1000), token);    // 32 bytes    options.secret = "12345678901234567890123456789012";    options.algorithm = "sha256";    var token = OTP.generate(options);    console.log(new Date(options.time * 1000), token);    // 64 bytes    options.secret = "1234567890123456789012345678901234567890123456789012345678901234";    options.algorithm = "sha512";    var token = OTP.generate(options);    console.log(new Date(options.time * 1000), token);}```


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

<a name="module_otp..OTP.generate"></a>

#### OTP.generate(options) ⇒ <code>String</code>
**Kind**: static method of [<code>OTP</code>](#module_otp..OTP)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.base | <code>String</code> |  | `hotp`, or `hotp` |
| options.secret | <code>String</code> |  |  |
| options.count | <code>Number</code> | <code>0</code> | used with `hotp` |
| options.algorithm | <code>String</code> | <code>sha1</code> | `sha1`, `sha256`, or `sha512` |
| options.digit | <code>Number</code> | <code>6</code> |  |
| options.time | <code>Number</code> | <code>Date.now()/1000</code> |  |
| options.epoch | <code>Number</code> | <code>0</code> |  |
| options.step | <code>Number</code> | <code>30</code> |  |

<a name="module_otp..OTP.validate"></a>

#### OTP.validate(token, options) ⇒ <code>Boolean</code>
**Kind**: static method of [<code>OTP</code>](#module_otp..OTP)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| token | <code>String</code> |  |  |
| options | <code>Object</code> |  |  |
| options.base | <code>String</code> |  | `hotp`, or `hotp` |
| options.secret | <code>String</code> |  |  |
| options.count | <code>Number</code> | <code>0</code> | used with `hotp` |
| options.algorithm | <code>String</code> | <code>sha1</code> | `sha1`, `sha256`, or `sha512` |
| options.digit | <code>Number</code> | <code>6</code> |  |
| options.time | <code>Number</code> | <code>Date.now()/1000</code> |  |
| options.epoch | <code>Number</code> | <code>0</code> |  |
| options.step | <code>Number</code> | <code>30</code> |  |


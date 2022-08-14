## Classes

<dl>
<dt><a href="#Generator">Generator</a></dt>
<dd></dd>
<dt><a href="#Validator">Validator</a></dt>
<dd></dd>
<dt><a href="#OTP">OTP</a></dt>
<dd></dd>
</dl>

<a name="Generator"></a>

## Generator
**Kind**: global class  

* [Generator](#Generator)
    * [.hotp(options)](#Generator.hotp) ⇒ <code>String</code>
    * [.totp(options)](#Generator.totp) ⇒ <code>String</code>

<a name="Generator.hotp"></a>

### Generator.hotp(options) ⇒ <code>String</code>
HOTP: An HMAC-Based One-Time Password Algorithm

**Kind**: static method of [<code>Generator</code>](#Generator)  
**See**: [https://www.rfc-editor.org/rfc/rfc4226](https://www.rfc-editor.org/rfc/rfc4226)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="Generator.totp"></a>

### Generator.totp(options) ⇒ <code>String</code>
TOTP: Time-Based One-Time Password Algorithm

**Kind**: static method of [<code>Generator</code>](#Generator)  
**See**: [https://www.rfc-editor.org/rfc/rfc6238](https://www.rfc-editor.org/rfc/rfc6238)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="Validator"></a>

## Validator
**Kind**: global class  

* [Validator](#Validator)
    * [.hotp(token, options)](#Validator.hotp) ⇒ <code>Boolean</code>
    * [.totp(token, options)](#Validator.totp) ⇒ <code>Boolean</code>

<a name="Validator.hotp"></a>

### Validator.hotp(token, options) ⇒ <code>Boolean</code>
**Kind**: static method of [<code>Validator</code>](#Validator)  

| Param | Type |
| --- | --- |
| token | <code>String</code> | 
| options | <code>Object</code> | 

<a name="Validator.totp"></a>

### Validator.totp(token, options) ⇒ <code>Boolean</code>
**Kind**: static method of [<code>Validator</code>](#Validator)  

| Param | Type |
| --- | --- |
| token | <code>String</code> | 
| options | <code>Object</code> | 

<a name="OTP"></a>

## OTP
**Kind**: global class  

* [OTP](#OTP)
    * [.generate(options)](#OTP.generate) ⇒ <code>String</code>
    * [.validate(token, options)](#OTP.validate) ⇒ <code>Boolean</code>

<a name="OTP.generate"></a>

### OTP.generate(options) ⇒ <code>String</code>
**Kind**: static method of [<code>OTP</code>](#OTP)  

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

<a name="OTP.validate"></a>

### OTP.validate(token, options) ⇒ <code>Boolean</code>
**Kind**: static method of [<code>OTP</code>](#OTP)  

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


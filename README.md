<a name="module_otp"></a>

## otp

* [otp](#module_otp)
    * [.hotp([options])](#module_otp.hotp) ⇒ <code>string</code>
    * [.totp([options])](#module_otp.totp) ⇒ <code>string</code>

<a name="module_otp.hotp"></a>

### otp.hotp([options]) ⇒ <code>string</code>
Menghasilkan HMAC-based One-Time Password (HOTP) berdasarkan secret dan nilai penghitung.

**Kind**: static method of [<code>otp</code>](#module_otp)  
**Returns**: <code>string</code> - - Mengembalikan HOTP dalam bentuk string dengan panjang yang ditentukan oleh `digits`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Opsi untuk menghasilkan HOTP. |
| options.secret | <code>string</code> |  | Kunci rahasia yang digunakan untuk menghasilkan OTP. |
| options.count | <code>number</code> |  | Nilai penghitung yang terus meningkat. |
| [options.algorithm] | <code>string</code> | <code>&quot;&#x27;sha1&#x27;&quot;</code> | Algoritma hash yang digunakan untuk HMAC ('sha1', 'sha256', atau 'sha512'). |
| [options.digits] | <code>number</code> | <code>6</code> | Jumlah digit pada OTP yang dihasilkan. |

<a name="module_otp.totp"></a>

### otp.totp([options]) ⇒ <code>string</code>
Menghasilkan Time-based One-Time Password (TOTP) berdasarkan secret dan waktu saat ini.

**Kind**: static method of [<code>otp</code>](#module_otp)  
**Returns**: <code>string</code> - - Mengembalikan TOTP dalam bentuk string dengan panjang yang ditentukan oleh `digits`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Opsi untuk menghasilkan TOTP. |
| options.secret | <code>string</code> |  | Kunci rahasia yang digunakan untuk menghasilkan OTP. |
| [options.T] | <code>number</code> | <code>Math.floor(Date.now() / 1000)</code> | Waktu dalam detik. Default adalah waktu saat ini dalam detik. |
| [options.T0] | <code>number</code> | <code>0</code> | Waktu awal (epoch time). Default adalah 0. |
| [options.X] | <code>number</code> | <code>30</code> | Interval waktu (dalam detik) antara setiap TOTP. Default adalah 30 detik. |
| [options.algorithm] | <code>string</code> | <code>&quot;&#x27;sha1&#x27;&quot;</code> | Algoritma hash yang digunakan untuk HMAC ('sha1', 'sha256', atau 'sha512'). |
| [options.digits] | <code>number</code> | <code>6</code> | Jumlah digit pada OTP yang dihasilkan. |


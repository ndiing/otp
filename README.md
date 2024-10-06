## Functions

<dl>
<dt><a href="#hotp">hotp(options)</a> ⇒ <code>string</code></dt>
<dd><p>Menghitung One-Time Password (OTP) berdasarkan HMAC-based One-Time Password (HOTP)
menggunakan parameter yang diberikan.</p>
</dd>
<dt><a href="#totp">totp(options)</a> ⇒ <code>string</code></dt>
<dd><p>Menghitung One-Time Password (OTP) berdasarkan Time-based One-Time Password (TOTP)
menggunakan parameter yang diberikan.</p>
</dd>
</dl>

<a name="hotp"></a>

## hotp(options) ⇒ <code>string</code>
Menghitung One-Time Password (OTP) berdasarkan HMAC-based One-Time Password (HOTP)menggunakan parameter yang diberikan.

**Kind**: global function  
**Returns**: <code>string</code> - OTP yang dihasilkan.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Opsi untuk menghasilkan OTP. |
| options.secret | <code>string</code> |  | Kunci rahasia yang digunakan untuk menghasilkan OTP. |
| options.count | <code>number</code> |  | Hitungan yang digunakan untuk menghitung OTP. |
| [options.algorithm] | <code>string</code> | <code>&quot;\&quot;sha1\&quot;&quot;</code> | Algoritma hashing yang digunakan (default: "sha1"). |
| [options.digits] | <code>number</code> | <code>6</code> | Jumlah digit dalam OTP (default: 6). |

<a name="totp"></a>

## totp(options) ⇒ <code>string</code>
Menghitung One-Time Password (OTP) berdasarkan Time-based One-Time Password (TOTP)menggunakan parameter yang diberikan.

**Kind**: global function  
**Returns**: <code>string</code> - OTP yang dihasilkan.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Opsi untuk menghasilkan OTP. |
| options.secret | <code>string</code> |  | Kunci rahasia yang digunakan untuk menghasilkan OTP. |
| [options.T] | <code>number</code> | <code>Math.floor(Date.now() / 1000)</code> | Waktu saat ini dalam detik (default: waktu sekarang). |
| [options.T0] | <code>number</code> | <code>0</code> | Waktu awal dalam detik (default: 0). |
| [options.X] | <code>number</code> | <code>30</code> | Interval waktu dalam detik (default: 30). |
| [options.algorithm] | <code>string</code> | <code>&quot;\&quot;sha1\&quot;&quot;</code> | Algoritma hashing yang digunakan (default: "sha1"). |
| [options.digits] | <code>number</code> | <code>6</code> | Jumlah digit dalam OTP (default: 6). |


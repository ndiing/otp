# @ndiinginc/otp

Implementasi ringan HOTP (RFC 4226) dan TOTP (RFC 6238) untuk Node.js, tanpa dependency eksternal selain modul bawaan `crypto`. Mendukung encoding secret Base32, generate secret acak, dan pembuatan URI `otpauth://` lengkap dengan link QR code.

## Instalasi

```bash
npm install @ndiinginc/otp
```

## Fitur

- `hotp()` — HMAC-based One-Time Password (RFC 4226)
- `totp()` — Time-based One-Time Password (RFC 6238)
- `randomSecret()` — generate secret acak (hex atau Base32)
- `otpauth()` — bangun URI `otpauth://` + link QR code siap pakai
- Encoder/decoder Base32 internal (RFC 4648), tidak butuh library tambahan
- Mendukung algoritma `SHA1`, `SHA256`, `SHA512`

## Penggunaan Cepat

```js
const { totp, hotp, randomSecret, otpauth } = require("@ndiinginc/otp");

// Generate secret baru (Base32, cocok untuk Google Authenticator dkk)
const secret = randomSecret({ algorithm: "SHA1", encoding: "base32" });
console.log(secret); // contoh: "JBSWY3DPEHPK3PXP"

// Generate kode TOTP saat ini
const code = totp({ secret, encoding: "base32" });
console.log(code); // contoh: "482913"

// Generate kode HOTP dengan counter manual
const hotpCode = hotp({ secret, counter: 1, encoding: "base32" });
console.log(hotpCode);

// Bangun URI otpauth + QR code untuk aplikasi authenticator
const auth = otpauth({
    type: "totp",
    label: "user@example.com",
    issuer: "MyApp",
    secret,
});
console.log(auth.url); // otpauth://totp/user@example.com?secret=...&issuer=MyApp
console.log(auth.qr);  // link gambar QR code
```

## API

### `hotp(options)`

Menghasilkan kode HOTP berdasarkan secret dan counter.

| Opsi | Tipe | Default | Keterangan |
|---|---|---|---|
| `secret` | `String` | – | Secret key (wajib) |
| `counter` | `Number` | – | Nilai counter (wajib) |
| `algorithm` | `"SHA1"\|"SHA256"\|"SHA512"` | `"SHA1"` | Algoritma HMAC |
| `digits` | `Number` | `6` | Panjang kode OTP |
| `encoding` | `String` | `"ascii"` | Encoding secret (`"ascii"`, `"base32"`, `"hex"`, dst.) |

Return: `String` — kode OTP.

### `totp(options)`

Menghasilkan kode TOTP berbasis waktu. Menerima semua opsi `hotp()` kecuali `counter`, ditambah:

| Opsi | Tipe | Default | Keterangan |
|---|---|---|---|
| `time` | `Number` | waktu saat ini (detik) | Timestamp Unix (T) |
| `timeStart` | `Number` | `0` | Waktu awal epoch (T0) |
| `timeStep` | `Number` | `30` | Interval waktu per step dalam detik (X) |

Return: `String` — kode OTP.

### `randomSecret(options)`

Generate secret acak sepanjang sesuai algoritma yang dipilih.

| Opsi | Tipe | Default | Keterangan |
|---|---|---|---|
| `algorithm` | `"SHA1"\|"SHA256"\|"SHA512"` | `"SHA1"` | Menentukan panjang secret (20/32/64 byte) |
| `encoding` | `String` | `"hex"` | Format output (`"hex"`, `"base32"`, dst.) |

Return: `String` — secret dalam encoding yang diminta.

### `otpauth(options)`

Membangun URI `otpauth://` sesuai spesifikasi Key URI Format, sekaligus link QR code (via `api.qrserver.com`).

| Opsi | Tipe | Default | Keterangan |
|---|---|---|---|
| `type` | `"totp"\|"hotp"` | `"totp"` | Jenis OTP |
| `label` | `String` | `"label"` | Label akun, biasanya `email` atau `issuer:email` |
| `secret` | `String` | auto-generate (Base32) | Secret; jika kosong akan digenerate otomatis |
| `algorithm` | `"SHA1"\|"SHA256"\|"SHA512"` | `"SHA1"` | Algoritma HMAC |
| `digits` | `Number` | `6` | Panjang kode OTP |
| `counter` | `Number` | – | Wajib jika `type` adalah `"hotp"` |
| `period` | `Number` | `30` | Interval waktu (detik), untuk `totp` |
| `issuer` | `String` | – | Nama penerbit/aplikasi |

Return: `Object` berisi `{ type, label, secret, algorithm, digits, counter, period, issuer, url, qr }`.

## Catatan Keamanan

- Simpan `secret` dengan aman (jangan hardcode di kode yang di-commit ke repo publik).
- Gunakan encoding `base32` untuk secret yang akan dipakai di aplikasi authenticator standar (Google Authenticator, Authy, dll).
- Modul ini tidak melakukan validasi *replay* atau *rate limiting* — implementasikan sendiri di sisi aplikasi saat memverifikasi OTP dari user.

## Lisensi

MIT

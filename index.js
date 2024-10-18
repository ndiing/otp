const crypto = require("crypto");

/**
 * @module otp
 */

/**
 * Menghasilkan HMAC-based One-Time Password (HOTP) berdasarkan secret dan nilai penghitung.
 *
 * @memberof module:otp
 * @param {Object} [options={}] - Opsi untuk menghasilkan HOTP.
 * @param {string} options.secret - Kunci rahasia yang digunakan untuk menghasilkan OTP.
 * @param {number} options.count - Nilai penghitung yang terus meningkat.
 * @param {string} [options.algorithm='sha1'] - Algoritma hash yang digunakan untuk HMAC ('sha1', 'sha256', atau 'sha512').
 * @param {number} [options.digits=6] - Jumlah digit pada OTP yang dihasilkan.
 * @returns {string} - Mengembalikan HOTP dalam bentuk string dengan panjang yang ditentukan oleh `digits`.
 */
function hotp(options = {}) {
    const { secret, count, algorithm = "sha1", digits = 6 } = options;

    const key = Buffer.from(secret);

    const data = Buffer.alloc(8);
    data.writeUInt32BE(count, 4);

    const hash = crypto.createHmac(algorithm, key).update(data).digest("hex");
    const offset = parseInt(hash.charAt(hash.length - 1), 16);
    const result = parseInt(hash.substring(offset * 2, offset * 2 + 2 * 4), 16) & 0x7fffffff;

    return String(result)
        .padStart(digits, "0")
        .slice(0 - digits);
}

/**
 * Menghasilkan Time-based One-Time Password (TOTP) berdasarkan secret dan waktu saat ini.
 *
 * @memberof module:otp
 * @param {Object} [options={}] - Opsi untuk menghasilkan TOTP.
 * @param {string} options.secret - Kunci rahasia yang digunakan untuk menghasilkan OTP.
 * @param {number} [options.T=Math.floor(Date.now() / 1000)] - Waktu dalam detik. Default adalah waktu saat ini dalam detik.
 * @param {number} [options.T0=0] - Waktu awal (epoch time). Default adalah 0.
 * @param {number} [options.X=30] - Interval waktu (dalam detik) antara setiap TOTP. Default adalah 30 detik.
 * @param {string} [options.algorithm='sha1'] - Algoritma hash yang digunakan untuk HMAC ('sha1', 'sha256', atau 'sha512').
 * @param {number} [options.digits=6] - Jumlah digit pada OTP yang dihasilkan.
 * @returns {string} - Mengembalikan TOTP dalam bentuk string dengan panjang yang ditentukan oleh `digits`.
 */
function totp(options = {}) {
    const { secret, T = Math.floor(Date.now() / 1000), T0 = 0, X = 30, algorithm = "sha1", digits = 6 } = options;

    const count = Math.floor((T - T0) / X);

    return hotp({ secret, count, algorithm, digits });
}

module.exports = {
    hotp,
    totp,
};

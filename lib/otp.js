const crypto = require("crypto");

/**
 * Menghitung One-Time Password (OTP) berdasarkan HMAC-based One-Time Password (HOTP)
 * menggunakan parameter yang diberikan.
 *
 * @param {Object} options - Opsi untuk menghasilkan OTP.
 * @param {string} options.secret - Kunci rahasia yang digunakan untuk menghasilkan OTP.
 * @param {number} options.count - Hitungan yang digunakan untuk menghitung OTP.
 * @param {string} [options.algorithm="sha1"] - Algoritma hashing yang digunakan (default: "sha1").
 * @param {number} [options.digits=6] - Jumlah digit dalam OTP (default: 6).
 * @returns {string} OTP yang dihasilkan.
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
 * Menghitung One-Time Password (OTP) berdasarkan Time-based One-Time Password (TOTP)
 * menggunakan parameter yang diberikan.
 *
 * @param {Object} options - Opsi untuk menghasilkan OTP.
 * @param {string} options.secret - Kunci rahasia yang digunakan untuk menghasilkan OTP.
 * @param {number} [options.T=Math.floor(Date.now() / 1000)] - Waktu saat ini dalam detik (default: waktu sekarang).
 * @param {number} [options.T0=0] - Waktu awal dalam detik (default: 0).
 * @param {number} [options.X=30] - Interval waktu dalam detik (default: 30).
 * @param {string} [options.algorithm="sha1"] - Algoritma hashing yang digunakan (default: "sha1").
 * @param {number} [options.digits=6] - Jumlah digit dalam OTP (default: 6).
 * @returns {string} OTP yang dihasilkan.
 */
function totp(options = {}) {
    const { secret, T = Math.floor(Date.now() / 1000), T0 = 0, X = 30, algorithm = "sha1", digits = 6 } = options;
    const count = Math.floor((T - T0) / X);
    return hotp({ secret, count, algorithm, digits });
}

module.exports = { hotp, totp };

// // https://www.ietf.org/rfc/rfc4226.txt
// {
//     // console.log(hotp({secret:'12345678901234567890'}))

//     const data=[
//         {secret:'12345678901234567890',"count": 0, "hotp": '755224'},
//         {secret:'12345678901234567890',"count": 1, "hotp": '287082'},
//         {secret:'12345678901234567890',"count": 2, "hotp": '359152'},
//         {secret:'12345678901234567890',"count": 3, "hotp": '969429'},
//         {secret:'12345678901234567890',"count": 4, "hotp": '338314'},
//         {secret:'12345678901234567890',"count": 5, "hotp": '254676'},
//         {secret:'12345678901234567890',"count": 6, "hotp": '287922'},
//         {secret:'12345678901234567890',"count": 7, "hotp": '162583'},
//         {secret:'12345678901234567890',"count": 8, "hotp": '399871'},
//         {secret:'12345678901234567890',"count": 9, "hotp": '520489'}
//     ]

//     for (let index = 0; index < data.length; index++) {
//         const item = data[index]
//         // true jika valid
//         console.log(hotp(item)===data[index].hotp)
//     }
// }

// // https://datatracker.ietf.org/doc/html/rfc6238
// {
//     // console.log(totp({secret:'12345678901234567890'}))

//     const data=[
//         {secret:'12345678901234567890',"T": 59, "algorithm": "SHA1", "totp": '287082'},
//         {secret:'12345678901234567890123456789012',"T": 59, "algorithm": "SHA256", "totp": '119246'},
//         {secret:'1234567890123456789012345678901234567890123456789012345678901234',"T": 59, "algorithm": "SHA512", "totp": '693936'},
//         {secret:'12345678901234567890',"T": 1111111109, "algorithm": "SHA1", "totp": '081804'},
//         {secret:'12345678901234567890123456789012',"T": 1111111109, "algorithm": "SHA256", "totp": '084774'},
//         {secret:'1234567890123456789012345678901234567890123456789012345678901234',"T": 1111111109, "algorithm": "SHA512", "totp": '091201'},
//         {secret:'12345678901234567890',"T": 1111111111, "algorithm": "SHA1", "totp": '050471'},
//         {secret:'12345678901234567890123456789012',"T": 1111111111, "algorithm": "SHA256", "totp": '062674'},
//         {secret:'1234567890123456789012345678901234567890123456789012345678901234',"T": 1111111111, "algorithm": "SHA512", "totp": '943326'},
//         {secret:'12345678901234567890',"T": 1234567890, "algorithm": "SHA1", "totp": '005924'},
//         {secret:'12345678901234567890123456789012',"T": 1234567890, "algorithm": "SHA256", "totp": '819424'},
//         {secret:'1234567890123456789012345678901234567890123456789012345678901234',"T": 1234567890, "algorithm": "SHA512", "totp": '441116'},
//         {secret:'12345678901234567890',"T": 2000000000, "algorithm": "SHA1", "totp": '279037'},
//         {secret:'12345678901234567890123456789012',"T": 2000000000, "algorithm": "SHA256", "totp": '698825'},
//         {secret:'1234567890123456789012345678901234567890123456789012345678901234',"T": 2000000000, "algorithm": "SHA512", "totp": '618901'},
//         {secret:'12345678901234567890',"T": 20000000000, "algorithm": "SHA1", "totp": '353130'},
//         {secret:'12345678901234567890123456789012',"T": 20000000000, "algorithm": "SHA256", "totp": '737706'},
//         {secret:'1234567890123456789012345678901234567890123456789012345678901234',"T": 20000000000, "algorithm": "SHA512", "totp": '863826'}
//     ]
//     for (let index = 0; index < data.length; index++) {
//         const item = data[index];
//         // true jika valid
//         console.log(totp(item)===data[index].totp)
//     }
// }

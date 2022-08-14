const Crypto = require("@ndiing/crypto");
const { URL2 } = require("@ndiing/fetch");

/**
 * ### Install
 * ```
 * npm install @ndiing/otp
 * ```
 * ### Usage
 * ```js
 * var options = {
 *     type: "totp",
 *     label: "ndiing",
 *     // secret,
 *     encoding: "base32",
 *     issuer: "ndiing.inc@google.com",
 *     algorithm: "sha1",
 *     digits: 6,
 *     // counter,
 *     period: 30,
 * };
 * var token = OTP.generate(options);
 * console.log({token})
 *
 * var valid = OTP.validate(token,options);
 * console.log({valid})
 *
 * var secret = OTP.generateSecret();
 * console.log({secret})
 *
 * var url = OTP.generateOtpauth(options);
 * console.log({url})
 * ```
 * @module otp
 */

/**
 *
 */
class Generator {
    /**
     * HOTP: An HMAC-Based One-Time Password Algorithm
     * @see {@link https://www.rfc-editor.org/rfc/rfc4226}
     * @param {Object} options
     * @returns {String}
     */
    static hotp(options = {}) {
        let { secret, encoding = "ascii", counter = 0, algorithm = "sha1", digits = 6 } = options;

        if (encoding == "base32") {
            secret = Crypto.base32Decode(secret);
        } else {
            secret = Buffer.from(secret, encoding);
        }

        const count = Buffer.alloc(8);
        count.writeUInt32BE(counter, 4);

        const hmac = Crypto.hmac(count, { algorithm, key: secret, encoding: "hex" });

        const offset = parseInt(hmac.charAt(hmac.length - 1), 16);

        let result = parseInt(hmac.substr(offset * 2, 2 * 4), 16);
        result = result & 0x7fffffff;
        result = ("" + result).padStart(digits, "0");

        // otp
        return result.slice(0 - digits);
    }

    /**
     * TOTP: Time-Based One-Time Password Algorithm
     * @see {@link https://www.rfc-editor.org/rfc/rfc6238}
     * @param {Object} options
     * @returns {String}
     */
    static totp(options = {}) {
        let { secret = "", encoding = "ascii", time = Date.now(), epoch = 0, period = 30, algorithm = "sha1", digits = 6 } = options;
        time = time / 1000;

        const counter = Math.floor((time - epoch) / period);

        return this.hotp({ secret, counter, algorithm, digits, encoding });
    }
}

/**
 *
 */
class Validator {
    /**
     *
     * @param {String} token
     * @param {Object} options
     * @returns {Boolean}
     */
    static hotp(token, options) {
        return token == Generator.hotp(options);
    }

    /**
     *
     * @param {String} token
     * @param {Object} options
     * @returns {Boolean}
     */
    static totp(token, options) {
        return token == Generator.totp(options);
    }
}

/**
 *
 */
class OTP {
    /**
     *
     * @param {Object} options
     * @param {String} options.type -  `hotp`, or `totp`
     * @param {String} options.secret
     * @param {String} options.encoding=base32 - `base32`, `ascii`, `hex`
     * @param {Number} options.counter=0 - used with `hotp`
     * @param {String} options.algorithm=sha1 - `sha1`, `sha256`, or `sha512`
     * @param {Number} options.digits=6
     * @param {Number} options.time=Date.now()/1000 - use with `totp`
     * @param {Number} options.epoch=0 - use with `totp`
     * @param {Number} options.period=30 - use with `totp`
     * @returns {String}
     */
    static generate(options = {}) {
        const { type = "hotp" } = options;
        // type=hotp/totp
        return Generator[type](options);
    }

    /**
     *
     * @param {String} token
     * @param {Object} options
     * @param {String} options.type -  `hotp`, or `totp`
     * @param {String} options.secret
     * @param {String} options.encoding=base32 - `base32`, `ascii`, `hex`
     * @param {Number} options.counter=0 - used with `hotp`
     * @param {String} options.algorithm=sha1 - `sha1`, `sha256`, or `sha512`
     * @param {Number} options.digits=6
     * @param {Number} options.time=Date.now()/1000 - use with `totp`
     * @param {Number} options.epoch=0 - use with `totp`
     * @param {Number} options.period=30 - use with `totp`
     * @returns {Boolean}
     */
    static validate(token, options = {}) {
        const { type = "hotp" } = options;
        // type=hotp/totp
        return Validator[type](token, options);
    }

    // https://www.rfc-editor.org/rfc/rfc3548

    /**
     *
     * @param {Object} options
     * @returns {String}
     */
    static generateSecret(options = {}) {
        const { algorithm = "sha1", encoding = "base32" } = options;
        const char =
            "0123456789" + //
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
            "abcdefghijklmnopqrstuvwxyz";
        const end = algorithm == "sha256" ? 32 : algorithm == "sha512" ? 65 : 20;
        let string = "";
        while (string.length < 64) {
            string += char[Math.floor(Math.random() * 62)];
        }
        string = encoding == "base32" ? Crypto.base32Encode(string) : Buffer.from(string).toString(encoding);
        return string.slice(0, end);
    }

    /**
     *
     * @param {Object} options
     * @property {String} type=totp
     * @property {String} label=label
     * @property {String} secret=<AUTO>
     * @property {String} encoding=base32
     * @property {String} issuer=issuer
     * @property {String} algorithm=sha1
     * @property {String} digits=6
     * @property {String} counter
     * @property {String} period=30
     * @returns {Object}
     */
    static generateOtpauth(options = {}) {
        let {
            //
            type = "totp",
            label = "label",
            secret,
            encoding = "base32",
            issuer = "issuer",
            algorithm = "sha1",
            digits = 6,
            counter,
            period = 30,
        } = options;
        secret = secret || this.generateSecret({ algorithm, encoding });

        let url = new URL2(`otpauth://${type}/${label}`);
        if (secret) url.searchParams.set("secret", secret);
        if (issuer) url.searchParams.set("issuer", encodeURIComponent(issuer));
        if (algorithm) url.searchParams.set("algorithm", algorithm.toUpperCase());
        if (digits) url.searchParams.set("digits", digits);
        if (counter && !type == "totp") url.searchParams.set("counter", counter);
        if (period && !type == "hotp") url.searchParams.set("period", period);
        url = "" + url;

        let url2 = new URL2(`https://www.google.com/chart?chs=200x200&chld=M|0&cht=qr`);
        url2.searchParams.set("chl", url);
        url2 = "" + url2;

        return url2;
    }
}

OTP.Generator = Generator;
OTP.Validator = Validator;
module.exports = OTP;

// // ### Usage
// var options = {
//     type: "totp",
//     label: "ndiing",
//     // secret,
//     encoding: "base32",
//     issuer: "ndiing.inc@google.com",
//     algorithm: "sha1",
//     digits: 6,
//     // counter,
//     period: 30,
// };
// var token = OTP.generate(options);
// console.log({token})

// var valid = OTP.validate(token,options);
// console.log({valid})

// var secret = OTP.generateSecret();
// console.log({secret})

// var url = OTP.generateOtpauth(options);
// console.log({url})

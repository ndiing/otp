const Crypto = require("@ndiinginc/crypto");
const { URL2 } = require("@ndiinginc/fetch");

/**
 *
 */
class Signer {
    /**
     * An HMAC-Based One-Time Password Algorithm
     * @param {Object} options - options
     * @param {String} options.encoding=ascii - set encoding
     * @param {String} options.secret - set secret
     * @param {String} options.algorithm=sha1 - set algorithm
     * @param {Number} options.digits=6 - set digits
     * @param {Number} options.counter=0 - set counter
     * @see https://www.rfc-editor.org/rfc/rfc4226.html
     */
    static hotp(options = {}) {
        let { encoding = "ascii", secret = "", algorithm = "sha1", digits = 6, counter = 0 } = options;
        if (encoding == "base32") {
            secret = Crypto.base32Decode(secret);
        } else {
            secret = Buffer.from(secret, encoding);
        }

        const data = Buffer.alloc(8);
        data.writeUInt32BE(counter, 4);

        const hmac = Crypto.hmac(data, { algorithm, key: secret });

        const offset = parseInt(hmac.charAt(hmac.length - 1), 16);

        let result = parseInt(hmac.substr(offset * 2, 2 * 4), 16);
        result = result & 0x7fffffff;
        result = String(result).padStart(digits, "0");
        result = result.slice(0 - digits);

        return result;
    }

    /**
     * Time-Based One-Time Password Algorithm
     * @param {Object} options - options
     * @param {Number} options.time=Date.now() - set time
     * @param {Number} options.epoch=0 - set epoch
     * @param {Number} options.period=30 - set period
     * @see https://www.rfc-editor.org/rfc/rfc6238.html
     */
    static totp(options = {}) {
        let { time = Date.now(), epoch = 0, period = 30 } = options;
        time = time / 1000;
        options.counter = Math.floor((time - epoch) / period);
        return this.hotp(options);
    }
}

/**
 *
 */
class Verifier {
    /**
     *
     */
    static hotp(data, options = {}) {
        return data == Signer.hotp(options);
    }

    /**
     *
     */
    static totp(data, options = {}) {
        return data == Signer.totp(options);
    }
}

/**
 *
 */
class OTP {
    /**
     *
     */
    static generate(options = {}) {
        const { type } = options;
        return Signer[type](options);
    }

    /**
     *
     */
    static validate(data, options = {}) {
        const { type } = options;
        return Verifier[type](data, options);
    }

    /**
     *
     */
    static secret(options = {}) {
        const { algorithm = "sha1", encoding = "base32" } = options;
        const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        let string = "";
        while (string.length < 64) {
            const number = Math.floor(Math.random() * char.length);
            string += char[number];
        }

        return Buffer.alloc(algorithm == "sha256" ? 32 : algorithm == "sha512" ? 64 : 20)
            .fill(encoding == "base32" ? Crypto.base32Encode(string) : Buffer.from(string).toString(encoding))
            .toString();
    }

    /**
     * @see https://github.com/google/google-authenticator/wiki/Key-Uri-Format
     */
    static authenticator(options = {}) {
        let { type = "totp", label = "label", secret = "", encoding = "base32", issuer = "", algorithm = "sha1", digits = 6, counter = 0, period = 30 } = options;
        let url = new URL2(`otpauth://${type}/${label}?PARAMETERS`);
        secret = secret || this.secret({ algorithm, encoding });
        if (secret) url.searchParams.set("secret", secret);
        if (issuer) url.searchParams.set("issuer", encodeURIComponent(issuer));
        if (algorithm) url.searchParams.set("algorithm", algorithm);
        if (digits) url.searchParams.set("digits", digits);
        if (type == "hotp" && counter !== undefined) url.searchParams.set("counter", counter);
        if (type == "totp" && period) url.searchParams.set("period", period);
        url = "" + url;

        let qr = new URL2("https://www.google.com/chart?chs=256x256&chld=M|0&cht=qr");
        qr.searchParams.set("chl", url);
        qr = "" + qr;
        return qr;
    }
}

module.exports = OTP;

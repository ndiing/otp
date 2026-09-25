const crypto = require("crypto");

/**@see https://www.rfc-editor.org/info/rfc4648/*/
const Base32Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

/**
 * @param {Buffer} buffer
 * @returns {String}
 */
function base32Encode(buffer) {
    let bits = "";
    let output = "";
    for (let byte of buffer) {
        bits += byte.toString(2).padStart(8, "0");
    }
    for (let i = 0; i < bits.length; i += 5) {
        const chunk = bits.slice(i, i + 5);
        if (chunk.length < 5) {
            output += Base32Alphabet[parseInt(chunk.padEnd(5, "0"), 2)];
        } else {
            output += Base32Alphabet[parseInt(chunk, 2)];
        }
    }
    while (output.length % 8 !== 0) {
        output += "=";
    }
    return output;
}

/**
 * @param {String} string
 * @returns {Buffer}
 */
function base32Decode(string) {
    let bits = "";
    const clean = string.replace(/=+$/, "").toUpperCase();
    for (let char of clean) {
        const val = Base32Alphabet.indexOf(char);
        if (val === -1) throw new Error("Invalid Base32 character");
        bits += val.toString(2).padStart(5, "0");
    }
    const output = [];
    for (let i = 0; i + 8 <= bits.length; i += 8) {
        output.push(parseInt(bits.slice(i, i + 8), 2));
    }
    return Buffer.from(output);
}

/**
 *
 * @typedef HOTPOptions
 * @property {String} secret
 * @property {Number} counter
 * @property {"SHA1"|"SHA256"|"SHA512"} [algorithm=SHA1]
 * @property {Number} [digits=6]
 * @property {String} [encoding=ascii]
 */

/**
 * @see https://www.rfc-editor.org/info/rfc4226/
 * @param {HOTPOptions} options
 * @returns {String}
 */
function hotp(options = {}) {
    const {
        //
        secret,
        counter,
        algorithm = "SHA1",
        digits = 6,
        encoding = "ascii",
    } = options;

    let key;
    if (encoding == "base32") {
        key = base32Decode(secret);
    } else {
        key = Buffer.from(secret, encoding);
    }

    const data = Buffer.alloc(8);
    data.writeUInt32BE(counter, 4);

    const hash = crypto.createHmac(algorithm, key).update(data).digest("hex");

    const offset = parseInt(hash.charAt(hash.length - 1), 16);
    let result = parseInt(hash.slice(offset * 2, offset * 2 + 2 * 4), 16);
    result = result & 0x7fffffff;

    return String(result)
        .slice(0 - digits)
        .padStart(digits, "0");
}

/**
 *
 * @typedef TOTPOptions
 * @property {Number} time - T
 * @property {Number} timeStart - T0
 * @property {Number} timeStep - X
 */

/**
 * @see https://www.rfc-editor.org/info/rfc6238/
 * @param {TOTPOptions & HOTPOptions} options
 * @returns {String}
 */
function totp(options = {}) {
    const {
        //
        secret,
        time = Math.floor(Date.now() / 1000),
        timeStart = 0,
        timeStep = 30,
        algorithm = "SHA1",
        digits = 6,
        encoding = "ascii",
    } = options;

    const counter = Math.floor((time - timeStart) / timeStep);

    return hotp({ secret, counter, algorithm, digits, encoding });
}

/**
 * @typedef RandomSecretOptions
 * @property {"SHA1"|"SHA256"|"SHA512"} [algorithm=SHA1]
 * @property {String} [encoding=ascii]
 */

const bytes = {
    SHA1: 20,
    SHA256: 32,
    SHA512: 64,
};
/**
 * @param {RandomSecretOptions} options
 */
function randomSecret(options = {}) {
    const {
        //
        algorithm = "SHA1",
        encoding = "hex",
    } = options;
    const length = bytes[algorithm.toUpperCase()];
    const buffer = crypto.randomBytes(length / 2);
    if (encoding == "base32") {
        return base32Encode(buffer);
    }
    return buffer.toString(encoding);
}

/**
 * @typedef OTPAUTHOptions
 * @property {"totp"|"hotp"} [type=totp]
 * @property {String} [label=label]
 * @property {String} secret
 * @property {"SHA1"|"SHA256"|"SHA512"} [algorithm=SHA1]
 * @property {Number} [digits=6]
 * @property {Number} counter
 * @property {Number} [period=30]
 * @property {String} issuer
 */

/**
 * @see https://www.ietf.org/archive/id/draft-linuxgemini-otpauth-uri-00.html
 * @param {OTPAUTHOptions} options
 */
function otpauth(options = {}) {
    let {
        //
        type = "totp",
        label = "label",
        secret,
        algorithm = "SHA1",
        digits = 6,
        counter,
        period = 30,
        issuer,
    } = options;

    const url = new URL(`otpauth://${type}/${label}`);
    if (!secret) {
        secret = randomSecret({ algorithm, encoding: "base32" });
    }
    url.searchParams.set("secret", secret);
    url.searchParams.set("algorithm", algorithm);
    url.searchParams.set("digits", digits);
    if (counter !== undefined) url.searchParams.set("counter", counter);
    url.searchParams.set("period", period);
    if (issuer) url.searchParams.set("issuer", issuer);

    const qr = new URL(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url.toString())}`);

    return {
        type,
        label,
        secret,
        algorithm,
        digits,
        counter,
        period,
        issuer,
        url: url.toString(),
        qr: qr.toString(),
    };
}

module.exports = {
    hotp,
    totp,
    randomSecret,
    otpauth,
};

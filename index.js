const Crypto = require("@ndiinginc/crypto");
const { URL2 } = require("@ndiinginc/fetch");

class Signer {
    // https://www.rfc-editor.org/rfc/rfc4226.html

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

    // https://www.rfc-editor.org/rfc/rfc6238.html

    static totp(options = {}) {
        let { time = Date.now(), epoch = 0, period = 30 } = options;
        time = time / 1000;
        options.counter = Math.floor((time - epoch) / period);
        return this.hotp(options);
    }
}

// console.log(Signer.hotp({
//     secret:'12345678901234567890'
// }))

class Verifier {
    static hotp(data, options = {}) {
        return data == Signer.hotp(options);
    }

    static totp(data, options = {}) {
        return data == Signer.totp(options);
    }
}

class OTP {
    static generate(options = {}) {
        const { type } = options;
        return Signer[type](options);
    }

    static validate(data, options = {}) {
        const { type } = options;
        return Verifier[type](data, options);
    }

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

    // https://github.com/google/google-authenticator/wiki/Key-Uri-Format

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
        // &chl=
        qr.searchParams.set("chl", url);
        qr = "" + qr;
        return qr;
    }
}

module.exports = OTP;

// const OTP = require('@ndiinginc/otp')

// // Generate random secret
// console.log(OTP.secret({encoding:'base32'}));
// console.log(OTP.secret({encoding:'base64'}));
// console.log(OTP.secret({encoding:'hex'}));
// console.log(OTP.secret({encoding:'ascii'}));
// console.log(OTP.secret({encoding:'base32', algorithm:'sha256'}));
// console.log(OTP.secret({encoding:'base64', algorithm:'sha256'}));
// console.log(OTP.secret({encoding:'hex', algorithm:'sha256'}));
// console.log(OTP.secret({encoding:'ascii', algorithm:'sha256'}));

// // Generate google authenticator
// console.log(OTP.authenticator());

// // Generate token
// console.log(OTP.generate({
//     type: "totp",
//     secret: "MVEFKULLOE4HURTBIFNH",
//     encoding: "base32",
//     algorithm: "sha1",
// }));

// // Validate token
// console.log(OTP.validate('745237',{
//     type: "totp",
//     secret: "MVEFKULLOE4HURTBIFNH",
//     encoding: "base32",
//     algorithm: "sha1",
// }));

const { hotp, totp, otpauth } = require("../src/otp");
const bytes = {
    SHA1: 20,
    SHA256: 32,
    SHA512: 64,
};

function generate(algorithm) {
    const secret = "12345678901234567890";
    const length = bytes[algorithm];
    return secret.repeat(Math.ceil(length / secret.length)).slice(0, length);
}
const secretSHA1 = generate("SHA1");
const secretSHA256 = generate("SHA256");
const secretSHA512 = generate("SHA512");

describe("example", () => {
    test("hotp counter 0", () => {
        const result = hotp({ secret: "12345678901234567890", counter: 0 });
        expect(result).toBe("755224");
    });
    test("hotp counter 1", () => {
        const result = hotp({ secret: "12345678901234567890", counter: 1 });
        expect(result).toBe("287082");
    });
    test("hotp counter 2", () => {
        const result = hotp({ secret: "12345678901234567890", counter: 2 });
        expect(result).toBe("359152");
    });
    test("hotp counter 3", () => {
        const result = hotp({ secret: "12345678901234567890", counter: 3 });
        expect(result).toBe("969429");
    });
    test("hotp counter 4", () => {
        const result = hotp({ secret: "12345678901234567890", counter: 4 });
        expect(result).toBe("338314");
    });
    test("hotp counter 5", () => {
        const result = hotp({ secret: "12345678901234567890", counter: 5 });
        expect(result).toBe("254676");
    });
    test("hotp counter 6", () => {
        const result = hotp({ secret: "12345678901234567890", counter: 6 });
        expect(result).toBe("287922");
    });
    test("hotp counter 7", () => {
        const result = hotp({ secret: "12345678901234567890", counter: 7 });
        expect(result).toBe("162583");
    });
    test("hotp counter 8", () => {
        const result = hotp({ secret: "12345678901234567890", counter: 8 });
        expect(result).toBe("399871");
    });
    test("hotp counter 9", () => {
        const result = hotp({ secret: "12345678901234567890", counter: 9 });
        expect(result).toBe("520489");
    });

    test("totp 59 SHA1", () => {
        const result = totp({ secret: secretSHA1, algorithm: "SHA1", time: 59 });
        expect(result).toBe("287082");
    });
    test("totp 59 SHA256", () => {
        const result = totp({ secret: secretSHA256, algorithm: "SHA256", time: 59 });
        expect(result).toBe("119246");
    });
    test("totp 59 SHA512", () => {
        const result = totp({ secret: secretSHA512, algorithm: "SHA512", time: 59 });
        expect(result).toBe("693936");
    });
    test("totp 1111111109 SHA1", () => {
        const result = totp({ secret: secretSHA1, algorithm: "SHA1", time: 1111111109 });
        expect(result).toBe("081804");
    });
    test("totp 1111111109 SHA256", () => {
        const result = totp({ secret: secretSHA256, algorithm: "SHA256", time: 1111111109 });
        expect(result).toBe("084774");
    });
    test("totp 1111111109 SHA512", () => {
        const result = totp({ secret: secretSHA512, algorithm: "SHA512", time: 1111111109 });
        expect(result).toBe("091201");
    });
    test("totp 1111111111 SHA1", () => {
        const result = totp({ secret: secretSHA1, algorithm: "SHA1", time: 1111111111 });
        expect(result).toBe("050471");
    });
    test("totp 1111111111 SHA256", () => {
        const result = totp({ secret: secretSHA256, algorithm: "SHA256", time: 1111111111 });
        expect(result).toBe("062674");
    });
    test("totp 1111111111 SHA512", () => {
        const result = totp({ secret: secretSHA512, algorithm: "SHA512", time: 1111111111 });
        expect(result).toBe("943326");
    });
    test("totp 1234567890 SHA1", () => {
        const result = totp({ secret: secretSHA1, algorithm: "SHA1", time: 1234567890 });
        expect(result).toBe("005924");
    });
    test("totp 1234567890 SHA256", () => {
        const result = totp({ secret: secretSHA256, algorithm: "SHA256", time: 1234567890 });
        expect(result).toBe("819424");
    });
    test("totp 1234567890 SHA512", () => {
        const result = totp({ secret: secretSHA512, algorithm: "SHA512", time: 1234567890 });
        expect(result).toBe("441116");
    });
    test("totp 2000000000 SHA1", () => {
        const result = totp({ secret: secretSHA1, algorithm: "SHA1", time: 2000000000 });
        expect(result).toBe("279037");
    });
    test("totp 2000000000 SHA256", () => {
        const result = totp({ secret: secretSHA256, algorithm: "SHA256", time: 2000000000 });
        expect(result).toBe("698825");
    });
    test("totp 2000000000 SHA512", () => {
        const result = totp({ secret: secretSHA512, algorithm: "SHA512", time: 2000000000 });
        expect(result).toBe("618901");
    });
    test("totp 20000000000 SHA1", () => {
        const result = totp({ secret: secretSHA1, algorithm: "SHA1", time: 20000000000 });
        expect(result).toBe("353130");
    });
    test("totp 20000000000 SHA256", () => {
        const result = totp({ secret: secretSHA256, algorithm: "SHA256", time: 20000000000 });
        expect(result).toBe("737706");
    });
    test("totp 20000000000 SHA512", () => {
        const result = totp({ secret: secretSHA512, algorithm: "SHA512", time: 20000000000 });
        expect(result).toBe("863826");
    });

    test("otpauth", () => {
        const result = otpauth({});
        expect(URL.canParse(result.url)).toBe(true)
    });
});

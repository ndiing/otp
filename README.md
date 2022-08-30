# otp


### Install
```
npm install @ndiinginc/otp
```

### Index
- Signer

    <!-- properties -->
    <!-- properties -->
    <!-- staticproperties -->
    <!-- staticproperties -->
    <!-- methods -->
    <!-- methods -->
    <!-- staticmethods -->
    - Static methods
        - [`Signer.hotp`](#astnode100000019)
        - [`Signer.totp`](#astnode100000161)
    <!-- staticmethods -->
    <!-- events -->
    <!-- events -->
- Verifier

    <!-- properties -->
    <!-- properties -->
    <!-- staticproperties -->
    <!-- staticproperties -->
    <!-- methods -->
    <!-- methods -->
    <!-- staticmethods -->
    - Static methods
        - [`Verifier.hotp`](#astnode100000216)
        - [`Verifier.totp`](#astnode100000232)
    <!-- staticmethods -->
    <!-- events -->
    <!-- events -->
- OTP

    <!-- properties -->
    <!-- properties -->
    <!-- staticproperties -->
    <!-- staticproperties -->
    <!-- methods -->
    <!-- methods -->
    <!-- staticmethods -->
    - Static methods
        - [`OTP.generate`](#astnode100000251)
        - [`OTP.validate`](#astnode100000270)
        - [`OTP.secret`](#astnode100000291)
        - [`OTP.authenticator`](#astnode100000386)
    <!-- staticmethods -->
    <!-- events -->
    <!-- events -->

# Signer
<!--  -->


<!-- examples -->
<!-- examples -->


<!-- constructor -->
### Constructor

<div><a href="./docs/astnode100000016.md" name="astnode100000016"><code>Signer()</code></a></div>


<!-- constructor -->

<!-- properties -->
<!-- properties -->
<!-- staticproperties -->
<!-- staticproperties -->
<!-- methods -->
<!-- methods -->
<!-- staticmethods -->
### Static methods

<div><a href="./docs/astnode100000019.md" name="astnode100000019"><code>Signer.hotp(options)</code></a></div>
An HMAC-Based One-Time Password Algorithm

<div><a href="./docs/astnode100000161.md" name="astnode100000161"><code>Signer.totp(options)</code></a></div>
Time-Based One-Time Password Algorithm

<!-- staticmethods -->
<!-- events -->
<!-- events -->

# Verifier
<!--  -->


<!-- examples -->
<!-- examples -->


<!-- constructor -->
### Constructor

<div><a href="./docs/astnode100000213.md" name="astnode100000213"><code>Verifier()</code></a></div>


<!-- constructor -->

<!-- properties -->
<!-- properties -->
<!-- staticproperties -->
<!-- staticproperties -->
<!-- methods -->
<!-- methods -->
<!-- staticmethods -->
### Static methods

<div><a href="./docs/astnode100000216.md" name="astnode100000216"><code>Verifier.hotp(data,options)</code></a></div>


<div><a href="./docs/astnode100000232.md" name="astnode100000232"><code>Verifier.totp(data,options)</code></a></div>


<!-- staticmethods -->
<!-- events -->
<!-- events -->

# OTP
<!--  -->


<!-- examples -->
<!-- examples -->


<!-- constructor -->
### Constructor

<div><a href="./docs/astnode100000248.md" name="astnode100000248"><code>OTP()</code></a></div>


<!-- constructor -->

<!-- properties -->
<!-- properties -->
<!-- staticproperties -->
<!-- staticproperties -->
<!-- methods -->
<!-- methods -->
<!-- staticmethods -->
### Static methods

<div><a href="./docs/astnode100000251.md" name="astnode100000251"><code>OTP.generate(options)</code></a></div>


<div><a href="./docs/astnode100000270.md" name="astnode100000270"><code>OTP.validate(data,options)</code></a></div>


<div><a href="./docs/astnode100000291.md" name="astnode100000291"><code>OTP.secret(options)</code></a></div>


<div><a href="./docs/astnode100000386.md" name="astnode100000386"><code>OTP.authenticator(options)</code></a></div>


<!-- staticmethods -->
<!-- events -->
<!-- events -->


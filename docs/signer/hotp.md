## Signer.hotp()
_An HMAC-Based One-Time Password Algorithm_

### Syntax
```
hotp(options)
```

### Parameters
<dl>
    <dt><code>options</code></dt>
    <dd>A <code>Object</code> options</dd>
    <dt><code>options.encoding</code></dt>
    <dd>A <code>String</code> set encoding, The default is <code>ascii</code></dd>
    <dt><code>options.secret</code></dt>
    <dd>A <code>String</code> set secret</dd>
    <dt><code>options.algorithm</code></dt>
    <dd>A <code>String</code> set algorithm, The default is <code>sha1</code></dd>
    <dt><code>options.digits</code></dt>
    <dd>A <code>Number</code> set digits, The default is <code>6</code></dd>
    <dt><code>options.counter</code></dt>
    <dd>A <code>Number</code> set counter</dd>
</dl>

### Return value

<dl>
    <dt>None <code>undefined</code></dt>
</dl>


### See also
- [https://www.rfc-editor.org/rfc/rfc4226.html](https://www.rfc-editor.org/rfc/rfc4226.html)


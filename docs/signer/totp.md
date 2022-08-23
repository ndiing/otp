## Signer.totp()
_Time-Based One-Time Password Algorithm_

### Syntax
```
totp(options)
```

### Parameters
<dl>
    <dt><code>options</code></dt>
    <dd>A <code>Object</code> options, The default is <code></code></dd>
    <dt><code>options.time</code></dt>
    <dd>A <code>Number</code> set time, The default is <code>Date.now()</code></dd>
    <dt><code>options.epoch</code></dt>
    <dd>A <code>Number</code> set epoch, The default is <code>0</code></dd>
    <dt><code>options.period</code></dt>
    <dd>A <code>Number</code> set period, The default is <code>30</code></dd>
</dl>

### Return value

<dl>
    <dt>None <code>undefined</code></dt>
</dl>


### See also
- [https://www.rfc-editor.org/rfc/rfc6238.html](https://www.rfc-editor.org/rfc/rfc6238.html)


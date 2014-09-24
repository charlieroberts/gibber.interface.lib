gibber.interface.lib
==========

This library provides the interface capabilities of Gibber without the code editing environment.

## Building (for development)

You can simply download the repo and skip straight to the usage section if you don't need to modify the library. If you want to modify gibber.lib, here's how to build it:

1. If you don't have it, install npm (the node.js package manager) from http://npmjs.org
2. Inside the top level of the repo, run `npm install` in the terminal.
3. Run `gulp`. This is a build module that is installed in step 2.

The build outputs a UMD file, gibber.interface.lib.js, and a minified version.

## Usage
The library can be used with plain script tags, CommonJS or AMD style includes. Below is a simple example that displays four interactive widgets
```html
<html>

<head>
  <script src='build/gibber.interface.lib.js'></script>
</head>

<body></body>

<script>
Gibber.init()

a = Slider({ label:'slider' })
b = Button({ label:'button' })
c = Crossfader()
d = Keyboard()

</script>

</html>
```

If you want to use CommonJS (node or browserify), just use the following to start things off (assuming you have the module installed):

```js
Gibber = require( 'gibber.interface.lib' )
Gibber.init()
```
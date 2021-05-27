[![NPM version][npm-image]][npm-url]
[![NPM quality][quality-image]][quality-url]
[![npm download][download-image]][download-url]
[![build status][travis-image]][travis-url]

[travis-image]: https://travis-ci.org/didi/slime-validator.svg?branch=master&status=passed
[travis-url]: https://travis-ci.org/didi/slime-validator
[download-image]: https://img.shields.io/npm/dm/slime-validator.svg?style=flat-square
[download-url]: https://npmjs.org/package/slime-validator
[npm-image]: https://img.shields.io/npm/v/slime-validator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/slime-validator
[quality-image]: http://npm.packagequality.com/shield/slime-validator.svg?style=flat-square
[quality-url]: http://packagequality.com/#?package=slime-validator
[codecov-image]: https://img.shields.io/codecov/c/github/didi/slime-validator.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/didi/slime-validator

# slime-validator 
`slime-validator` is a JavaScript library of validation based on `Plugin` system and make data validation be easy.

# Description
`slime-validator` make data validation with less code, save more than 20% code than others.

Plugin system let you make your own validate rules very easy and complex validate rule too. Both on Browser and Nodejs.

# Installation

### Using npm
```sh
  $ npm install slime-validator -save
```

### Browser
```js
  <script src="${YOUR_PATH}/slime-validator.js"></script>
```

# Basic Usage

### For es module
```js
  import Validator from 'slime-validator'

  // One
  const V1 = new Validator({ Required:true })
  console.log(V1.validate('Hello world')) // Output: null
  console.log(V1.validate()) // Output: Input is required

  // Two
  console.log(Validator.validate({ Required:true }, 'Hello world')) // Output: null
  console.log(Validator.validate({ Required:true }, null)) // Output: Input is required
```

### For CDN
```html
  <html>
    <script src="https://unpkg.com/slime-validator@1.0.3/dist/slime-validator.umd.js"></script>
    <script>
      let ret = null

      const v = new window.SlimeValidator({
        field: [{ MaxLength: 10 }]
      })
      ret = v.validate({field: '11222222221'})
      console.log(JSON.stringify(ret))
    </script>
    <body>

    </body>
  </html>
```

# Custom Validation Rule
```js
  Validator.usePlugin({
    tagName: 'IsNotRequired',
    message(field, value, opts) {
      return `${field} Check failed`
    },
    validate(field, value, opts) {
      return false
    }
  }, true) // true means to replace the exist rule with the same name.

  const V7 = new Validator({
    field: { IsNotRequired: true }
  })
  console.log(V7.validate({
    field: "Something"
  })) // Output：{ field: 'field Check failed' }
```

For more information you can read [Document](docs/index.md)

const {
  isString
} = require('../utils')

const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

module.exports = {
  tagName: "IsEmail",
  message (field, value, opts) {
    return `${field} is not a email`
  },
  validate (field, value, opts) {
    const { tagValue } = opts;
    if (!tagValue || !value) {
      return true;
    }

    if (isString(value)) {
      return !!value.match(reg)
    }

    return false
  }
}
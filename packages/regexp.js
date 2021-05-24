const {
  isString,
  isRegExp
} = require('../utils')

module.exports = {
  tagName: "RegExp",
  message (field, value, opts) {
    return `Test ${field} is failed`
  },
  validate (field, value, opts) {
    const { tagValue } = opts;
    let reg = tagValue;

    if (isString(reg)) {
      reg = new RegExp(reg);
    }

    if (isRegExp(reg)) {
      return reg.test(value);
    }

    return true
  }
}
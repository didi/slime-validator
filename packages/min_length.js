const {
  isArray,
  isString
} = require('../utils')

module.exports = {
  tagName: "MinLength",
  message (field, value, opts) {
    const { tagValue = 0 } = opts;
    return `Min length of ${field} is ${tagValue}`
  },
  validate (field, value, opts) {
    const { tagValue = 0 } = opts;
    if (!value && value !== '') {
      return true;
    }
    // Array
    if (isArray(value) && value.length >= tagValue) {
      return true;
    }
    // String
    if (isString(value) && value.length >= tagValue) {
      return true;
    }

    return false;
  }
}

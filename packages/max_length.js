const {
  isArray,
  isString
} = require('../utils')

module.exports = {
  tagName: "MaxLength",
  message (field, value, opts) {
    const { tagValue = 0 } = opts;
    return `Max length of ${field} is ${tagValue}`
  },
  validate (field, value, opts) {
    const { tagValue = 0 } = opts;
    if (!value) {
      return true;
    }
    // Array
    if (isArray(value) && value.length <= tagValue) {
      return true;
    }
    // String
    if (isString(value) && value.length <= tagValue) {
      return true;
    }

    return false;
  }
}

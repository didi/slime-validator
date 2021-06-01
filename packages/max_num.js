const {
  isNumber
} = require('../utils')

module.exports = {
  tagName: "MaxNum",
  message (field, value, opts) {
    const { tagValue = 0 } = opts;
    return `Max value of ${field} is ${tagValue}`
  },
  validate (field, value, opts) {
    const { tagValue = 0 } = opts;
    if (!value) {
      return true;
    }
    if (isNumber(value) && value <= tagValue) {
      return true;
    }

    return false;
  }
}

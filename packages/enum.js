const {
  isArray
} = require('../utils')

module.exports = {
  tagName: "Enum",
  message (field, value, opts) {
    return `${field} with value ${value} is incorrect`
  },
  validate (field, value, opts) {
    const { tagValue } = opts;

    if (!value) {
      return true;
    }

    if (!isArray(tagValue)) {
      return true; // 枚举值列表不对
    }

    return tagValue.indexOf(value) > -1
  }
}


const {
  isArray,
  isString,
  isObject
} = require('../utils')

module.exports = {
  tagName: "NotEmpty",
  message (field, value, opts) {
    return `${field} is empty`
  },
  validate (field, value, opts) {
    const { tagValue = false } = opts;
    if (!tagValue || value === null || value === undefined) {
      return true;
    }
    // Array is empty
    if (isArray(value) && value.length > 0) {
      return true;
    }
    // String is empty
    if (isString(value) && value.length > 0) {
      return true;
    }
    // Object is empty
    if (isObject(value) && Object.keys(value).length > 0) {
      return true;
    }

    return false;
  }
}


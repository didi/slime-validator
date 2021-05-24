module.exports = {
  tagName: "Required",
  message (field, value, opts) {
    return `${field} is required`
  },
  validate (field, value, opts) {
    const { tagValue = false } = opts;
    if (!tagValue) {
      return true;
    }
    if (value === null || value === undefined) {
      return false;
    }
    return true
  }
}

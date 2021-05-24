module.exports = {
  isArray(arr) {
    return Array.isArray(arr)
  },
  isObject(o) {
    return Object.prototype.toString.call(o) === "[object Object]"
  },
  isString(s) {
    return Object.prototype.toString.call(s) === "[object String]"
  },
  isFunction(f) {
    return Object.prototype.toString.call(f) === "[object Function]"
  },
  isNumber(n) {
    return Object.prototype.toString.call(n) === "[object Number]" && !isNaN(n)
  },
  isRegExp(r) {
    return Object.prototype.toString.call(r) === "[object RegExp]"
  }
}
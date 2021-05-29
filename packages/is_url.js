const {
  isString
} = require('../utils')

module.exports = {
  tagName: "IsURL",
  message (field, value, opts) {
    return `${field} is not a url`
  },
  validate (field, value, opts) {
    // allowDataUrl 是否是数据地址 base64
    // allowLocal 是否是本地连接
    // schemes
    const { tagValue, allowDataUrl = false, allowLocal = false, schemes = ['http', 'https'] } = opts;

    if (!tagValue || !value) {
      return true;
    }

    if (!isString(value)) {
      return false;
    }
    // https://gist.github.com/dperini/729294

    let regex =
      "^" +
      // protocol identifier
      "(?:(?:" + schemes.join("|") + ")://)" +
      // user:pass authentication
      "(?:\\S+(?::\\S*)?@)?" +
      "(?:";

    let tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";

    if (allowLocal) {
      tld += "?";
    } else {
      regex +=
        // IP address exclusion
        // private & local networks
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})";
    }

    regex +=
        // IP address dotted notation octets
        // excludes loopback network 0.0.0.0
        // excludes reserved space >= 224.0.0.0
        // excludes network & broacast addresses
        // (first & last IP address of each class)
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
        // host name
        "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
        // domain name
        "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
        tld +
      ")" +
      // port number
      "(?::\\d{2,5})?" +
      // resource path
      "(?:[/?#]\\S*)?" +
    "$";

    if (allowDataUrl) {
      // RFC 2397
      let mediaType = "\\w+\\/[-+.\\w]+(?:;[\\w=]+)*";
      let urlChar = "[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*";
      let dataUrl = "data:(?:"+mediaType+")?(?:;base64)?,"+urlChar;
      regex = "(?:"+regex+")|(?:^"+dataUrl+"$)";
    }

    return !!value.match(regex)
  }
}

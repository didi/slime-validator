const Validator = require('./../index.js');

Validator.usePlugin({
  tagName: "AwardType",
  message(field, value, opts) {
    const { tagValue, parent } = opts;
    return `该类型奖励只允许在指定国家开放, 当前值为 ${value} 有效值为 ${tagValue[parent.country]}`
  },
  validate(field, value, opts) {
    const { tagValue, parent } = opts;
    return tagValue[parent.country].indexOf(value) > -1
  }
})

const rules = {
  country: { Required: true, Enum: ["BR", "MX", "JP"], message: "国家内容不合法" },
  award_type: { Required: true,  AwardType: {
    BR: [1, 3],
    MX: [1, 2, 3],
    JP: [2, 3]
  }}
}

const V = new Validator(rules);

// BR
console.log("BR", JSON.stringify(Validator.validate(rules, {
  country: "BR",
  award_type: 1
})))
console.log("BR", JSON.stringify(V.validate({
  country: "BR",
  award_type: 2
})))

// MX
console.log("MX", JSON.stringify(Validator.validate(rules, {
  country: "MX",
  award_type: 1
})))
console.log("MX", JSON.stringify(V.validate({
  country: "MX",
  award_type: 2
})))

// JP
console.log("JP", JSON.stringify(Validator.validate(rules, {
  country: "JP",
  award_type: 1
})))
console.log("JP", JSON.stringify(V.validate({
  country: "JP",
  award_type: 2
})))
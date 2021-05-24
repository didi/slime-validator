const Validator = require('./../index');

describe("Rule校验", () => {
  it("tag没有注册", () => {
    let ret = null
    try {
      const v = new Validator({
        field: { required: true }
      })
      ret = v.validate({})
    } catch (e) {
      expect(e.message)
        .toBe('Plugin with tagName = required is not registered!');
    }
  });

  it("一个rule中一个tag", () => {
    let ret = null
    try {
      const v = new Validator({
        field: { Required: true }
      })
      ret = v.validate({})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": "field is required"
        }));
    }
  });

  it("单一值校验", () => {
    let ret = null
    try {
      const v = new Validator({ Enum: [true, false] })
      ret = v.validate(1)
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify("Input with value 1 is incorrect"));
    }
  });

  it("一个rule中多个tag", () => {
    let ret1 = null
    let ret2 = null
    try {
      const v = new Validator({
        field: { Required: true, NotEmpty: true }
      })
      ret1 = v.validate({})
      ret2 = v.validate({ field: '' })
    } finally {
      expect(JSON.stringify(ret1))
        .toBe(JSON.stringify({
          "field": "field is required"
        }));
      expect(JSON.stringify(ret2))
        .toBe(JSON.stringify({
          "field": "field is empty"
        }));
    }
  })

  it("一个rule中多个tag, 自定义覆盖消息", () => {
    let ret1 = null
    let ret2 = null
    try {
      const v = new Validator({
        field: { Required: true, NotEmpty: true, message: "覆盖消息" }
      })
      ret1 = v.validate({})
      ret2 = v.validate({ field: '' })
    } finally {
      expect(JSON.stringify(ret1))
        .toBe(JSON.stringify({
          "field": "覆盖消息"
        }));
      expect(JSON.stringify(ret2))
        .toBe(JSON.stringify({
          "field": "覆盖消息"
        }));
    }
  });

  it("自定义规则覆盖消息", () => {
    let ret = null
    try {
      const v = new Validator({
        field: { Required: true, validate() { return false } }
      })
      ret = v.validate({ field: '' })
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": "field is required"
        }));
    }
  });

  it("嵌套对象,一层属性", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{
          Required: true, $fields: {
            field1: { Required: true }
          }
        }]
      })
      ret = v.validate({ field: {} })
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": { field1: 'field1 is required' }
        }));
    }
  });

  it("嵌套对象,一层属性多属性", () => {
    let ret = null
    try {
      const v = new Validator({
        field: {
          Required: true, $fields: {
            field1: { Required: true },
            field2: { Required: true }
          }
        }
      })
      ret = v.validate({ field: {} })
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": {
            field1: 'field1 is required',
            field2: 'field2 is required'
          }
        }));
    }
  });

  it("嵌套对象,二层属性", () => {
    let ret = null
    try {
      const v = new Validator({
        field: {
          Required: true, $fields: {
            field1: {
              Required: true, $fields: {
                field2: { Required: true }
              }
            }
          }
        }
      })
      ret = v.validate({ field: { field1: {} } })
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": { field1: { field2: 'field2 is required' } }
        }));
    }
  });

  it("嵌套对象,二层属性多属性", () => {
    let ret = null
    try {
      const v = new Validator({
        field: {
          Required: true, $fields: {
            field1: {
              Required: true, $fields: {
                field2: { Required: true }
              }
            },
            field2: {
              Required: true, $fields: {
                field2: { Required: true }
              }
            }
          }
        }
      })
      ret = v.validate({ field: { field1: {} } })
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": {
            field1: {
              field2: 'field2 is required'
            },
            field2: 'field2 is required'
          }
        }));
    }
  });

  it("嵌套数组 基本元素数组 多tag", () => {
    let ret = null
    try {
      const v = new Validator({
        field: { $fields: { Required: true, Enum: [1, 2, 3] } }
      })
      ret = v.validate({ field: [4, 1, undefined] })
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": ["field with value 4 is incorrect", null, "field is required"]
        }));
    }
  });

  it("嵌套数组 复合元素数组 数组内对象字段校验", () => {
    let ret = null
    try {
      const v = new Validator({
        field: {
          $fields: {
            field1: { Required: true }
          }
        }
      })
      ret = v.validate({ field: [{ field1: null }] })
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({"field":[{"field1":"field1 is required"}]}));
    }
  });

  it("嵌套数组 复合元素数组 数组内对象多字段校验", () => {
    let ret = null
    try {
      const v = new Validator({
        field: {
          $fields: {
            field1: { Required: true },
            field2: { Required: true }
          }
        }
      })
      ret = v.validate({ field: [{ field1: null }] })
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": [{"field1":"field1 is required","field2":"field2 is required"}]
        }));
    }
  });

  it("嵌套数组 复合元素数组 数组内多元素多字段校验", () => {
    let ret = null
    try {
      const v = new Validator({
        field: {
          $fields: {
            field1: { Required: true },
            field2: { Required: true }
          }
        }
      })
      ret = v.validate({ field: [{ field1: null }, { field2: "" }] })
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": [{
            "field1": "field1 is required",
            "field2": "field2 is required"
          }, {
            "field1": "field1 is required"
          }]
        }));
    }
  });

  it("嵌套数组 复合元素数组 数组内对象，数组混合校验", () => {
    let ret = null
    try {
      const v = new Validator({
        field: {
          $fields: {
            field1: { Required: true },
            field2: [{ Required: true }, { $fields: [{ Enum: [1, 2, 3] }] }]
          }
        }
      })
      ret = v.validate({ field: [{ field1: null }, { field2: [4] }] })
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": [{
            "field1": "field1 is required",
            "field2": "field2 is required"
          }, {
            "field1": "field1 is required",
            "field2": ["field2 with value 4 is incorrect"]
          }]
        }));
    }
  });

  it("嵌套数组 复合元素数组 多层嵌套", () => {
    let ret = null
    try {
      const v = new Validator({
        field: {
          $fields: {
            field1: { Required: true },
            field2: [{ Required: true }, { $fields: [{ Enum: [1, 2, 3] }] }]
          }
        }
      })
      ret = v.validate({ field: [{ field1: null }, { field2: [4] }] })
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": [{
            "field1": "field1 is required",
            "field2": "field2 is required"
          }, {
            "field1": "field1 is required",
            "field2": ["field2 with value 4 is incorrect"]
          }]
        }));
    }
  });

  it("数组类型校验 返回错误信息格式校验 1", () => {
    let ret = null
    try {
      const v = new Validator({
        field: {
          $fields: {
            field1: { Required: true },
            field2: [{ Required: true }, { $fields: [{ Enum: [1, 2, 3] }] }]
          }
        }
      })
      ret = v.validate({ field: [{ field1: null }, { field2: [4, 1, 9] }] })
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": [{
            "field1": "field1 is required",
            "field2": "field2 is required"
          }, {
            "field1": "field1 is required",
            "field2": ["field2 with value 4 is incorrect", null, "field2 with value 9 is incorrect"]
          }]
        }));
    }
  });

  it("数组类型校验 返回错误信息格式校验 2", () => {
    let ret = null
    try {
      const v = new Validator({
        field: {
          $fields: { Required: true, MinNum: 200 }
        }
      })
      ret = v.validate({ field: [1, 2000, 2] })
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": ["Min value of field is 200", null, "Min value of field is 200"]
        }));
    }
  });
})
const Validator = require('./../index');

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
  console.log(JSON.stringify(ret))
}

try {
  const v = new Validator({
    field: {
      $fields: { Required: true, MinNum: 200 }
    }
  })
  ret = v.validate({ field: [1, 2000, 2] })
} finally {
  console.log(JSON.stringify(ret))
}

  // 校验一个嵌套数组
  const V4 = new Validator({
    persons: {
      MinLength: 2,
      $fields: {
        name: { Required: true }
      }
    }
  })
  console.log(JSON.stringify(V4.validate({
    persons: []
  }))) // 输出：{"persons":"Min length of persons is 2"}
  console.log(JSON.stringify(V4.validate({
    persons: [{},{name: "太君是我，别开枪"},{}]
  }))) // 输出：{"persons":{"0":{"name":"name is required"},{"1":{"name":"name is required"}}}


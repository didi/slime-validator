const Validator = require('./../index');

describe("默认Rule校验", () => {
  it("Required Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ Required: true }]
      })
      ret = v.validate({field: "ok"})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify(null));
    }

    ret = Validator.validate({
      field: [{ Required: true }]
    }, {field: "ok"});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("Required Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ Required: true }]
      })
      ret = v.validate({})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": "field is required"
        }));
    }

    ret = Validator.validate({
      field: [{ Required: true }]
    }, {});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify({
        "field": "field is required"
      }));
  });

  it("Enum Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ Enum: [1, 2, 3]}]
      })
      ret = v.validate({field: 1})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify(null));
    }

    ret = Validator.validate({
      field: [{ Enum: [1, 2, 3]}]
    }, {field: 1});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("Enum Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ Enum: [1, 2, 3]}]
      })
      ret = v.validate({field: 1111})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({
          "field": "field with value 1111 is incorrect"
        }));
    }

    ret = Validator.validate({
      field: [{ Enum: [1, 2, 3]}]
    }, {field: 1111});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify({
        "field": "field with value 1111 is incorrect"
      }));
  });

  it("NotEmpty String Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ NotEmpty: true }]
      })
      ret = v.validate({field: 'test'})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify(null));
    }

    ret = Validator.validate({
      field: [{ NotEmpty: true }]
    }, {field: 'test'});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("NotEmpty String Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ NotEmpty: true }]
      })
      ret = v.validate({field: ''})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({"field":"field is empty"}));
    }

    ret = Validator.validate({
      field: [{ NotEmpty: true }]
    }, {field: ''});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify({"field":"field is empty"}));
  });

  it("NotEmpty Array Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ NotEmpty: true }]
      })
      ret = v.validate({field: [1]})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify(null));
    }

    ret = Validator.validate({
      field: [{ NotEmpty: true }]
    }, {field: [1]});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("NotEmpty Array Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ NotEmpty: true }]
      })
      ret = v.validate({field: []})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({"field":"field is empty"}));
    }

    ret = Validator.validate({
      field: [{ NotEmpty: true }]
    }, {field: []});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify({"field":"field is empty"}));
  });

  it("NotEmpty Object Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ NotEmpty: true }]
      })
      ret = v.validate({field: {a : 1}})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify(null));
    }

    ret = Validator.validate({
      field: [{ NotEmpty: true }]
    }, {field: {a : 1}});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("NotEmpty Object Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ NotEmpty: true }]
      })
      ret = v.validate({field: {}})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({"field":"field is empty"}));
    }

    ret = Validator.validate({
      field: [{ NotEmpty: true }]
    }, {field: {}});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify({"field":"field is empty"}));
  });

  it("MaxLength String Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ MaxLength: 10 }]
      })
      ret = v.validate({field: '111'})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify(null));
    }

    ret = Validator.validate({
      field: [{ NotEmpty: true }]
    }, {field: '111'});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("MaxLength String Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ MaxLength: 10 }]
      })
      ret = v.validate({field: '01234567890'})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({"field":"Max length of field is 10"}));
    }

    ret = Validator.validate({
      field: [{ MaxLength: 10 }]
    }, {field: '01234567890'});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify({"field":"Max length of field is 10"}));
  });

  it("MaxLength Array Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ MaxLength: 10 }]
      })
      ret = v.validate({field: [1, 2, 3]})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify(null));
    }

    ret = Validator.validate({
      field: [{ MaxLength: 10 }]
    }, {field: [1, 2, 3]});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("MaxLength Array Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ MaxLength: 10 }]
      })
      ret = v.validate({field: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1]})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({"field":"Max length of field is 10"}));
    }

    ret = Validator.validate({
      field: [{ MaxLength: 10 }]
    }, {field: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1]});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify({"field":"Max length of field is 10"}));
  });

  it("MinLength String Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ MinLength: 10 }]
      })
      ret = v.validate({field: '01234567890'})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify(null));
    }

    ret = Validator.validate({
      field: [{ MinLength: 10 }]
    }, {field: '01234567890'});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("MinLength String Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ MinLength: 10 }]
      })
      ret = v.validate({field: '0'})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({"field":"Min length of field is 10"}));
    }

    ret = Validator.validate({
      field: [{ MinLength: 10 }]
    }, {field: '0'});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify({"field":"Min length of field is 10"}));
  });

  it("MinLength Array Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ MinLength: 10 }]
      })
      ret = v.validate({field: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1]})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify(null));
    }

    ret = Validator.validate({
      field: [{ MinLength: 10 }]
    }, {field: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1]});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("MinLength Array Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ MinLength: 10 }]
      })
      ret = v.validate({field: [1, 2, 3]})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({"field":"Min length of field is 10"}));
    }

    ret = Validator.validate({
      field: [{ MinLength: 10 }]
    }, {field: [1, 2, 3, ]});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify({"field":"Min length of field is 10"}));
  });

  it("MaxNum Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ MaxNum: 10 }]
      })
      ret = v.validate({field: 9})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify(null));
    }

    ret = Validator.validate({
      field: [{ MaxNum: 10 }]
    }, {field: 9});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("MaxNum Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ MaxNum: 10 }]
      })
      ret = v.validate({field: 11})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({"field":"Max value of field is 10"}));
    }

    ret = Validator.validate({
      field: [{ MaxNum: 10 }]
    }, {field: 11});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify({"field":"Max value of field is 10"}));
  });

  it("MinNum Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ MinNum: 10 }]
      })
      ret = v.validate({field: 19})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify(null));
    }

    ret = Validator.validate({
      field: [{ MinNum: 10 }]
    }, {field: 19});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("MinNum Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ MinNum: 10 }]
      })
      ret = v.validate({field: 6})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({"field":"Min value of field is 10"}));
    }

    ret = Validator.validate({
      field: [{ MinNum: 10 }]
    }, {field: 6});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify({"field":"Min value of field is 10"}));
  });

  it("RegExp Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ RegExp: /^a/g }]
      })
      ret = v.validate({field: 'atest'})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify(null));
    }

    ret = Validator.validate({
      field: [{ RegExp: /^a/g }]
    }, {field: 'atest'});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("RegExp Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ RegExp: '^a' }]
      })
      ret = v.validate({field: 'atest'})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify(null));
    }

    ret = Validator.validate({
      field: [{ RegExp: '^a' }]
    }, {field: 'atest'});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("RegExp Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: [{ RegExp: /^a/g }]
      })
      ret = v.validate({field: 'test'})
    } finally {
      expect(JSON.stringify(ret))
        .toBe(JSON.stringify({"field":"Test field is failed"}));
    }

    ret = Validator.validate({
      field: [{ RegExp: '^a' }]
    }, {field: 'test'});

    expect(JSON.stringify(ret))
    .toBe(JSON.stringify({"field":"Test field is failed"}));
  });

  it("IsEmail Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: { IsEmail: true }
      })
      ret = v.validate({field: 'benmo1602@gmail.com'})
    } finally {
      expect(JSON.stringify(ret)).toBe(JSON.stringify(null));
    }
    ret = Validator.validate({field: [{ IsEmail: true }]}, {field: 'benmo1602@gmail.com'});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("IsEmail Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: { IsEmail: true }
      })
      ret = v.validate({field: 'benmo1602.com'})
    } finally {
      expect(JSON.stringify(ret)).toBe(JSON.stringify({field: 'field is not a email'}));
    }
    ret = Validator.validate({field: [{ IsEmail: true }]}, {field: 'benmo1602.com'});

    expect(JSON.stringify(ret)).toBe(JSON.stringify({field: 'field is not a email'}));
  });

  it("IsURL Success", () => {
    let ret = null
    try {
      const v = new Validator({
        field: { IsURL: true }
      })
      ret = v.validate({field: 'https://gist.github.com/dperini/729294'})
    } finally {
      expect(JSON.stringify(ret)).toBe(JSON.stringify(null));
    }
    ret = Validator.validate({field: [{ IsURL: true }]}, {field: 'https://gist.github.com/dperini/729294'});

    expect(JSON.stringify(ret))
      .toBe(JSON.stringify(null));
  });

  it("IsURL Failed", () => {
    let ret = null
    try {
      const v = new Validator({
        field: { IsURL: true }
      })
      ret = v.validate({field: 'gist.github.com/dperini/729294'})
    } finally {
      expect(JSON.stringify(ret)).toBe(JSON.stringify({field: 'field is not a url'}));
    }
    ret = Validator.validate({field: [{ IsURL: true }]}, {field: 'gist.github.com/dperini/729294'});
    expect(JSON.stringify(ret)).toBe(JSON.stringify({field: 'field is not a url'}));
  });
})

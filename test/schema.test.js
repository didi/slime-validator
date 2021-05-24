const Validator = require('../index');

describe("Schema校验", () => {
  it("Validator构造器测试，空参数", () => {
    try {
      new Validator()
    } catch (err) {
      expect(err.message).toBe('Schema must be an Object or Array');
    }
  });

  it("Validator构造器测试，非法参数 null", () => {
    try {
      new Validator(null)
    } catch (err) {
      expect(err.message).toBe('Schema must be an Object or Array');
    }
  });

  it("Validator构造器测试，非法参数 ''", () => {
    try {
      new Validator('')
    } catch (err) {
      expect(err.message).toBe('Schema must be an Object or Array');
    }
  });

  it("Validator构造器测试，非法参数 Date", () => {
    try {
      new Validator(new Date())
    } catch (err) {
      expect(err.message).toBe('Schema must be an Object or Array');
    }
  });
});

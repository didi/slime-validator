const Validator = require('./../index');

describe("插件校验", () => {
  it("usePlugin校验，空参数", () => {
    let ret = null
    try {
      ret = Validator.usePlugin()
    } catch (err) {
      expect(err.message).toBe('Parameter must be Object ant can not be empty');
    } finally {
      expect(ret).toBe(null);
    }
  });

  it("usePlugin校验，非法参数 []", () => {
    let ret = null
    try {
      ret = Validator.usePlugin([])
    } catch (err) {
      expect(err.message).toBe('Parameter must be Object ant can not be empty');
    } finally {
      expect(ret).toBe(null);
    }
  });

  it("usePlugin校验，非法参数 Date", () => {
    let ret = null
    try {
      ret = Validator.usePlugin(new Date())
    } catch (err) {
      expect(err.message).toBe('Parameter must be Object ant can not be empty');
    } finally {
      expect(ret).toBe(null);
    }
  });

  it("usePlugin校验，非法参数 ''", () => {
    let ret = null
    try {
      ret = Validator.usePlugin("")
    } catch (err) {
      expect(err.message).toBe('Parameter must be Object ant can not be empty');
    } finally {
      expect(ret).toBe(null);
    }
  });

  it("usePlugin校验，非法参数 缺失tagName", () => {
    let ret = null
    try {
      ret = Validator.usePlugin({

      })
    } catch (err) {
      expect(err.message).toBe('tagName must be String and not empty.');
    } finally {
      expect(ret).toBe(null);
    }
  });

  it("usePlugin校验，非法参数 缺失message", () => {
    let ret = null
    try {
      ret = Validator.usePlugin({
        tagName: "jest"
      })
    } catch (err) {
      expect(err.message).toBe('message and validate must be Function.');
    } finally {
      expect(ret).toBe(null);
    }
  });

  it("usePlugin校验，非法参数 message", () => {
    let ret = null
    try {
      ret = Validator.usePlugin({
        tagName: "jest",
        message: ""
      })
    } catch (err) {
      expect(err.message).toBe('message and validate must be Function.');
    } finally {
      expect(ret).toBe(null);
    }
  });

  it("usePlugin校验，非法参数 缺失validate", () => {
    let ret = null
    try {
      ret = Validator.usePlugin({
        tagName: "jest",
        message() {}
      })
    } catch (err) {
      expect(err.message).toBe('message and validate must be Function.');
    } finally {
      expect(ret).toBe(null);
    }
  });

  it("usePlugin校验，非法参数 validate", () => {
    let ret = null
    try {
      ret = Validator.usePlugin({
        tagName: "jest",
        message() {},
        validate: ""
      })
    } catch (err) {
      expect(err.message).toBe('message and validate must be Function.');
    } finally {
      expect(ret).toBe(null);
    }
  });

  it("usePlugin校验，All right", () => {
    let ret = null
    try {
      ret = Validator.usePlugin({
        tagName: "jest",
        message() {},
        validate() {}
      })
    } finally {
      expect(ret).toBe(undefined);
    }
  });
});

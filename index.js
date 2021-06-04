const {
  isArray,
  isObject,
  isString,
  isFunction
} = require('./utils');

const __$$plugins = {};
const __$$DEFAULT = "Input";

function defaultValidate () {
  return true
}

function doValidate(schema, target, root, parent) {
  let _target = target;
  let _schema = schema;

  if (!isObject(target)) {
    _target = {
      [__$$DEFAULT]: _target
    }

    _schema = {
      [__$$DEFAULT]: _schema
    }
  }

  const fields = Object.keys(_schema);
  const fieldNum = fields.length;
  let errors = null;
  // 之所以不用forEach，是因为原始for循环的内存效率和执行效率都更优。在大流量场景下有一定性能收益。
  for (let i = 0; i < fieldNum; i++) {
    const field = fields[i];
    const rules = _schema[field];
    const value = _target[field];
    let hasError = false;
    let err = null;
    parent = target;

    let rs = isArray(rules) ? rules : [rules];
    const ruleNum = rs.length;
    for (let j = 0; j < ruleNum && !hasError; j++) {
      const rule = rs[j];

      let {
        message,
        validate,
        $fields, // 我赌你的校验对象中没有 $fields 这个字段。如果有，我叫你爸爸。
        ...tags
      } = rule;

      // 优先处理非嵌套结构校验规则。
      const tagNames = Object.keys(tags);
      const tagNums = tagNames.length;
      for (let n = 0; n < tagNums && !hasError; n++) {
        const tagName = tagNames[n];
        const plugin = __$$plugins[tagName];

        if (!plugin) { // 插件没有注册
          throw new Error(`Plugin with tagName = ${tagName} is not registered!`);
        }

        const ef = validate || plugin.validate || defaultValidate;
        const options = {
          tagName,
          tagValue: tags[tagName],
          root,
          parent
        }
        if (ef(field, value, options) === false) {
          let msg = '';
          if (message && isFunction(message)) {
            msg = message(field, value, options);
          } else if (message && isString(message)) {
            msg = message
          } else {
            msg = plugin.message(field, value, options)
          }

          hasError = true
          err = {
            [field]: msg
          }
        }
      }

      // 嵌套校验规则。需要是先通过其它单项规则后如果没有校验问题的情况下才进行。
      // 比如我是一个数组，要求数组内必须大于一个元素。此时。如果数组为空，就没必要进行嵌套校验了
      if ($fields &&!hasError) {
        if (isObject(value)) {
          const e = doValidate($fields, value, root, target);
          if (isObject(e) && Object.keys(e).length > 0) {
            hasError = true;
            err = {
              [field]: e
            }
          }
        } else if (isArray(value)) {
          const errs = [];
          const len = value.length;

          for (let k = 0; k < len; k++) {
            let e = isObject(value[k]) ?
                doValidate($fields, value[k], root, target)
                : doValidate({[field]: $fields}, {[field]: value[k]}, root, target);
            if (Object.keys(e || {}).length > 0) {
              hasError = true;
            }
            errs.push((isObject(value[k]) || e === null) ? e : e[field]);
          }

          if (hasError) {
            err = {
              [field]: errs
            }
          }
        } else {
          console.warn(`$fields for ${field} will be ignored`);
        }
      }
    }
    if (hasError) {
      if (field === __$$DEFAULT) {
        errors = err[field]
      } else {
        errors === null ? errors = {
          [field]: err[field]
        } : errors[field] = err[field]
      }
    }
  }

  return errors;
}

class Validator {
  constructor(schema = {}) {
    if (!isObject(schema) && !isArray(schema)) {
      throw new Error('Schema must be an Object or Array');
    }
    this.schema = schema;
  }

  validate(target) {
    return doValidate(this.schema, target, target, target);
  }
}

Validator.validate = function (schema, target) {
  if (!isObject(schema) && !isArray(schema)) {
    throw new Error('Schema must be an Object or Array');
  }
  return doValidate(schema, target, target, target);
}

Validator.usePlugin = function (plugin, replace = false) {
  if (!isObject(plugin)) {
    throw new Error('Parameter must be Object ant can not be empty')
  }

  const {
    tagName,
    message,
    validate
  } = plugin;

  if (!isString(tagName) || tagName.length <= 0) {
    throw new Error('tagName must be String and not empty.')
  }

  if (!isFunction(message) || !isFunction(validate)) {
    throw new Error('message and validate must be Function.')
  }

  if (!replace && __$$plugins[tagName] !== undefined) {
    throw new Error(`Plugin [ ${tagName} ] is existed`)
  }

  if (__$$plugins[tagName] !== undefined) {
    console.warn(`Plugin [ ${tagName} ] is existed and will be replaced`)
  }

  __$$plugins[tagName] = {
    message,
    validate
  }
}

Validator.usePlugin(require('./packages/required'));
Validator.usePlugin(require('./packages/not_empty'));
Validator.usePlugin(require('./packages/enum'));
Validator.usePlugin(require('./packages/max_length'));
Validator.usePlugin(require('./packages/min_length'));
Validator.usePlugin(require('./packages/max_num'));
Validator.usePlugin(require('./packages/min_num'));
Validator.usePlugin(require('./packages/regexp'));
Validator.usePlugin(require('./packages/is_email'));
Validator.usePlugin(require('./packages/is_url'));

module.exports = Validator;

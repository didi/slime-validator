# Required 必填
进行必填校验，值为`true`或者`false`。

```js
  { Required: true }
```

# Enum 枚举校验
校验值是否为枚举范围内的值，值为包含基础数据类型的数组，内部是通过值比较实现的。

```js
  { Enum: [0, 1, 2, 3] }
```

# NotEmpty 非空校验
判断待校验对象是否为空，支持字符串，数组，对象的校验，值为`true`或者`false`。

```js
  { NotEmpty: true }
```

# MaxLength 和 MinLength
最大长度和最小长度校验，支持数组，字符串，值为数字。

```js
  { MinLength: 1, MaxLength: 10 }
```

# MaxNum 和 MinNum
最大数值和最小数值校验，值为数字。

```js
  { MinLength: 1, MaxLength: 10 }
```

# RegExp 正则校验
正则匹配校验，值为正则对象或者正则字符串。

```js
  { RegExp: /^a/g }
  { RegExp: '^a' }
```
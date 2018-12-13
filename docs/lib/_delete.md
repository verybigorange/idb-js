# exp对象
exp对象是d-js-utlis里的一个属性，此属性包含对于一些字符，或者元素判断是否符合要求

## isPhoneNum
`isPhoneNum`判断是否是正确的手机号格式
##### 参数
  - `num` 手机号内容，字符串，如果不是字符串会被转换成字符
```js
/**
 * 手机号格式判断
 * @param { String } num 手机号
 */
```
##### `Demo`:
```js
Dutils.exp.isPhoneNum('13651971940')   // true
```

## isEmail
`isEmail`判断是否是正确的邮箱地址格式
##### 参数
  - `email` 邮箱地址，如果不是字符串会被转换成字符
```js
/**
 * 邮箱地址格式判断
 * @param { String } num 邮箱
 */
```
##### `Demo`:
```js
Dutils.exp.isEmail('185098535@qq.com')  // true
```

## isWeiXin
`isWeiXin`判断当前是否是在微信浏览器中
```js
 /**
   * 判断当前是否是微信浏览器
   * @return Boolean 
   */
```
##### `Demo`:
```js
Dutils.exp.isWeiXin()  // true
```

## isChinese
`isChinese`判断字符串是否是全中文
```js
/**
 * 判断字符串是否都是中文
 * @param { String } str 
 * @return Boolean 
 */
```
##### `Demo`:
```js
Dutils.exp.isChinese('你好，世界')  // false
Dutils.exp.isChinese('你好')   // true
Dutils.exp.isChinese('world')   // false
```

## initEsDataType
在引入exp模块的时候会被执行，会在exp对象上动态添加一些匹配数据类型格式的方法
`isNull, isUndefined, isObject, isArray, isString, isNumber, isBoolean, isFunction, isRegExp`，
之后就可以通过Dutils.exp.isUndefined ...这些进行数据格式判断
- 类似于[`checkType`](lib/_store#checkType)
## isNull
`isNull`判断字符串是否是null
##### `Demo`:
```js
Dutils.exp.isNull('你好，世界')  // false
Dutils.exp.isNull(null)   // true
```

## isUndefined
`isUndefined`判断字符串是否是undefined
##### `Demo`:
```js
Dutils.exp.isUndefined('undefined')  // false
Dutils.exp.isUndefined(undefined)   // true
```

## isObject
`isObject`判断字符串是否是object对象
##### `Demo`:
```js
Dutils.exp.isObject('{}')  // false
Dutils.exp.isObject({a: 1})   // true
```

## isArray
`isArray`判断字符串是否是数组
##### `Demo`:
```js
Dutils.exp.isArray('[]')  // false
Dutils.exp.isArray(new Array(5))   // true
```

## isString
`isString`判断字符串是否是字符串
##### `Demo`:
```js
Dutils.exp.isString('string')  // true
Dutils.exp.isString(1)   // false
```

## isNumber
`isNumber`判断字符串是否是数字
##### `Demo`:
```js
Dutils.exp.isNumber('number')  // false
Dutils.exp.isNumber(1)   // true
```

## isBoolean
`isBoolean`判断字符串是否是布尔值
##### `Demo`:
```js
Dutils.exp.isBoolean('true')  // false
Dutils.exp.isBoolean(true)   // true
```

## isFunction
`isFunction`判断字符串是否是方法
##### `Demo`:
```js
let a = 1
let b = () => { return  a }
Dutils.exp.isFunction(a)  // false
Dutils.exp.isFunction(b)   // true
```

## isRegExp
`isRegExp`判断字符串是否是正则表达式
##### `Demo`:
```js
Dutils.exp.isRegExp(/abc/)  // true
Dutils.exp.isRegExp('/abc/')   // false
```

## isEmptyObject
`isEmptyObject`判断对象是否是空对象
#### `Demo`:
```js
let obj = {
  a: 1,
  b: 2
}
let obj1 = {}
Dutils.exp.isEmptyObject(obj)   // false
Dutils.exp.isEmptyObject(obj1)   // true
```
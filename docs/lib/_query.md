# store对象
store对象是数据的一些操作

## setCookie
`hasClass`设置Cookie
##### 参数
  - `name` cookie名称
  - `value` cooke的值
  - `exp` 过期时间 默认2小时 单位毫秒
```js
/**
 * 设置Cookie
 * @param { String } name cookie名称
 * @param { String } value cooke的值
 * @param { Number } exp 过期时间 默认2小时 单位毫秒
 */
```
##### `Demo`:
```js
// 设置name为test的值为12345，设置过期时间为1小时
Dutils.store.setCookie('test', '12345', 60 * 60 * 1000)
```

## getCookie
`getCookie`根据name获取Cookie
##### 参数
  - `name` cookie名称
```js
/**
 * 获取Cookie
 * @param { String } name cookie名称
 * @returns { (Array | Null) } 返回的数据
 */
```
##### `Demo`:
```js
Dutils.store.getCookie('test')
```
##### `return`
    - 12345

## rmCookie
`rmCookie`根据name删除Cookie
##### 参数
  - `name` cookie名称
```js
/**
 * 删除Cookie 实际是设置Cookie过期
 * @param { String } name cookie名称 如果不传参数则设置所有cookie过期
 */
```
##### `Demo`:
```js
Dutils.store.rmCookie('test')
```

## saveDataAsFile
`saveDataAsFile`获取元数据存储本地，相当于下载一个文件
##### 参数
  - `name` 相对路径的文件名称   如 ./test.txt
  - `file` 要存储的数据 类似 e.target.files[0] 这种file对象
```js
/**
 * 数据存储本地  相当于下载一个文件  该文件是需要存储的数据   的方法
 * @param { String } name 相对路径的文件名称   如 ./test.txt
 * @param { File } file 要存储的数据 类似 e.target.files[0] 这种file对象
 */
```
##### `Demo`:
```js
Dutils.store.saveDataAsFile('test.txt', e.target.files[0])
```

## fileToFormData
`fileToFormData`将File文件转换成FormData对象
##### 参数
  - `obj` 对象内容 {file: e.target.files[0], id: '100001', name: 'hello world'}
```js
/**
 * 将File文件转换成FormData对象
 * @param {(Object|Blob)} obj 顺带传的参数如,文件内容必传
 * 如：{file: e.target.files[0], id: '100001', name: 'hello world'}
 */
```
##### `Demo`:
```js
  const data = {
      file: e.target.files[0],
      name: 'd-js-utils',
      id: 123,
      desc: 'hello'
  }
Dutils.store.fileToFormData(...data)
```

## getRandomDataFromArr
`getRandomDataFromArr`从数组中获取num 个随机不重复的元素
##### 参数
  - `arr` 数组内容
  - `num` 取出的数量
```js
/**
 * 从数组中获取num 个随机不重复的元素
 * @param { Arrary } arr 数组
 * @param { Number } num 数量
 * @returns { Arrary } 返回数组集合
 */
```
##### `Demo`:
```js
Dutils.store.getRandomDataFromArr([1,2,3,4,5,44,3,2,1,9,0,45,678], 5)
```
##### `return`
    - [4, 9, 45, 2, 0]

## deepClone
`deepClone`为深拷贝对象，改变原来的对象内容不会影响到已有的对象，可以使用递归遍历和JSON序列化，反序列化的方式，这里选择的是后者
##### 参数
  - `obj` 被拷贝的对象
```js
/**
 * 深拷贝
 * @param { Object } obj 被拷贝的对象
 * @return { Object } 返回新的对象
 */
```
##### `Demo`:
```js
  let a = {
      a: 1,
      b: 2,
      c: 3,
      d: [1, 2]
  }
let b = Dutils.store.deepClone(a)
a.d[0] = 3
console.log(a)
console.log(b)
```
##### `return`
```js
a: {a: 1, b: 2, c: 3, d: [3, 2]}
b: {a: 1, b: 2, c: 3, d: [1, 2]}
// 此时修改a.d[0]的值， a对象变化了，b对象没有随之改变
```

## checkType
`checkType`用于检索数据类型并返回类型名称, 该方法适用于任何数据格式，通过Object.prototype.toString.call()对数据的处理拿到数据类型格式
- 类似于[`initEsDataType`](lib/_exp#initEsDataType)
```js
/**
 * 检索数据类型并返回数据类型名称 object array string undefined bool number null 等等...
 * @param { Any } data 要判断的数据
 */
```
##### `Demo`:
```js
Dutils.store.checkType('1')   // string
Dutils.store.checkType({})   // object
Dutils.store.checkType([])   // array
Dutils.store.checkType(localStorage)   // storage
```
你可以在判断数据类型的时候用该方法判断
```js
// 判断data是否是数组
Dutils.store.checkType(data) !== 'array'
```
## uniqueArray
`uniqueArray`数组去重
```js
/**
 * 数组去重
 * @param { Arrary } arr 要去重的arr
 * @return { Array } 返回一个新的数组，不改变原来的数组
 */
```
##### `Demo`:
```js
Dutils.store.uniqueArray([1,2,3,3,,3,3,'4',"4",'4',])   // [1, 2, 3, undefined, "4"]
```
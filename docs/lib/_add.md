# dom对象
dom对象是d-utlis里的一个属性，此属性下包含了已有的和dom相关的一些方法和工具

## hasClass
`hasClass`是判断元素中是否存在某一个className
##### 参数
  - `el` dom元素
  - `className` class名称
```js
/**
 * 判断元素是否存在某个class类
 * @param { Element } el dom元素
 * @param { String } className class名称
 */
```
##### `Demo`:
```js
Dutils.dom.hasClass(document.body, 'd-js-utils')
```

## addClass
`addClass`给元素添加className
##### 参数
  - `el` dom元素
  - `className` class名称
```js
/**
 * 元素添加class
 * @param { Element } el dom元素
 * @param { (String | Array) } className class名称，可以是多个
 */
```
##### `Demo`:
```js
Dutils.dom.addClass(document.body, 'd-js-utils')
```

## rmClass
`addClass`删除元素的某个className
##### 参数
  - `el` dom元素
  - `className` class名称
```js
/**
 * 元素删除class
 * @param { Element } el dom元素
 * @param { (String | Array) } className class名称，可以是多个
 */
```
##### `Demo`:
```js
Dutils.dom.rmClass(document.body, 'd-js-utils')
```

## getComputedStyle
`getComputedStyle`获取元素的css属性内容
##### 参数
  - `el` dom元素
  - `cssProp` css的属性名称
```js
/**
 * 获取元素的css属性内容
 * @param { Element } el dom元素
 * @param { String } cssProp css的属性名称
 * @returns { String } css对应的属性的值
 */
```
##### `Demo`:
```js
Dutils.dom.getComputedStyle(document.body, 'width')
```
##### `return`
    - 1920px

## cssFilter
`cssFilter`设置元素的filter样式
`blur、opacity、grayscale、sepia、saturate、hue-rotate、invert、brightness、contrast、drop-shadow` 目前一共十种，具体option的配置见filter的属性设置
  - `el` dom元素
  - `type` cssFilter的类型，字符串（或者对象， 为对象的时候`是显示一系列键值对，设置多个filter属性名称和值`详情见demo）
  - `option` 参数，可以是字符串也可以是数字
```js
/**
 * 
 * @param { Element } el dom元素
 * @param { (String | Object) } type filter类型   blur、opacity、grayscale、sepia、saturate、hue-rotate、invert、brightness、contrast、drop-shadow, 当type为Object的时候就是显示一系列键值对，设置多个filter属性
 * @param { (String | Number) } option 参数 10px  10% 等等，根据不同type的类型设定不同的参数配置
 */
```
##### `Demo`:
```js
// 单个filter属性传参数
Dutils.dom.cssFilter(document.body, 'grayscale', 1)
// 多个filter属性传参数
  D_JS_UTILS.dom.cssFilter(document.body, {
      grayscale: 0.5,
      opacity: 0.7,
      'hue-rotate': '90deg'
  })
```
##### `result`
    - style="filter: grayscale(1)"
    - style="filter: grayscale(0.5) opacity(0.7) hue-rotate(90deg)"
# device对象
device对象是获取设备信息和基于设备操作的属性

## isMobile
`isMobile`判断是否是移动端
```js
/**
 * 判断是否是移动端
 * isMobile
 * @return { Boolean } 返回是否是移动端的布尔值
 */
```
##### `Demo`:
```js
Dutils.device.isMobile() // false
```

## isIOS
`isIOS`判断设备是否是IOS系统
```js
/**
 * 判断是否是IOS操作系统
 * @return { Boolean } 返回是否是IOS的布尔值
 */
```
##### `Demo`:
```js
Dutils.device.isIOS() // false
```

## isAndroid
`isAndroid`判断是否是Android操作系统
```js
/**
 * 判断是否是Android操作系统
 * @return { Boolean } 返回是否是Android的布尔值
 */
```
##### `Demo`:
```js
Dutils.device.isAndroid() // false
```

## checkLayoutOrientation
`checkLayoutOrientation`判断页面是否是竖屏幕,  是则不处理, 如果事横屏显示提示信息, 此方法会实时监听横竖屏幕检测, 如果事横屏则显示提示，否则不显示
```js
/**
 * 横竖屏的判断,如果是横屏幕显示,显示dom提示竖屏显示
 * @param { String } 提示内容 默认为 请旋转屏幕，以达到更好的浏览效果
 */
```
##### `Demo`:
```js
Dutils.device.checkLayoutOrientation() // 横屏时候提示 请旋转屏幕，以达到更好的浏览效果
Dutils.device.checkLayoutOrientation('请竖直使用手机') // 横屏时候提示 请竖直使用手机
```
##### `效果图`
竖屏效果

![竖屏](./../assets/device/checkLayoutOrientation/checkLayoutOrientation-1.jpeg ':size=320px')

横屏效果

![横屏](./../assets/device/checkLayoutOrientation/checkLayoutOrientation-2.jpeg ':size=540px')
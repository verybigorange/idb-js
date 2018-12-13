# 更新内容
- `2018-11-30`
  - 优化[`getRandomDataFromArr`](lib/_store#getRandomDataFromArr)方法
  - 优化[`debounce`](lib/_utils#debounce)方法, 新增第三个参数 `immediate`: 
    - true: 立刻执行方法且最后一次时间不执行
    - false: 等t时间之后再执行方法，如果t时间内执行，则在最后一次的t时间之后执行方法，类似动态搜索效果
---

### 1.0.8
  - `2018-11-09` 添加[`isEmptyObject`](lib/_exp#isEmptyObject)方法
---

### 1.0.8 之前的版本
  - `2018-10-17` 添加[`openFullScreen`](lib/_utils#openFullScreen), [`exitFullScreen`](lib/_utils#exitFullScreen)
  - `2018-09-15` 添加[`uniqueArray`](lib/_store#uniqueArray)方法

  - `2018-09-04` 
    - 添加[`device`](lib/_device)对象，初始化部分方法: [`isIOS`](lib/_device#isIOS), [`isMobile`](lib/_device#isMobile), [`isAndroid`](lib/_device#isAndroid)
    - 添加[`checkLayoutOrientation`](lib/_device#checkLayoutOrientation)方法

  - `2018-08-29` 添加[`checkType`](lib/_store#checkType)方法

  - `2018-08-27` 添加[`copyCode`](lib/_utils#copyCode)方法

  - `2018-08-23`
    - 将initEsDataType方法放在exp下，且在引用exp时，初始化initEsDataType方法，给exp添加多个数据类型校验的方法
    - isInvalidEmail, isInvalidPhoneNum 改为`isEmail`, `isPhoneNum`

  - `2018-08-21` 更新[`console`](lib/_utils#console)方法

  - `2018-08-17` 添加[`isChinese`](lib/_exp#isChinese)方法

  - `2018-08-16` 添加[`isWeiXin`](lib/_exp#isWeiXin), [`deepClone`](lib/_store#deepClone), [`cssFilter`](lib/_dom#cssFilter)方法

  - `2018-08-15` 添加[`formatDate`](lib/_utils#formatDate)方法

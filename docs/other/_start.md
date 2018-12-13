# 快速使用
#### 安装
使用npm安装 `idb-js` 依赖
```bash
npm i idb-js
```
#### 使用
* 第一步： 引入Idb
```
    import Idb from 'idb-js'  //  引入Idb
```
* 第二步： 引入数据库配置
```
    import db_student_config from './db_student_config'
```
  
* 第三步： 载入配置，数据库开启成功拿到数据库实例进行操作
```
    Idb(db_student_config).then(student_db => {...})
```
# idb-js
基于indexdb本地数据库的封装

### _安装：_
```
    npm install idb-js --save
```

### _使用：_
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

### _数据库实例db方法：_

方法|方法名|参数|参数属性
--|:--|:--:|:--
close_db|关闭数据库|空|-
delete_db|删除数据库|空|-  
<br/><br/>
查（query）：
方法|方法名|参数|参数属性
--|:--|:--:|:--
query|查询匹配到的数据（游标）|{Object}|tableName {String} 表名 （required）
||||condition {Function} 匹配条件 （required）
||||success {Function} 查询成功的回调 @arg {Array} 接收结果
query_by_primaryKey|通过主键查询某条数据|{Object}|tableName {String} 表名 （required）
||||keyValue { String \| Number } 主键值 （required）
||||success {Function} 查询成功的回调 @arg {Array} 接收结果
queryAll|查询某张表的所有数据|{Object}| tableName {String} 表名 （required）
||||success {Function} 查询成功的回调 @arg {Array} 接收结果
<br/><br/>
删（delete）：
方法|方法名|参数|参数属性
--|:--|:--:|:--
insert|添加数据|{Object}|tableName {String} 表名 （required）
||||data {Object} 添加的值 （required）
||||success {Function} 添加成功的回调
delete|删除数据|{Object}|tableName {String} 表名 （required）
||||condition {Function} 匹配条件 （required）
||||success {Function} 删除成功的回调
update|修改数据|{Object}|tableName {String} 表名 （required）
||||condition {Function} 匹配条件 （required）
||||handle {Function} 修改方式 （required） @arg {Object} 修改项
||||success {Function} 修改成功的回调 @arg {Array} 返回被修改后项



## 例子：

### _数据库配置：_
```
    // in db_student_config.js

    export default {
        dbName: "student",                          // *数据库名称
        version: 1,                                 // 数据库版本号（默认为当前时间戳）
        tables: [                                   // *数据库的表，即ObjectStore
            {
                tableName: "grade",                 // *表名
                option: { keyPath: "id" },          // 表配置，即ObjectStore配置，此处指明主键为id
                indexs: [                           // 数据库索引（建议加上索引）
                    {
                        key: "id",                  // *索引名
                        option:{                    // 索引配置，此处表示该字段不允许重复
                            unique: true
                        }
                    },
                    {
                        key: "name"
                    },
                    {
                        key: "score"
                    }
                ]
            },
            {
                tableName: "info",                      // *表名 另外一张表，同理
                option: { keyPath: "id" },
                indexs: [
                    {
                        key: "id",
                        option:{
                            unique: true
                        }
                    },
                    {
                         key: "name"
                    },
                    {
                         key: "age"
                    },
                    {
                         key: "sex"
                    }
                ]
            }
        ]
    };
```


### _使用：_

```
    // 载入数据配置，数据库开启成功后会拿到db来对数据库进行操作

    import Idb from 'idb-js'  //  引入Idb
    import db_student_config from './db_student_config'   //  引入数据库配置

    Idb(db_student_config).then(student_db => {     //  载入配置，数据库开启成功后返回该数据库实例

       /**
        * @method close_db 关闭此数据库
        * */

        student_db.close_db();


        /**
        * @method delete_db 删除此数据库
        * */

        student_db.delete_db();


        /**
        * @method 增加数据
        * */

        student_db.insert({
                tableName: "grade",
                data: {
                    id: 1,
                    score: 98,
                    name: "小明"
                }
        });
       

        /**
        * @method 查询数据（游标）
        * */

        student_db.query({
            tableName: "grade",
            condition: (item)=> item.score == 100,
            success: r => {
                console.log(r);
            }
        });
      
       
        /**
        * @method 修改数据
        * */

        student_db.update({
            tableName: "grade",
            condition:item => item.name == '小明',
            handle: r => {
                r.score = 80;
            },
            success: r => {
                console.log("修改成功", r);
            }
        });
        


       /**
        * @method 删除数据
        * */

        student_db.delete({
          tableName: "grade",
          condition: (item)=> item.name == '小明',
          success: (res) => {
            console.log("删除成功");
          }
        });



        /**
        * @method 查询某张表的所有数据
        * */
        student_db.queryAll({
            tableName: "grade",
            success: (res) => {
                console.log(res)
            }
        });



        /**
        * @method 根据主键查询某条数据
        * */
        student_db.query_by_primaryKey({
            tableName:'grade',
            keyValue:1,
            success:(res)=>{console.log(res)}
        })
    },err => {
        console.log(err)
    });

```

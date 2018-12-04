# idb-js
基于indexdb本地数据库的封装

### _安装：_
```
    npm install idb-js --save
```

### 使用
* 第一步 引入Idb
```
    import Idb from 'idb-js'  //  引入Idb
```
* 第二步 引入数据库配置
```
    import db_student_config from './db_student_config'
```
  
* 第三步 载入配置，数据库开启成功拿到数据库实例进行操作
```
    Idb(db_student_config).then(student_db => {...})
```

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
        * @param {Object}
        *   @property {String} tableName 表名
        *   @property {Object} data 插入的数据
        *   @property {Function} [success] 插入成功的回调
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
        * @method 查询
        * @param {Object}
        *   @property {String} tableName 表名
        *   @property {Function} condition 查询的条件，遍历，与filter类似
        *      @arg {Object} 每个元素
        *      @return 条件
        *   @property {Function} [success] @return {Array} 查询成功的回调，返回查到的结果
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
        * @param {Object}
        *   @property {String} tableName 表名
        *   @property {Function} condition 查询的条件，遍历，与filter类似
        *      @arg {Object} 每个元素
        *      @return 条件
        *   @property {Function} handle 处理函数，接收本条数据的引用，对其修改
        *   @property {Function} [success] 修改成功的回调，返回修改成功的数据   @return {Array} 返回被修改后的值
        *   @property {Function} [error] 错误函数 @return {String}
        * */

        student_db.update({
            tableName: "grade",
            condition:item => item.name == '小明',
            handle: r => {
                r.score = 80;
            },
            success: r => {
                console.log("修改成功", r);
            },
            error:msg=> console.log(msg)
        });
        


       /**
        * @method 删除数据
        * @param {Object}
        *   @property {String} tableName 表名
        *   @property {Function} condition 查询的条件，遍历，与filter类似
        *      @arg {Object} 每个元素
        *      @return 条件
        *   @property {Function} [success] 删除成功的回调  @return {Array} 返回被删除的值
        *   @property {Function} [error] 错误函数 @return {String}
        * */

        student_db.delete({
          tableName: "grade",
          condition: (item)=> item.name == '小明',
          success: (res) => {
            console.log("删除成功");
          },
          error：err => console.log(err)
        });

    },err => {
        console.log(err)
    });

```

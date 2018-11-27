# indexDB_easy
基于indexdb本地数据库的封装

### _安装：_
```
    npm install idb-js --save
```

索引：索引可以让你搜索任意字段拿到数据记录。如果不建立索引，默认只能搜索主键（即从主键取值），所以建议还是建立索引。


### _数据库配置：_
```
    // in db_student_config.js

    export default {
        dbName: "student", // *数据库名称
        version: 1,  // 数据库版本号（默认为当前时间戳）
        tables: [   // 数据库的表，即ObjectStore
            {
                tableName: "grade", // *表名
                option: { keyPath: "id" }, // 表配置，即ObjectStore配置，此处指明主键为id
                indexs: [   // 索引（建议加上索引）
                    {
                        key: "id", // *索引名
                        option:{    // 索引配置，此处表示该字段不允许重复
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
            tableName: "info", // *表名 另外一张表，同理
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
    import Idb from 'idb-js'
    import db_student_config from './db_student_config'

    Idb(db_student_config).then(student_db => {

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
        * @method 查询数据
        * @param {Object}
        *   @property {String} tableName 表名
        *   @property {String|Number} value 如果没有传index，则是以主键值查询，如果有index，根据index值查询
        *   @property {String} index 要查询的索引名称
        *   @property {Function} [success] 查询成功的回调，返回查到的结果
        * */
        student_db.query({
            tableName: "grade",
            value: 100,
            index: "score",
            success: r => {
                console.log(r);
            }
        });
      
       
        /**
        * @method 修改数据
        * @param {Object}
        *   @property {String} tableName 表名
        *   @property {String|Number} value 待操作数据主键值
        *   @property {Function} handle 处理函数，接收本条数据的引用，对其修改
        *   @property {Function} [success] 修改成功的回调，返回修改成功的数据
        * */
        student_db.update({
            tableName: "info",
            value: 1,
            handle: r => {
                r.age = 20;
            },
            success: r => {
                console.log("修改成功", r);
            }
        });
        


        /**
        * @method 删除数据
        * @param {Object}
        *   @property {String} tableName 表名
        *   @property {String|Number} value 主键值
        *   @property {Function} [success] 删除成功的回调
        * */
        student_db.delete({
            tableName: "grade",
            value: 2,
            success: () => {
                console.log("删除成功");
            }
        });
    },err => {
        console.log(err)
    });

```

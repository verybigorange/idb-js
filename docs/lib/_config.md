# 数据库配置

每个数据库对应一个单独的配置，配置中包含`数据库名`，`数据库版本号`，`表（store）`等，其中一个数据库可以配置多张表。表的配置建议加上索引方便搜索。

##### `example`:
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
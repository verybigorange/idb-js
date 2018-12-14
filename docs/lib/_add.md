# 增加
向数据库中插入数据

## insert
`insert`添加单条或者多条数据
##### 参数
  - `{Object}`
  
##### 属性
  - `tableName` { String } 表名
  - `data` { Object \| Array } 数据,单个对象或者一个数组对象
  - `success` { Function } 添加成功的回调（非必填）

##### `Demo`:
```js
    // 插入单条数据
    student_db.insert({
        tableName: "grade",
        data: {
            id: 1,
            score: 98,
            name: "小明"
        },
        success: () => console.log("添加成功")
    });

    // 插入多条数据
    student_db.insert({
        tableName: "grade",
        data: [{
            id: 1,
            score: 98,
            name: "小明"
        },{
            id: 2,
            score: 99,
            name: "小方"
        }],
        success: () => console.log("添加成功")
    });
```
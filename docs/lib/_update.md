# 修改
修改数据库中的一条或者多条数据

## update
`update`游标的方式修改单条或者多条数据
##### 参数
  - `{Object}`
  
##### 属性
  - `tableName` { String } 表名
  - `condition` { Function } 匹配条件 @return { Boolean }
  - `handle` { Function } 修改方式
  - `success` { Function } 修改成功的回调（非必填）

##### `Demo`:
```js
    // 将grade表中，将name是小明的全部数据的score修改为80
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
```

## update_by_primaryKey
`update_by_primaryKey`通过主键修改某条数据
##### 参数
  - `{Object}`
  
##### 属性
  - `tableName` { String } 表名
  - `target` { String \| Number } 主键值
  - `handle` { Function } 修改方式
  - `success` { Function } 修改成功的回调（非必填）

##### `Demo`:
```js
    // 将grade表中，将主键值为1的数据中的score修改为101
    student_db.update_by_primaryKey({
        tableName: "grade",
        target: 1,
        handle: val => (val.score = 101),
        success: res => {
            console.log(res);
        }
    });
```
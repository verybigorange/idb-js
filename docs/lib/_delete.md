# 删除
删除数据库中的一条或者多条数据

## delete
`delete`游标的方式删除单条或者多条数据
##### 参数
  - `{Object}`
  
##### 属性
  - `tableName` { String } 表名
  - `condition` { Function } 匹配条件 @return { Boolean }
  - `success` { Function } 删除成功的回调（非必填）

##### `Demo`:
```js
    // 将grade表中，name是小明的数据删除
    student_db.delete({
      tableName: "grade",
      condition: (item)=>{ return item.name == '小明'},
      success: (res) => {
        console.log("删除成功");
      }
    });
```

## delete_by_primaryKey
`delete_by_primaryKey`通过主键删除某条数据
##### 参数
  - `{Object}`
  
##### 属性
  - `tableName` { String } 表名
  - `target` { String \| Number } 主键值
  - `success` { Function } 删除成功的回调（非必填）

##### `Demo`:
```js
    // 将grade表中，主键值为1的数据删除
    student_db.delete_by_primaryKey({
        tableName:'grade',
        target:1,
        success:()=>console.log('删除成功')
    })
```
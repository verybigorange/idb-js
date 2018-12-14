# 库表
对数据库和表的一些操作

## close_db
`close_db`关闭数据库
##### `Demo`:
```js
student_db.close_db();
```

## delete_db
`delete_db`删除数据库

##### `Demo`:
```js
student_db.delete_db();
```

## clear_table
`clear_table`清空某张表的数据
##### 参数
  - `{Object}`
  
##### 属性
  - `tableName` { String } 表名

##### `Demo`:
```js
    student_db.clear_table({
        tableName:'score'
    })
```
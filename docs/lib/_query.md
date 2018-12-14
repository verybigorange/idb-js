# 查询
查询数据库中的一条或者多条数据

## query
`query`游标的方式查询单条或者多条数据
##### 参数
  - `{Object}`
  
##### 属性
  - `tableName` { String } 表名
  - `condition` { Function } 匹配条件 @return { Boolean }
  - `success` { Function } 查询成功的回调（非必填）@arg { Array } 查询结果

##### `Demo`:
```js
    // 将grade表中，将score是100的数据查询出来
    student_db.query({
        tableName: "grade",
        condition: (item)=> { return item.score == 100},
        success: r => {
            console.log(r);
        }
    });
```

## query_by_primaryKey
`query_by_primaryKey`通过主键查询某条数据
##### 参数
  - `{Object}`
  
##### 属性
  - `tableName` { String } 表名
  - `target` { String \| Number } 主键值
  - `success` { Function } 查询成功的回调（非必填） @arg { Object } 查询结果

##### `Demo`:
```js
    // 将grade表中，主键值为1的数据查询出来
    student_db.query_by_primaryKey({
        tableName:'grade',
        target:1,
        success:(res)=>{console.log(res)}
    })
```

## query_by_index
`query_by_index`通过索引查询某条数据
##### 参数
  - `{Object}`
  
##### 属性
  - `tableName` { String } 表名
  - `indexName` { String } 索引名
  - `target` { String \| Number } 索引值
  - `success` { Function } 查询成功的回调（非必填） @arg { Object } 查询结果

##### `Demo`:
```js
    // 将grade表中，将索引名为name且值为小明的数据查出来
    student_db.query_by_index({
        tableName:'grade',
        indexName:'name',
        target:'小明',
        success:(res)=>{console.log(res)}
    })
```

## queryAll
`query_by_index`通过游标将表中数据全部查出来
##### 参数
  - `{Object}`
  
##### 属性
  - `tableName` { String } 表名
  - `success` { Function } 查询成功的回调（非必填） @arg { Array } 查询结果

##### `Demo`:
```js
    // 将grade表中的数据全部查询出来
     student_db.queryAll({
          tableName: "grade",
          success: (res) => {
              console.log(res)
          }
      });
```
       
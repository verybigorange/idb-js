import DB from './src/DB';

const testDb = new DB({
    dbName:'test',
    version:8
}) 
testDb.add_table('student',{keyPath:'id'})
testDb.open({
    success:()=>{
        console.log('打开数据库成功')
    }
})
testDb.insert({
    tableName:'student',
    data:{
        id:111,
        name:'张三',
        age:18
    }
})

testDb.insert({
    tableName:'student',
    data:{
        id:112,
        name:'李四',
        age:19,
        children:[
            {
                id:112113,
                name:'赵八',
                age:'12'
            }
        ]
    }
})

testDb.insert({
    tableName:'student',
    data:{
        id:113,
        name:'王五',
        age:13
    }
})


testDb.query({
    tableName:'student',
    value:112,
    success:r=>{
        console.log(r)
    }
})

testDb.update({
    tableName:'student',
    value:113,
    handle:(r)=>{
        r.name = '马六'
    },
    success:(r)=>{
        console.log('修改成功',r)
    }
})

testDb.delete({
    tableName:'student',
    value:111,
    success:()=>{
        console.log('删除成功')
    }
})
// var myDB={
//     name:'test',
//     version:3,
//     db:null
// };

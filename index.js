import DB from './src/DB';

const testDb = new DB({
    dbName:'test',
    version:8
}) 
testDb.add_table('student',{keyPath:'id'})
testDb.open()
testDb.insert({
    tableName:'student',
    mode:'readwrite',
    data:{
        id:111,
        name:'张三',
        age:18
    }
})
// var myDB={
//     name:'test',
//     version:3,
//     db:null
// };

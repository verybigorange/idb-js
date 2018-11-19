import DB from './src/DB';

const testDb = new DB({
    dbName:'test',
    version:8
}) 
testDb.open()
// var myDB={
//     name:'test',
//     version:3,
//     db:null
// };

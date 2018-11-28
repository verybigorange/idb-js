import Idb from '../src/Idb'
import db_student_config from './db_student_config'

Idb(db_student_config).then(student_db => {
  // 增
  student_db.insert({
    tableName: "grade",
    data: {
      id: 1,
      score: 98,
      name: "小明"
    }
  });
  student_db.insert({
    tableName: "grade",
    data: {
      id: 2,
      score: 100,
      name: "小红"
    }
  });
  student_db.insert({
    tableName: "grade",
    data: {
      id: 3,
      score: 100,
      name: "小华"
    }
  });
  student_db.insert({
    tableName: "info",
    data: {
      id: 1,
      age: 18,
      name: "小明",
      sex: 1
    }
  });
  setTimeout(()=>{
     // 查
    student_db.query({
      tableName: "grade",
      condition: (item)=> item.score == 100,
      success: r => {
        console.log(r);
      }
    });
  },1000)
 

  // 改
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

  // 删除
  // student_db.delete({
  //   tableName: "grade",
  //   value: 2,
  //   success: () => {
  //     console.log("删除成功");
  //   }
  // });

  // 关闭该数据库
  // student_db.close_db();

  // 删除该数据库
  // student_db.delete_db();
},err => {
  console.log(err)
});

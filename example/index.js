import Idb from "../src/Idb";
import db_student_config from "./db_student_config";

Idb(db_student_config).then(
  student_db => {
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
    setTimeout(() => {
      // 查
      student_db.query({
        tableName: "grade",
        condition: item => item.score == 100,
        success: r => {
          console.log(r);
        }
      });
    }, 1000);

    // 改
    student_db.update({
      tableName: "grade",
      condition: item => item.score == 100,
      handle: r => {
        r.name = "我的name被修改了";
      },
      success: r => {
        console.log("修改成功", r);
      },
      error: msg => console.log(msg)
    });

    student_db.queryAll({
      tableName: "grade",
      success: res => {
        console.log(res);
      }
    });

    student_db.query_by_primaryKey({
      tableName: "grade",
      target: 1,
      success: res => {
        console.log(res);
      }
    });

    student_db.query_by_index({
      tableName: "grade",
      indexName: "name",
      target: "小明",
      success: res => {
        console.log(res);
      }
    });
    // 删除
    // student_db.delete({
    //   tableName: "grade",
    //   condition: (item)=> item.score == 100,
    //   success: () => {
    //     console.log("删除成功");
    //   }
    // });

    // 关闭该数据库
    // student_db.close_db();

    // 删除该数据库
    // student_db.delete_db();

    //清空某张表的数据
    // student_db.clear_table({
    //   tableName:'grade'
    // })

    // 通过主键删除某条数据
    // student_db.delete_by_primaryKey({
    //   tableName:'grade',
    //   target:1,
    //   success:()=>console.log('删除成功')
    // })

    student_db.update_by_primaryKey({
      tableName: "grade",
      target: 1,
      handle: val => (val.score = 101),
      success: res => {
        console.log(res);
      }
    });
  },
  err => {
    console.log(err);
  }
);

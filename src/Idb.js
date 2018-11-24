import DB from "./DB";
import { log } from "./uitils/log";

function Idb({ dbName, version = new Date().getTime(), tables = [] }) {
  const db = new DB({
    dbName,
    version
  });

  for (let tableItem of tables) {
    // tableItem<Object> @tableName,@option,@indexs
    db.add_table(tableItem);
  }

  return new Promise((resolve, reject) => {
    db.open({
      success: () => {
        log(`数据库 ${dbName} 已经打开`);
        resolve(db);
      },
      error: err => {
        reject(err);
      }
    });
  });
}

export default Idb;
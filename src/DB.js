import Dep from './uitils/Dep.js';

const _dep_ = new Dep();

class DB {
  constructor({ dbName, version }) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }

  // 打开数据库
  open() {
    const request = window.indexedDB.open(this.dbName, this.version);

    request.onerror = e => {
      this.open_db_error(e.currentTarget.error.message);
    };

    request.onsuccess = e => {
      this.db = e.target.result;
      _dep_.notify();
      this.open_db_success();
    };

    request.onupgradeneeded = e => {
      console.log("DB version changed to " + this.version);
    };
  }

  // 数据打开失败
  open_db_error(message) {}

  // 数据库打开成功
  open_db_success() {}

  //  关闭数据库
  close_db() {
    if (this.db) {
      this.db.close();
    } else {
      // 如果没有db添加进依赖
      _dep_.add(this.close_db);
    }
  }

  // 删除数据库
  delete_dB() {
    indexedDB.deleteDatabase(name);
  }
}

export default DB
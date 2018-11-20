import Dep from "./uitils/Dep.js";
import Error from "./uitils/Error";

const _dep_ = new Dep();

class DB {
  constructor({ dbName, version }) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
    this.idb = null;
    this.table = [];
    this._status = false; // 是否先添加了表
  }

  // 打开数据库
  open() {
    // 打开前要先添加表
    if (this.table.length == 0 && !this._status) {
      new Error("打开前要先用add_table添加表");
      return;
    }

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
      this.idb = e.target.result;

      for (let i = 0; i < this.table.length; i++) {
        this._create_table_(this.idb, this.table[i]);
      }
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

  // 添加表
  add_table(tableName, option = {}) {
    this._status = false;
    this.table.push({
      tableName,
      option
    });
  }

  /**
   * 查询
   * @value 主键值
   *
   * */
  query({ tableName, value, success = () => {}, mode = "readwrite" }) {
    const handleFn = () => {
      const transaction = this.db.transaction(tableName, mode);
      const store = transaction.objectStore(tableName);
      const request = store.get(value);
      request.onsuccess = (e) => {
        const result = e.target.result;
        if (typeof success !== "function") {
          new Error("success必须是一个Function类型");
          return;
        }
        success(result);
      };
    };

    this._action_(handleFn);
  }

  // 增添数据
  insert({ tableName, data }) {
    if (Object.prototype.toString.call(data) !== "[object Object]") {
      new Error("insert方法中的data必须是Object类型");
      return;
    }

    const mode = "readwrite";

    const handleFn = () => {
      const transaction = this.db.transaction(tableName, mode);
      const store = transaction.objectStore(tableName);
      store.add(data);
    };

    this._action_(handleFn);
  }

  // db是异步的,保证fn执行的时候db存在
  _action_(fn) {
    const action = () => {
      fn();
    };
    // 如果db不存在，加入依赖
    if (!this.db) {
      _dep_.add(action);
    } else {
      action();
    }
  }

  // 创建table
  _create_table_(idb, { tableName, option }) {
    if (!idb.objectStoreNames.contains(tableName)) {
      idb.createObjectStore(tableName, option);
    }
  }
}

export default DB;

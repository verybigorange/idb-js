import Dep from "./uitils/Dep.js";
import { log_error } from "./uitils/log";
import { indexedDB, IDBTransaction, IDBKeyRange } from "./global";
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


  
  /**
   * 打开数据库
   * @success 成功的回调，返回db，非必传
   * @error 失败的回调，返回错误信息，非必传
   * */
  open(ops) {
    let success = () => {},
      error = () => {};

    if (ops) {
      success = ops.success ? ops.success : success;
      error = ops.error ? ops.error : error;
    }

    // 打开前要先添加表
    if (this.table.length == 0 && !this._status) {
      log_error("打开前要先用add_table添加表");
      return;
    }

    if (typeof success !== "function") {
      log_error("open中success必须是一个function类型");
      return;
    }

    const request = indexedDB.open(this.dbName, this.version);

    request.onerror = e => {
      error(e.currentTarget.error.message);
    };

    request.onsuccess = e => {
      this.db = e.target.result;
      success(this.db);
      _dep_.notify();
    };

    request.onupgradeneeded = e => {
      this.idb = e.target.result;

      for (let i = 0; i < this.table.length; i++) {
        this.__create_table(this.idb, this.table[i]);
      }
    };
  }



  //  关闭数据库
  close_db() {
    const handler = () => {
      this.db.close();
    };

    this.__action(handler);
  }



  // 删除数据库
  delete_db() {
    indexedDB.deleteDatabase(name);
  }



  /**
   * 添加一张表
   * @param tableOption<Object>
   * @tableName 表名
   * @option 表配置
   * @index 索引配置
   * */
  add_table(tableOption = {}) {
    this._status = false;
    this.table.push(tableOption);
  }



  /**
   * @method 查询
   * @param {Object}
   *   @property {String} tableName 表名
   *   @property {Function} condition 查询的条件
   *      @arg {Object} 遍历每条数据，和filter类似
   *      @return 条件
   *   @property {Function} [success] @return {Array} 查询成功的回调，返回查到的结果
   * */
  query({ tableName, condition, success = () => {}, mode = "readwrite" }) {
    if (typeof success !== "function") {
      log_error("query方法中success必须是一个Function类型");
      return;
    }

    const handler = () => {
      const transaction = this.db.transaction(tableName, mode);
      const store = transaction.objectStore(tableName);

      if (typeof condition == "function") {
        // const i = store.index(index);
        const request = store.openCursor();
        let res = [];
        request.onsuccess = e => {
          var cursor = e.target.result;
          if (cursor) {
            var val = cursor.value;
            if (condition(val)) res.push(val);
            cursor.continue();
          } else {
            success(res);
          }
        };
      } else {
        log_error("in query,condition is required,and type is function");
      }
    };

    this.__action(handler);
  }



  /**
   * @method 增
   * @param {Object}
   *   @property {String} tableName 表名
   *   @property {Object} data 插入的数据
   *   @property {Function} [success] 插入成功的回调
   * */
  insert({ tableName, data, success = () => {} }) {
    if (Object.prototype.toString.call(data) !== "[object Object]") {
      log_error("insert方法中的data必须是Object类型");
      return;
    }

    if (typeof success !== "function") {
      log_error("insert方法中success必须是一个Function类型");
      return;
    }

    const mode = "readwrite";

    const handler = () => {
      const transaction = this.db.transaction(tableName, mode);
      const store = transaction.objectStore(tableName);
      store.add(data);
      success();
    };

    this.__action(handler);
  }



  /**
   * @method 删除数据
   * @param {Object}
   *   @property {String} tableName 表名
   *   @property {Function} condition 查询的条件，遍历，与filter类似
   *      @arg {Object} 每个元素
   *      @return 条件
   *   @property {Function} [success] 删除成功的回调  @return {Array} 返回被删除的值
   *   @property {Function} [error] 错误函数 @return {String}
   * */
  delete({ tableName, condition, success = () => {}, error = () => {} }) {
    if (typeof success !== "function") {
      log_error("delete方法中success必须是一个Function类型");
      return;
    }

    const handler = () => {
      const transaction = this.db.transaction(tableName, "readwrite");
      const store = transaction.objectStore(tableName);

      if (typeof condition == "function") {
        // const i = store.index(index);
        const request = store.openCursor();
        let res = [];
        request.onsuccess = e => {
          const cursor = e.target.result;
          if (cursor) {
            const val = cursor.value;
            if (condition(val)) {
              res.push(val);
              cursor.delete();
            }
            cursor.continue();
          } else {
            if (res.length == 0) {
              error(`数据库中没有任何符合condition的元素`);
              return;
            }
            success(res);
          }
        };
      } else {
        log_error("in delete,condition is required,and type is function");
      }
    };
    this.__action(handler);
  }



  /**
   * @method 修改数据
   * @param {Object}
   *   @property {String} tableName 表名
   *   @property {Function} condition 查询的条件，遍历，与filter类似
   *      @arg {Object} 每个元素
   *      @return 条件
   *   @property {Function} handle 处理函数，接收本条数据的引用，对其修改
   *   @property {Function} [success] 修改成功的回调，返回修改成功的数据   @return {Array} 返回被修改后的值
   *   @property {Function} [error] 错误函数 @return {String}
   * */
  update({
    tableName,
    condition,
    handle,
    success = () => {},
    error = () => {}
  }) {
    if (typeof handle !== "function") {
      log_error("update中handle必须是一个function类型");
      return;
    }

    if (typeof success !== "function") {
      log_error("update中success必须是一个function类型");
      return;
    }

    const handler = () => {
      const transaction = this.db.transaction(tableName, "readwrite");
      const store = transaction.objectStore(tableName);

      if (typeof condition == "function") {
        // const i = store.index(index);
        const request = store.openCursor();
        let res = [];
        request.onsuccess = e => {
          const cursor = e.target.result;
          if (cursor) {
            const val = cursor.value;
            if (condition(val)) {
              handle(val);
              res.push(val);
              cursor.update(val);
            }
            cursor.continue();
          } else {
            if (res.length == 0) {
              error(`数据库中没有任何符合condition的元素`);
              return;
            }
            success(res);
          }
        };
      } else {
        log_error("in update,condition is required,and type is function");
      }
    };
    this.__action(handler);
  }



  // db是异步的,保证fn执行的时候db存在
  __action(fn) {
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



  /**
   * 创建table
   * @option<Object>  keyPath指定主键 autoIncrement是否自增
   * @index 索引配置
   * */
  __create_table(idb, { tableName, option, indexs = [] }) {
    if (!idb.objectStoreNames.contains(tableName)) {
      let store = idb.createObjectStore(tableName, option);
      for (let indexItem of indexs) {
        this.__create_index(store, indexItem);
      }
    }
  }



  /**
   * 创建索引
   * @option<Object> unique是否是唯一值
   * */
  __create_index(store, { key, option }) {
    store.createIndex(key, key, option);
  }
}

export default DB;

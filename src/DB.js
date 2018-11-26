import Dep from "./uitils/Dep.js";
import {log_error} from "./uitils/log";
import { indexedDB,IDBTransaction,IDBKeyRange} from './global'
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
        this._create_table_(this.idb, this.table[i]);
      }
    };
  }

  //  关闭数据库
  close_db() {
    const handler = () => {
      this.db.close();
    };

    this._action_(handler);
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
   * 查询
   * @value 主键值/如果建立了索引，可以用索引中的字段
   * @success 查询成功，返回结果
   * */
  query({ tableName, value,index, success = () => {}, mode = "readwrite" }) {
    if (typeof success !== "function") {
      log_error("query方法中success必须是一个Function类型");
      return;
    }

    const handler = () => {
      const transaction = this.db.transaction(tableName, mode);
      const store = transaction.objectStore(tableName);
      // 容易index存在则根据索引查找，如果不存在则根据主键查找
      const request = index?store.index(index).get(value):store.get(value);
      request.onsuccess = e => {
        const result = e.target.result;
        success(result);
      };
    };

    this._action_(handler);
  }

  /**
   * 增
   * @tableName 表名
   * @data 插入的数据
   * @success 插入成功的回调，非必传
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

    this._action_(handler);
  }

  /**
   * 删
   * @value 主键值
   * @success 删除成功的回调，非必传
   * */
  delete({ tableName, value, success = () => {} }) {
    if (typeof success !== "function") {
      log_error("delete方法中success必须是一个Function类型");
      return;
    }

    const handler = () => {
      const transaction = this.db.transaction(tableName, "readwrite");
      const store = transaction.objectStore(tableName);
      store.delete(value);
      success();
    };
    this._action_(handler);
  }

  /**
   * 改
   * @value 主键值
   * @handle 修改逻辑，会将值引用传出去进行修改
   * @success 修改成功的回调，非必传
   * */
  update({ tableName, value, handle, success = () => {} }) {
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
      const request = store.get(value);
      request.onsuccess = e => {
        const result = e.target.result;
        handle(result);
        store.put(result);
        success(result);
      };
    };

    this._action_(handler);
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

  /**
   * 创建table
   * @option<Object>  keyPath指定主键 autoIncrement是否自增
   * @index 索引配置
   * */
  _create_table_(idb, { tableName, option,indexs = []}) {
    if (!idb.objectStoreNames.contains(tableName)) {
      let store = idb.createObjectStore(tableName, option);
      for (let indexItem of indexs) {
        this._create_index_(store, indexItem);
      }
    }
  }

  /**
   * 创建索引
   * @option<Object> unique是否是唯一值
   * */
  _create_index_(store, { key, option }) {
    store.createIndex(key, key, option);
  }
}

export default DB;

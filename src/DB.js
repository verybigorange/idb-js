import Dep from "./uitils/Dep.js";
import { log_error } from "./uitils/log";
import { indexedDB, IDBTransaction, IDBKeyRange } from "./global";
import { isArray, isObject } from "./uitils/type.js";

class DB {
  constructor({ dbName, version }) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
    this.idb = null;
    this.table = [];
    this._status = false; // 是否先添加了表
    this._dep_ = new Dep();
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
      this._dep_.notify();
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

  //清空某张表的数据
  clear_table({ tableName }) {
    this.__action(() =>
      this.__create_transaction(tableName, "readwrite").clear()
    );
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
   * @method 查询某张表的所有数据
   * @param {Object}
   *   @property {String} tableName 表名
   *   @property {Function} [success] @return {Array} 查询成功的回调，返回查到的结果
   * */
  queryAll({ tableName, success = () => {} }) {
    if (typeof success !== "function") {
      log_error("queryAll方法中success必须是一个Function类型");
      return;
    }

    const handler = () => {
      const res = [];

      this.__create_transaction(
        tableName,
        "readonly"
      ).openCursor().onsuccess = e =>
        this.__cursor_success(e, {
          condition: () => true,
          handler: ({ currentValue }) => res.push(currentValue),
          over: () => success(res)
        });
    };

    this.__action(handler);
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
  query({ tableName, condition, success = () => {} }) {
    if (typeof success !== "function") {
      log_error("query方法中success必须是一个Function类型");
      return;
    }

    if (typeof condition !== "function") {
      log_error("in query,condition is required,and type is function");
      return;
    }
    const handler = () => {
      let res = [];

      this.__create_transaction(
        tableName,
        "readonly"
      ).openCursor().onsuccess = e =>
        this.__cursor_success(e, {
          condition,
          handler: ({ currentValue }) => res.push(currentValue),
          over: () => success(res)
        });
    };

    this.__action(handler);
  }

  /**
   * @method 增加数据
   * @param {Object}
   *   @property {String} tableName 表名
   *   @property {Object} data 插入的数据
   *   @property {Function} [success] 插入成功的回调
   * */
  insert({ tableName, data, success = () => {} }) {
    if (!(isArray(data) || isObject(data))) {
      log_error("in insert，data type is Object or Array");
      return;
    }

    if (typeof success !== "function") {
      log_error("insert方法中success必须是一个Function类型");
      return;
    }

    this.__action(() => {
      const store = this.__create_transaction(tableName, "readwrite");
      isArray(data)?data.forEach(v => store.add(v)):store.add(data)
      // this.__create_transaction(tableName, "readwrite").add(data);
      success();
    });
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
  delete({ tableName, condition, success = () => {} }) {
    if (typeof success !== "function") {
      log_error("delete方法中success必须是一个Function类型");
      return;
    }

    if (typeof condition !== "function") {
      log_error("in delete,condition is required,and type is function");
      return;
    }

    const handler = () => {
      let res = [];

      this.__create_transaction(
        tableName,
        "readwrite"
      ).openCursor().onsuccess = e =>
        this.__cursor_success(e, {
          condition,
          handler: ({ currentValue, cursor }) => {
            res.push(currentValue);
            cursor.delete();
          },
          over: () => {
            if (res.length == 0) {
              log_error(`in delete ,数据库中没有任何符合condition的元素`);
              return;
            }
            success(res);
          }
        });
    };

    this.__action(handler);
  }

  /**
   * @method 删除数据(主键)
   * @param {Object}
   *   @property {String} tableName 表名
   *   @property {String\|Number} target 目标主键值
   *   @property {Function} [success] 删除成功的回调  @return {Null}
   * */
  delete_by_primaryKey({
    tableName,
    target,
    success = () => {},
    error = () => {}
  }) {
    if (typeof success !== "function") {
      log_error("in delete_by_primaryKey，success必须是一个Function类型");
      return;
    }

    this.__action(() => {
      const request = this.__create_transaction(tableName, "readwrite").delete(
        target
      );
      request.onsuccess = () => success();
      request.onerror = () => error();
    });
  }

  /**
   * @method 修改某条数据(主键)
   * @param {Object}
   *   @property {String} tableName 表名
   *   @property {String\|Number} target 目标主键值
   *   @property {Function} handle 处理函数，接收本条数据的引用，对其修改
   *   @property {Function} [success] 修改成功的回调   @return {Object} 返回被修改后的值
   * */
  update_by_primaryKey({ tableName, target, success = () => {}, handle }) {
    if (typeof success !== "function") {
      log_error("in update_by_primaryKey，success必须是一个Function类型");
      return;
    }
    if (typeof handle !== "function") {
      log_error("in update_by_primaryKey，handle必须是一个Function类型");
      return;
    }

    this.__action(() => {
      const store = this.__create_transaction(tableName, "readwrite");
      store.get(target).onsuccess = e => {
        const currentValue = e.target.result;
        handle(currentValue);
        store.put(currentValue);
        success(currentValue);
      };
    });
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
   * */
  update({ tableName, condition, handle, success = () => {} }) {
    if (typeof handle !== "function") {
      log_error("in update,handle必须是一个function类型");
      return;
    }

    if (typeof success !== "function") {
      log_error("in update,success必须是一个function类型");
      return;
    }

    if (typeof condition !== "function") {
      log_error("in update,condition is required,and type is function");
      return;
    }

    const handler = () => {
      let res = [];

      this.__create_transaction(
        tableName,
        "readwrite"
      ).openCursor().onsuccess = e =>
        this.__cursor_success(e, {
          condition,
          handler: ({ currentValue, cursor }) => {
            handle(currentValue);
            res.push(currentValue);
            cursor.update(currentValue);
          },
          over: () => {
            if (res.length == 0) {
              log_error(`in update ,数据库中没有任何符合condition的元素`);
              return;
            }
            success(res);
          }
        });
    };
    this.__action(handler);
  }

  /**
   * @method 查询数据（主键值）
   * @param {Object}
   *   @property {String} tableName 表名
   *   @property {Number|String} target 主键值
   *   @property {Function} [success] 查询成功的回调，返回查询成功的数据   @return {Object} 返回查到的结果
   *
   * */
  query_by_primaryKey({ tableName, target, success = () => {} }) {
    if (typeof success !== "function") {
      log_error("in query_by_primaryKey,success必须是一个Function类型");
      return;
    }
    const handleFn = () => {
      this.__create_transaction(tableName, "readonly").get(
        target
      ).onsuccess = e => {
        const result = e.target.result;
        success(result || null);
      };
    };
    this.__action(handleFn);
  }

  /**
   * @method 查询数据（索引）
   * @param {Object}
   *   @property {String} tableName 表名
   *   @property {Number|String} indexName 索引名
   *   @property {Number|String} target 索引值
   *   @property {Function} [success] 查询成功的回调，返回查询成功的数据   @return {Object} 返回查到的结果
   *
   * */
  query_by_index({ tableName, indexName, target, success = () => {} }) {
    if (typeof success !== "function") {
      log_error("in query_by_index,success必须是一个Function类型");
      return;
    }
    const handleFn = () => {
      this.__create_transaction(tableName, "readonly")
        .index(indexName)
        .get(target).onsuccess = e => {
        const result = e.target.result;
        success(result || null);
      };
    };
    this.__action(handleFn);
  }

  /**
   * @method 游标开启成功,遍历游标
   * @param {Function} 条件
   * @param {Function} 满足条件的处理方式 @arg {Object} @property cursor游标 @property currentValue当前值
   * @param {Function} 游标遍历完执行的方法
   * @return {Null}
   * */
  __cursor_success(e, { condition, handler, over }) {
    const cursor = e.target.result;
    if (cursor) {
      const currentValue = cursor.value;
      if (condition(currentValue)) handler({ cursor, currentValue });
      cursor.continue();
    } else {
      over();
    }
  }

  /**
   * @method 开启事务
   * @param {String} 表名
   * @param {String} 事务权限
   * @return store
   * */
  __create_transaction(tableName, mode = "readwrite") {
    if (!tableName || !mode) {
      throw new Error("in __create_transaction,tableName and mode is required");
    }
    const transaction = this.db.transaction(tableName, mode);
    return transaction.objectStore(tableName);
  }

  // db是异步的,保证fn执行的时候db存在
  __action(handler) {
    const action = () => {
      handler();
    };
    // 如果db不存在，加入依赖
    if (!this.db) {
      this._dep_.add(action);
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

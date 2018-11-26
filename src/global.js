// 兼容
export const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
export const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
export const IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
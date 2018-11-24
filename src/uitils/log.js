import { NAME } from "./config";

export function log_error(msg = "") {
  throw new Error(`${NAME}：${msg}`);
}

export function log(msg = "") {
  console.log(`${NAME}：${msg}`);
}

import {post} from "./http";

//分页查询系统日志
export function listSystemLog(data) {
  return post('api/imp/systemlog/list', data);
}

import {fetch, post} from "./http";

//管理员登录
export function loginManager(data) {
  return post('api/imp/manager/login', data);
}

export function getManagerById(data) {
  return fetch(`api/imp/manager/findById`, data);
}

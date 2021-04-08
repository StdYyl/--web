import {fetch} from "./http";
//修改是否润许注册状态
export function changeRegister(data) {
  return fetch('api/imp/systemconfig/change', data);
}
//查看允许注册状态
export function check(data) {
  return fetch('api/imp/systemconfig/check', data);
}

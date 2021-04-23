import {fetch} from "./http";

//移除某个用户和模块的对应关系
export function removeUserFromModule(data) {
  return fetch('api/imp/moduleanduser/remove', data);
}
export function addUserToModule(data) {
  return fetch('api/imp/moduleanduser/add', data);
}

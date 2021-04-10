import requested from "./axios";
import {fetch, post} from "./http";

//创建项目
export function addProject(data) {
  return requested("api/imp/project/addProject","POST",data)
}
//查询项目
export function getProjectListById(data) {
  return requested("api/imp/project/getProjectListById","POST",data)
}

export function z(data) {
  return requested("api/imp/project/addProject","POST",data)
}

export function zz(data) {
  return requested("api/imp/project/addProject","POST",data)
}
//根据项目id查询项目
export function getProjectByPid(data) {
  return fetch('api/imp/project/find', data);
}
//更新项目信息
export function updateProject(data) {
  return post('api/imp/project/update', data);
}
//退出项目
export function exit(data) {
  return fetch('api/imp/project/exit', data);
}

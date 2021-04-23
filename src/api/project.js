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
//添加项目环境
export function addProEnvironment(data) {
  return requested("api/imp/environment/addProEnvironment","POST",data)
}
//查询项目环境列表
export function getProEnvironmentList(id) {
  return requested(`api/imp/environment/getProEnvironmentList?id=${id}`)
}
//修改项目
export function putEnvironmentMes(data) {
  return requested(`api/imp/environment/putEnvironmentMes`,"put",data)
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
//通过点击邀请开发人员加入项目
export function inviteUserByClick(data) {
  return fetch('api/imp/project/invite/click', data);
}
//通过链接邀请开发人员加入项目
export function inviteUserByLink(data) {
  return fetch('api/imp/project/invite/link', data);
}
//激活链接，传入被邀请人信息
export function activeLink(data) {
  return fetch('api/imp/project/link/active', data);
}


import requested from "./axios";

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


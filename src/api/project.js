import requested from "./axios";

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

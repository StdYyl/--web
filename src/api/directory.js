import requested from "./axios";

//添加目录
export function addDir(data) {
  return requested("api/imp/directory/addDirectory","POST",data)
}
//查询一级目录列表 category(2:项目、1.接口)
export function getDirOneList(id, category=2,projectId='') {
  return requested(`api/imp/directory/queryDirListLevOne?id=${id}&category=${category}&projectId=${projectId}`)
}
//查询二级目录列表 category(2:项目、1.接口)
export function queryDirListLevSecond(dirId, userId) {
  return requested(`api/imp/directory/queryDirListLevSecond?dirId=${dirId}&userId=${userId}`)
}
//查询模块二级目录
export function queryModuleListSecond(id) {
  return requested(`api/imp/directory/queryModuleListSecond?id=${id}`)
}
//查询项目的所有模块
export function getModuleByProId(id) {
  return requested(`api/imp/directory/getModuleByProId?id=${id}`)
}

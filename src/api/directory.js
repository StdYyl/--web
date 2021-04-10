import requested from "./axios";
import {fetch} from "./http";

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
//根据项目id查找接口模块列表
export function queryModuleListByPid(data) {
  return fetch('api/imp/directory/queryModuleListByPid', data);
}
//根据模块id查找模块用户列表
export function queryModuleUserListByMid(data) {
  return fetch('api/imp/directory/queryModuleUserListByMid', data);
}


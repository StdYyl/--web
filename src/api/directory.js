import requested from "./axios";

//添加目录
export function addDir(data) {
  return requested("api/imp/directory/addDirectory","POST",data)
}
//查询一级目录列表 category(2:项目、1.接口)
export function getDirOneList(id, category=2) {
  return requested(`api/imp/directory/queryDirListLevOne?id=${id}&category=${category}`)
}

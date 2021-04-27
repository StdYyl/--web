import requested from "./axios";
import {post} from "./http";

//新增接口
export function addNewInterface(data) {
  return requested('api/imp/interface/addNewInterface','POST',data);
}
//获取接口列表
export function getInterfaceList(projectId, directoryId, count=9, page=1) {
  return requested(`api/imp/interface/getInterfaceList?projectId=${projectId}&directoryId=${directoryId}&pageNo=${page}&size=${count}`);
}
//根据接口id查询接口信息
export function getIntfMesById(id) {
  return requested(`api/imp/interface/getIntfMesById?id=${id}`);
}
//新增接口
export function modifyIntfMes(data) {
  return requested('api/imp/interface/modifyIntfMes','PUT',data);
}
//批量导入接口
export function getIntfDataByFile(data) {
  return requested('api/imp/interface/getIntfDataByFile','POST',data, {'Content-Type': 'multipart/form-data', "token":"*"});
}
//接口归档
export function archiveIntf(userId, moduleId, projectId) {
  return requested(`api/imp/interface/archiveIntf?userId=${userId}&moduleId=${moduleId}&projectId=${projectId}`);
}
//接口导出时，查询接口信息(基本信息+参数信息)
export function exportIntfList(projectId, directoryId) {
  return requested(`api/imp/interface/exportIntfList?projectId=${projectId}&directoryId=${directoryId}`);
}
//根据project实体类查找接口列表
export function getInterfaceListByExample(data) {
  return post('api/imp/interface/listByExample', data);
}
//接口调试
export function getIntfDebuging(data) {
  return requested('api/imp/interface/getIntfDebuging', "post",data);
}

/*历史记录*/
//添加接口历史记录
export function addIntf2History(data) {
  return requested('api/imp/history/addIntf2History', "post",data);
}
//查询历史记录列表
export function getHistoryList(projectId, type, size=9, pageNo=1) {
  return requested(`api/imp/history/getHistoryList?projectId=${projectId}&type=${type}&pageNo=${pageNo}&size=${size}`);
}
//查询历史记录详情
export function getHistoryIntfMes(id) {
  return requested(`api/imp/history/getHistoryIntfMes?id=${id}`);
}
//历史记录保存
export function saveHistory2Intf(data) {
  return requested('api/imp/history/saveHistory2Intf', "post",data);
}



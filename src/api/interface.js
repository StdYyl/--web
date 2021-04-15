import requested from "./axios";
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

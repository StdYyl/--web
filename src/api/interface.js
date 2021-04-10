import requested from "./axios";
//新增接口
export function addNewInterface(data) {
  return requested('api/imp/interface/addNewInterface','POST',data);
}
//获取接口列表
export function getInterfaceList(projectId,page=1,count=10) {
  return requested(`api/imp/interface/getInterfaceList?projectId=${projectId}&pageNo=${page}&size=${count}`);
}

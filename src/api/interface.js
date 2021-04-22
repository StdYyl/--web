import requested from "./axios";
import {post} from "./http";

//新增接口
export function addNewInterface(data) {
  return requested('api/imp/interface/addNewInterface','POST',data);
}
//获取接口列表
export function getInterfaceList(projectId,page=1,count=10) {
  return requested(`api/imp/interface/getInterfaceList?projectId=${projectId}&pageNo=${page}&size=${count}`);
}
//根据project实体类查找接口列表
export function getInterfaceListByExample(data) {
  return post('api/imp/interface/listByExample', data);
}

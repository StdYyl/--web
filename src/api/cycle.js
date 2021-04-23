import {fetch, post} from "./http";

//根据项目id查询周期节点列表
export function listCycleNode(data) {
  return fetch('api/imp/cycle/list', data);
}
//添加项目周期节点
export function addCycleNode(data) {
  return fetch('api/imp/cycle/add', data);
}

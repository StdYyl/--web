import {fetch, post} from "./http";

//添加或者更新周报
export function writeWeeklyCon(data) {
  return post('api/imp/weeklycon/write', data);
}
//根据周数weeks、项目id以及userid查找weeklycon实体
export function getWeeklyCon(data) {
  return fetch('api/imp/weeklycon/find', data);
}
//查找weeklycon列表
export function listWeeklyCon(data) {
  return post('api/imp/weeklycon/list', data);
}

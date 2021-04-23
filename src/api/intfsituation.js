import {fetch} from "./http";

//统计接口的使用情况
export function satisfyInterface(data) {
  return fetch('api/imp/intfsituation/satisfy', data);
}

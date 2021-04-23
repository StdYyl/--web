import {fetch} from "./http";

//根据项目id查找对应的开开发用户
export function findUserListByPid(data) {
  return fetch('api/imp/projectanduser/listUserByPid', data);
}

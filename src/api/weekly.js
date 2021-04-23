import {post} from "./http";

//填写周报
export function writeWeekly(data) {
  return post('api/imp/weekly/add', data);
}

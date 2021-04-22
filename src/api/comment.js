import {fetch, post} from "./http";

//根据id删除评论
export function removeComment(data) {
  return fetch('api/imp/comment/remove', data);
}
//新增评论
export function addComment(data) {
  return post('api/imp/comment/add', data);
}

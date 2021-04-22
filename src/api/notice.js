import {fetch, post} from "./http";

//根据用户id获取通知信息列表
export function listNotice(data) {
  return fetch('api/imp/notice/list', data);
}
//根据用户id分页查找通知信息列表
export function listNoticeByPage(data) {
  return post('api/imp/notice/page', data);
}
//根据通知id获取通知记录
export function findNoticeById(data) {
  return fetch('api/imp/notice/find', data);
}
//接受邀请并更新notice
export function acceptInvite(data) {
  return post('api/imp/notice/accept', data);
}
//更新通知信息
export function updateNotice(data) {
  return post('api/imp/notice/update', data);
}

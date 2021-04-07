import requested from "./axios";
import {fetch, post} from './http';
//注册（验证码登录）
export function registerOrLand(data) {
  return requested('api/imp/user/login/code','POST',data);
}
//登录
export function land(data) {
  return requested('api/imp/user/login/pass','POST',data);
}
//获取手机验证码
export function SendCode(phone) {
  return requested(`api/imp/user/sendCode?phone=${phone}`);
}
//获取邮箱验证码
export function SendEmailCode(email) {
  return requested(`api/imp/user/sendEmailCode?email=${email}`);
}
//忘记密码
export function forget(data) {
  return requested('api/imp/user/forgetPass','POST',data);
}
//信息补全
export function completeMsg(data) {
  return requested('api/imp/user/completeMsg','POST',data);
}
//退出登录
export function exitLogin(){
  return requested('api/imp/user/exit')
}
//根据id查用户信息
export function getUserMesByID(data) {
  return requested(`api/imp/user/getUserMesById?id=${data}`)
}
//邮箱是否注册
export function emailIsRegister(data) {
  return requested(`api/imp/user/emailIsRegister?email=${data}`)
}
//更新用户基本信息
export function modifyUserMes(data) {
  return requested(`api/imp/user/modifyUserMes`,"POST",data)
}
//修改手机号
export function modifyPass(data) {
  return requested(`api/imp/user/modifyPass`,"POST",data)
}
//修改密码
export function modifyPhone(data) {
  return requested(`api/imp/user/modifyPhone`,"POST",data)
}
//修改邮箱
export function modifyEmail(data) {
  return requested(`api/imp/user/modifyEmail`,"POST",data)
}
//手机号是否注册
export function phoneIsRegister(data) {
  return requested(`api/imp/user/phoneIsRegister?phone=${data}`)
}
//查询所有用户
export function listUser(data) {
  return post('api/imp/user/list/user', data);
}
//查询团队成员
export function listMember(data) {
  return post('api/imp/user/list/member', data);
}
export function removeMember(data) {
  return fetch('api/imp/user/member/remove', data);
}

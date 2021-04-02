import requested from "./axios";
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
export function SendEmailCode(email,phone) {
  return requested(`api/imp/user/sendEmailCode?email=${email}&phone=${phone}`);
}
//忘记密码
export function forget(data) {
  return requested('api/imp/user/forget','POST',data);
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
//邮箱是否注册 emailIsRegister
export function emailIsRegister(data) {
  return requested(`api/imp/user/emailIsRegister?email=${data}`)
}

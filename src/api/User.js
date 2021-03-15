import requested from "./axios";
//注册（验证码登录）
export function registerOrLand(data) {
  return requested('/api/imp/user/login/code','POST',data);
}
//登录
export function land(data) {
  return requested('/api/imp/user/login/pass','POST',data);
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
  return requested('api/imp/user/forget','POST',data);
}



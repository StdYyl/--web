import {notice} from './elementUtils'
//判断接口返回状态
export function checkResponse(app, res, show_msg = false) {
  const code = res.code;
  const msg = res.msg;
  if (code !== 200) {
    //是否message弹窗
    if (show_msg) {
      notice(app, msg, 'error')
    }
    return false
  } else {
    return true
  }
};
export  function uuid() {
  let temp_url = URL.createObjectURL(new Blob());
  let uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf("/") + 1);
}

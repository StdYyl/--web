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

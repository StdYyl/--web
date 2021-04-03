import requested from "./axios";
//上传图片
export function sendImage(data) {
  return requested(`api/static/report/sendImg`,'POST',data,{'Content-Type': 'multipart/form-data'})
}

// notice(this,'请输入正确的手机号','发送失败','Message','error')

export function notice(app, message,type = 'success',content = 'Message',title='', duration=1500) {
  //清除以往通知
  closeNotice(app,content)
  //Message
  if(content === 'Message'){
    app.$message({message, type,duration})
  }
  //Notification
  else if(content === 'Notification'){
    app.$notify({title, message, type, duration})
  }
}

function closeNotice(app, message) {
  message === 'Message' ? app.$message.closeAll() : app.$notify.closeAll()
}

export function confirmMessage(app, message, note = '提示', confirmButtonText = '确定', cancelButtonText = '取消', type = 'warning') {
  return new Promise((resolve, reject) => {
    app.$confirm(message, note, {
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      type: type
    }).then(response => {
      resolve(response);
    }).catch(response => {
      reject(response);
    });
  })
}

import {notice} from './elementUtils'
//导出word
import docxtemplater from 'docxtemplater'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import PizZip from 'pizzip'
// import TurndownService from 'turndown'
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

export function uuid() {
  let temp_url = URL.createObjectURL(new Blob());
  let uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf("/") + 1);
}

//解析嵌套Json(children)
export function parseChildJson(item, isArray = false) {
  let data = isArray ? [] : {}
  if (!item) return data;
  for (let i = 0; i < item.length; i++) {
    //key为空时证明父节点为数组
    if (item[i]['name'] != '' || isArray)  {
      //正常数据(非Object和Array)
      if (item[i]['type'] != 'Object' && item[i]['type'] != 'Array') {
        isArray ? data[item[i]['name']].push(item[i]['value']) : data[item[i]['name']] = item[i]['value'];
      } else {
        //Array 和 Object可能会有子节点数据
        if (item[i]['type'] == 'Object') {
          let p = parseChildJson(item[i].children)
          isArray ? data.push(p) :
            data[item[i]['name']] = parseChildJson(item[i].children);
        }
        if (item[i]['type'] == 'Array') {
          let msg = parseChildJson(item[i].children, true)
          data[item[i]['name']] = []
          data[item[i]['name']].push(...msg)
        }
      }
    } else {
      //非空判断(有值时才添加)
      if (item[i]['value'] != '') data.push(item[i]['value'])
    }
  }
  return data;
}
//导出word文档
export function exportWord(data) {
  let _this = this
  // 读取并获得模板文件的二进制内容
  JSZipUtils.getBinaryContent('/static/intf.docx', function(error, content) {
    if (error) throw error // 抛出异常
    let zip = new PizZip(content) // 创建一个JSZip实例，内容为模板的内容
    let doc = new docxtemplater().loadZip(zip) // 创建并加载docxtemplater实例对象

    console.log(data)
    let param = {}
    param['intf'] = data
    doc.setData(param) // 设置模板变量的值
    try {
      doc.render() // 用模板变量的值替换所有模板变量
    } catch (error) {
      let e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties
      }
      console.log(JSON.stringify({ error: e }))
      throw error // 抛出异常
    }
    // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
    let out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })
    // 将目标文件对象保存为目标类型的文件，并命名
    saveAs(out, '接口文档.docx')
  })
}
//
// //导出markdown
// export function exportMD(data){
//   let turndownService = new TurndownService(data)
//   console.log(turndownService)
// }

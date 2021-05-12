import {notice} from './elementUtils'
//导出word
import docxtemplater from 'docxtemplater'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import PizZip from 'pizzip'
import json2md from 'json2md';

// 自定义转换：超链接
json2md.converters.link = function(input, json2md) {
  return `[${input.title}](${input.source})` ;
}

// 自定义转换：分割线
json2md.converters.seperate = function(input, json2md) {
  return `---` ;
}

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

//导出markdown
export function exportMD(data){
  let res = interface2MDJSON(data);
  return json2md(res);
}
//接口列表转换为json2md可识别的json串
export function interface2MDJSON(objs) {
  let temp = [];
  objs.forEach((item) => {
    temp.push({
      "seperate": ''
    });

    if(item.id) {
      temp.push({
        "p": "id: "+item.id
      })
    }
    if(item.createtime) {
      temp.push({
        "p": "createtime: "+item.createtime
      });
    }
    if(item.createuserid) {
      temp.push({
        "p": "createuserid: "+item.createuserid
      })
    }
    if(item.directoryid) {
      temp.push({
        "p": "directoryid: "+item.directoryid
      })
    }
    if(item.environmentPath) {
      temp.push({
        "p": "environmentPath: "+item.environmentPath
      })
    }
    if(item.environmentid) {
      temp.push({
        "p": "environmentid: "+item.environmentid
      })
    }
    if(item.index) {
      temp.push({
        "p": "index: "+item.index
      })
    }
    if(item.introduction) {
      temp.push({
        "p": "introduction: "+item.introduction
      })
    }
    if(item.isdeleted) {
      temp.push({
        "p": "isdeleted: "+item.isdeleted
      })
    }
    if(item.path) {
      temp.push({
        "p": "path: "+item.path
      })
    }
    if(item.projectId) {
      temp.push({
        "p": "projectId: "+item.projectId
      })
    }
    if(item.status) {
      temp.push({
        "p": "status: "+item.status
      })
    }
    if(item.type) {
      temp.push({
        "p": "type: "+item.type
      })
    }
    if(item.typeName) {
      temp.push({
        "p": "typeName: "+item.typeName
      })
    }
    if(item.updatetime) {
      temp.push({
        "p": "updatetime: "+item.updatetime
      })
    }

    //用json2md处理二级数组
    if(item.paramMsg) {
      if(item.paramMsg.length>0) {
        temp.push({
          "h2": "paramMsg: "
        })
        let msgArr = [];
        item.paramMsg.forEach((param) => {
          let tempItem = {};
          if(param.id) {
            msgArr.push({
              "p": "id: "+param.id
            })
          }
          if(param.interfaceid) {
            msgArr.push({
              "p": "interfaceid: "+param.interfaceid
            })
          }
          if(param.name) {
            msgArr.push({
              "p": "name: "+param.name
            })
          }
          if(param.paramStr) {
            msgArr.push({
              "p": "paramStr: "+param.paramStr
            })
          }
          if(param.queryStr) {
            msgArr.push({
              "p": "queryStr: "+param.queryStr
            })
          }
          if(param.reqBodyJson) {
            msgArr.push(({
              "p": "reqBodyJson: "+param.reqBodyJson
            }))
          }
          if(param.reqtype) {
            msgArr.push(({
              "p": "reqtype: "+param.reqtype
            }))
          }
          if(param.resbody) {
            msgArr.push(({
              "p": "resbody: "+param.resbody
            }))
          }
          if(param.restype) {
            msgArr.push(({
              "p": "restype: "+param.restype
            }))
          }
          if(param.resultStr) {
            msgArr.push(({
              "p": "resultStr: "+param.resultStr
            }))
          }
          if(param.title) {
            msgArr.push(({
              "p": "title: "+param.title
            }))
          }
          //用json2md处理三级数组
          if(param.reqQuery) {
            if(param.reqQuery.length>0) {
              msgArr.push({
                "h3": "reqQuery: "
              });
              let queryArr = [];
              param.reqQuery.forEach((query) => {
                if(query.isRequired) {
                  queryArr.push({
                    "p": "isRequired: "+query.isRequired
                  })
                }
                if(query.name) {
                  queryArr.push({
                    "p": "name: "+query.name
                  })
                }
                if(query.note) {
                  queryArr.push({
                    "p": "note: "+query.note
                  })
                }
                if(query.value) {
                  queryArr.push({
                    "p": "value: "+query.value
                  })
                }
              })
              msgArr.push({
                "blockquote": json2md(queryArr)
              })
            }
          }
          //用json2md处理三级数组
          if(param.reqheader) {
            if(param.reqheader.length>0) {
              msgArr.push({
                "h3": "reqheader: "
              })
              let headerArr = [];
              param.reqheader.forEach((header) => {
                if(header.paramNote) {
                  headerArr.push({
                    "p": "paramNote: "+header.paramNote
                  })
                }
                if(header.reqHeader) {
                  headerArr.push({
                    "p": "reqHeader: "+header.reqHeader
                  })
                }
                if(header.reqHeaderMethod) {
                  headerArr.push({
                    "p": "reqHeaderMethod: "+header.reqHeaderMethod
                  })
                }
              })
              msgArr.push({
                "blockquote": json2md(headerArr)
              })
            }
          }
        })
        temp.push({
          "blockquote": json2md(msgArr)
        })
      }
    }
  });
  return temp;
}

<template>
  <div class="intf_rhs" id="his">
    <div class="rh_head">
      <h4 style="margin: 5px 0 0 15px;color: #1890FF">编辑接口
        <span class="el-icon-info" style="color:#1890FF;"></span>
      </h4>
      <el-button type="primary" size="mini" @click="$router.go(-1)"
                 style="margin-right: 20px;font-size: 12px;padding: 7px 15px">返回
      </el-button>
    </div>
    <el-form :model="from" :rules="rules" ref="from" label-position="top">
      <el-form-item label="名称" prop="name" style="margin-right: 50px">
        <el-input v-model="from.name" placeholder="接口名称" style="width: 350px" size="small"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="introduction">
        <el-input v-model="from.introduction" placeholder="接口简介" style="width: 350px" size="small"></el-input>
      </el-form-item>
      <el-form-item label="分组" prop="directoryid" style="margin-right: 50px">
        <el-select v-model="from.directoryid" size="small">
          <el-option :key="item.id" v-for="item in moduleList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="from.status" size="small">
          <el-option label="未完成" value="1"></el-option>
          <el-option label="已完成" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请求方式" style="margin-right: 20px;width: 160px">
        <el-select v-model="from.type" size="small">
          <el-option :key="item.id" v-for="item in methodList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="环境" prop="environmentid" style="margin-right: 20px;width: 160px">
        <el-select v-model="from.environmentid" size="small">
          <el-option :key="item.id" v-for="item in environmentList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input v-model="from.path" placeholder="接口路径" style="width: 400px" size="small"></el-input>
      </el-form-item>
    </el-form>

    <!--参数列表-->
    <div class="rh_head">
      <h4 style="margin: 5px 0 0 15px;color: #1890FF">参数列表
        <span class="el-icon-info" style="color:#1890FF;"></span>
      </h4>
      <div>
        <el-button type="primary" size="mini"
                   style="margin-right: 10px;font-size: 12px;padding: 7px 15px" @click="saveIntf">保存
        </el-button>
        <el-button type="primary" size="mini" style="margin-right: 20px;font-size: 12px;padding: 7px 15px"
                   @click="runIntf">运行
        </el-button>
      </div>
    </div>

    <el-tabs v-model="paramTab" type="card" closable @tab-remove="removeTab" :before-leave="beforeLeave">
      <el-tab-pane v-for="(item, index) in paramList" :key="item.name" :label="item.title" :name="item.name">
        <el-form :model="from" label-position="top">
          <el-collapse v-model="activeNames">
            <!--header-->
            <el-collapse-item title="Header" name="1">
              <template slot="title">
                <i class="header-icon el-icon-info" style="color:#1890FF;margin-right: 5px"></i>Header
              </template>
              <!--添加多个header-->
              <div v-for="(headMes,num) in item.content.header">
                <el-form-item style="margin-right: 10px">
                  <el-autocomplete size="small" class="inline-input" v-model="headMes.reqHeader"
                                   :fetch-suggestions="headerMes" placeholder="请填写Header">
                  </el-autocomplete>
                </el-form-item>
                <el-form-item style="margin-right: 10px;">
                  <el-autocomplete size="small" style="width: 250px" class="inline-input"
                                   v-model="headMes.reqHeaderMethod"
                                   :fetch-suggestions="((a,b)=>{headerContent(headMes,a,b)})"
                                   placeholder="请填写Header"></el-autocomplete>
                </el-form-item>
                <el-form-item style="margin-right: 15px;">
                  <el-input v-model="headMes.paramNote" placeholder="请填写备注" size="small"
                            style="width: 230px"></el-input>
                </el-form-item>
                <el-button v-if="item.content.header.length > 1" type="text" class="el-icon-close"
                           @click="removeHeader(item,num)"></el-button>
                <el-button type="text" class="el-icon-plus" @click="addHeader(item)"></el-button>
              </div>
            </el-collapse-item>

            <!--body-->
            <el-collapse-item title="Body" name="2" v-if="from.type != 1">
              <template slot="title">
                <i class="header-icon el-icon-info" style="color:#1890FF;margin-right: 5px"></i>Body
              </template>
              <div style="text-align: left;margin:5px 20px">
                <el-radio v-model="item.content.reqType" label="1">From</el-radio>
                <el-radio v-model="item.content.reqType" label="2">Json</el-radio>
                <el-radio v-model="item.content.reqType" label="3">Raw</el-radio>
              </div>

              <div>
                <!--添加多个body-->
                <!--From-->
                <div v-if="item.content.reqType == 1">
                  <div v-for="(headMes,num) in item.content.param">
                    <el-form-item style="margin-right: 10px">
                      <el-input v-model="headMes.name" placeholder="参数名称" size="small"
                                style="width: 190px"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-right: 10px;">
                      <el-input v-model="headMes.value" placeholder="参数值" size="small"
                                style="width: 180px"></el-input>
                    </el-form-item>
                    <el-checkbox v-model="headMes.isRequired" style="margin-right: 15px">必填</el-checkbox>
                    <el-form-item style="margin-right: 15px;">
                      <el-input v-model="headMes.note" placeholder="请填写备注" size="small"
                                style="width: 230px"></el-input>
                    </el-form-item>
                    <el-button v-if="item.content.param.length > 1" type="text" class="el-icon-close"
                               @click="removeParam(item,num)"></el-button>
                    <el-button type="text" class="el-icon-plus" @click="addParam(item)"></el-button>
                  </div>
                </div>
                <!--Json-->
                <div v-else-if="item.content.reqType == 2">
                  <el-tree :data="item.content.reqBodyJson" :props="defaultProps"
                           :indent="15" default-expand-all ref="BodyJson" :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <el-form-item :style="'margin-right: 10px;width:'+(180-(data.level-1)*15)+'px;min-width:15px'">
                        <el-input v-model="data.name" placeholder="参数名称" size="small"
                                  :disabled="data.parentIsArray"></el-input>
                      </el-form-item>
                      <el-form-item style="margin-right: 10px;width: 120px">
                        <el-select v-model="data.type" size="small" @change="changeType(node,data)">
                          <el-option :key="item.name" v-for="item in resultTypeLists" :label="item.name"
                                     :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-checkbox v-model="data.isRequired" style="margin-right: 15px">必填</el-checkbox>
                      <el-form-item style="margin-right: 10px;">
                        <el-input v-model="data.value" placeholder="Mock值" size="small"
                                  style="width: 160px" :disabled="data.type=='Object' || data.type=='Array'"></el-input>
                      </el-form-item>
                      <el-form-item style="max-resolution: res;gin-right: 15px;">
                        <el-input v-model="data.note" placeholder="请填写备注" size="small"
                                  style="width: 130px"></el-input>
                      </el-form-item>
                      <el-button v-if="item.content.reqBodyJson.length > 1 || data.level > 1" type="text"
                                 class="el-icon-close"
                                 @click="removeBodyJson(node,data)" style="padding: 0"></el-button>
                      <!--添加兄弟节点-->
                      <el-button v-if="data.type != 'Array' && data.type != 'Object'" type="text" class="el-icon-plus"
                                 @click="addBodyJson({node,data})" style="padding: 0;margin-left: 0"></el-button>
                      <!--仅当格式为Array或Object时可以创建子节点。-->
                      <el-form-item v-else style="margin-bottom: 0">
                          <el-dropdown @command="addBodyJson">
                            <el-button type="text" class="el-icon-plus" style="padding: 0;float: none"></el-button>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item :command="beforeHandleCommand(data,item,'a')">子节点</el-dropdown-item>
                              <el-dropdown-item :command="beforeHandleCommand(node,item,'b')">兄弟节点</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                      </el-form-item>

                    </span>
                  </el-tree>

                </div>
                <!--Raw-->
                <div v-else style="text-align: left;margin-top: 12px">
                  <el-form-item style="margin-right: 10px;width: 350px">
                    <el-input type="textarea" placeholder="输入参数"
                              v-model="item.content.paramBody"></el-input>
                  </el-form-item>
                </div>
              </div>

            </el-collapse-item>

            <!--query-->
            <el-collapse-item title="Query" name="3">
              <template slot="title">
                <i class="header-icon el-icon-info" style="color:#1890FF;margin-right: 5px"></i>Query
              </template>
              <!--添加多个header-->
              <div>
                <div v-for="(headMes,num) in item.content.reqQuery">
                  <el-form-item style="margin-right: 10px">
                    <el-input v-model="headMes.name" placeholder="参数名称" size="small"
                              style="width: 190px"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-right: 10px;">
                    <el-input v-model="headMes.value" placeholder="参数值" size="small"
                              style="width: 180px"></el-input>
                  </el-form-item>
                  <el-checkbox v-model="headMes.isRequired" style="margin-right: 15px">必填</el-checkbox>
                  <el-form-item style="margin-right: 15px;">
                    <el-input v-model="headMes.note" placeholder="请填写备注" size="small"
                              style="width: 230px"></el-input>
                  </el-form-item>
                  <el-button v-if="item.content.reqQuery.length > 1" type="text" class="el-icon-close"
                             @click="removeQuery(item,num)"></el-button>
                  <el-button type="text" class="el-icon-plus" @click="addQuery(item)"></el-button>
                </div>
              </div>
            </el-collapse-item>

            <!--result-->
            <el-collapse-item title="result" name="4">
              <template slot="title">
                <i class="header-icon el-icon-info" style="color:#1890FF;margin-right: 5px"></i>Result
              </template>
              <div style="text-align: left;margin:5px 20px">
                <el-radio v-model="item.content.resultType" label="1">Json</el-radio>
                <el-radio v-model="item.content.resultType" label="2">Raw</el-radio>
              </div>

              <div>
                <!--添加多个result-->
                <!--Json-->
                <div v-if="item.content.resultType == 1">
                  <el-tree :data="item.content.result" :props="defaultProps"
                           :indent="15" default-expand-all ref="BodyJson" :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <el-form-item :style="'margin-right: 10px;width:'+(180-(data.level-1)*15)+'px;min-width:15px'">
                        <el-input v-model="data.name" placeholder="参数名称" size="small"
                                  :disabled="data.parentIsArray"></el-input>
                      </el-form-item>
                      <el-form-item style="margin-right: 10px;width: 120px">
                        <el-select v-model="data.type" size="small" @change="changeType(node,data)">
                          <el-option :key="item.name" v-for="item in resultTypeList" :label="item.name"
                                     :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-checkbox v-model="data.isRequired" style="margin-right: 15px">必填</el-checkbox>
                      <el-form-item style="margin-right: 10px;">
                        <el-input v-model="data.value" placeholder="返回值" size="small"
                                  style="width: 160px" :disabled="data.type=='Object' || data.type=='Array'"></el-input>
                      </el-form-item>
                      <el-form-item style="max-resolution: res;gin-right: 15px;">
                        <el-input v-model="data.note" placeholder="请填写备注" size="small"
                                  style="width: 130px"></el-input>
                      </el-form-item>
                      <el-button v-if="item.content.result.length > 1 || data.level > 1" type="text"
                                 class="el-icon-close"
                                 @click="removeBodyJson(node,data)" style="padding: 0"></el-button>
                      <!--添加兄弟节点-->
                      <el-button v-if="data.type != 'Array' && data.type != 'Object'" type="text" class="el-icon-plus"
                                 @click="addBodyJson({node,data})" style="padding: 0;margin-left: 0"></el-button>
                      <!--仅当格式为Array或Object时可以创建子节点。-->
                      <el-form-item v-else style="margin-bottom: 0">
                          <el-dropdown @command="addBodyJson">
                            <el-button type="text" class="el-icon-plus" style="padding: 0;float: none"></el-button>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item :command="beforeHandleCommand(data,item,'a')">子节点</el-dropdown-item>
                              <el-dropdown-item :command="beforeHandleCommand(node,item,'b')">兄弟节点</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                      </el-form-item>

                    </span>
                  </el-tree>

                </div>
                <div v-else style="text-align: left">
                  <el-form-item style="margin-right: 10px;width: 350px">
                    <el-input type="textarea" placeholder="输入参数"
                              v-model="item.content.resultBody"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-collapse-item>

          </el-collapse>
        </el-form>
      </el-tab-pane>
      <el-tab-pane key="add" name="add">
        <span slot="label" style="padding: 8px;font-size:20px;font-weight:bold;">
		  	  +
		    </span>
      </el-tab-pane>
    </el-tabs>

    <!--运行结果-->
    <el-drawer
      :with-header="false"
      :visible.sync="drawer"
      direction="ltr"
      size="32%"
    >
      <div>
        <el-collapse v-model="deBugIntf" id="result">
          <el-collapse-item title="请求头Header" name="1">
            <codemirror ref="myCm" v-model="debugIntfResult" :options="cmOptions" class="code"></codemirror>
          </el-collapse-item>
          <el-collapse-item title="响应Body" name="2">
            <codemirror ref="myCm" v-model="debugIntfBody" :options="cmOptions" class="code"></codemirror>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-drawer>
  </div>
</template>

<script>
    import {COMMON} from '@/const/common'
    import {notice} from '@/utils/elementUtils'
    import {
        addIntf2History,
        addNewInterface,
        getIntfDebuging,
        getIntfMesById,
        modifyIntfMes
    } from "../../api/interface";
    import {getModuleByProId} from "../../api/directory";
    import {getProEnvironmentList} from "../../api/project";
    import {parseChildJson, uuid} from "../../utils/utils";

    import {codemirror} from 'vue-codemirror'
    import 'codemirror/theme/cobalt.css'

    require("codemirror/mode/python/python.js")
    require('codemirror/addon/fold/foldcode.js')
    require('codemirror/addon/fold/foldgutter.js')
    require('codemirror/addon/fold/brace-fold.js')
    require('codemirror/addon/fold/xml-fold.js')
    require('codemirror/addon/fold/indent-fold.js')
    require('codemirror/addon/fold/markdown-fold.js')
    require('codemirror/addon/fold/comment-fold.js')


    export default {
        name: "EditIntf",
        components: {
            codemirror
        },
        data() {
            return {
                //请求结果
                debugIntfResult: '',
                debugIntfBody: '',
                //调试窗口
                drawer: false,
                deBugIntf: ["1", "2"],
                cmOptions: {
                    mode: 'application/json',
                    lineNumbers: true,
                    theme: 'cobalt',
                    scrollbarStyle: null,
                    readOnly: 'nocursor'
                },
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                //环境列表
                environmentList: [],
                activeNames: ['1', '2', '3', '4'],
                //模块列表
                moduleList: [],
                resultTypeList: COMMON.paramType,
                resultTypeLists: COMMON.paramType,
                methodList: COMMON.methodList,
                module: '',
                //接口基本信息
                from: {
                    name: '', introduction: '', directoryid: '', status: '1', type: "1", path: '', environmentid: '',
                    projectId: this.$route.params.id
                },
                //接口参数列表
                paramTab: '1',
                paramList: [
                    // {
                    //     title: '列表1', name: '1', content: {
                    //         header: [
                    //             {reqHeader: '', reqHeaderMethod: '', paramNote: ''}
                    //         ],
                    //         reqType: '1',
                    //         paramBody: '',
                    //         param: [
                    //             {name: '', value: '', isRequired: false, note: ''}
                    //         ],
                    //         resultType: '1',
                    //         resultBody: '',
                    //         result: [
                    //             {id:uuid(), name: '', value: '', isRequired: false, note: '', type: 'Object', level: 1,}
                    //         ],
                    //         reqQuery: [
                    //             {name: '', value: '', isRequired: false, note: ''}
                    //         ],
                    //         reqBodyJson: [
                    //             {id:uuid(), name: '', value: '', isRequired: false, note: '', type: 'Object', level: 1,}
                    //         ]
                    //     }
                    // },
                ],
                rules: {
                    name: {required: true, message: "请输入接口名称", trigger: 'blur'},
                    introduction: {required: true, message: "请输入接口简介", trigger: 'blur'},
                    directoryid: {required: true, message: "请选择分组", trigger: 'blur'},
                    path: {required: true, message: "请输入接口路径", trigger: 'blur'},
                    environmentid: {required: true, message: "请输请选择接口环境", trigger: 'blur'},
                }
            }
        },
        methods: {
            //运行接口
            runIntf: async function () {
                let app = this
                let history = JSON.parse(JSON.stringify(app.from))
                let config = {}
                //url
                let url = ''
                this.environmentList.forEach(env => {
                    if (env.id == app.from.environmentid) url = env.baseurl + app.from.path
                })
                config.url = url
                //method
                let index = this.methodList.findIndex(md => md.id == app.from.type)
                config.method = this.methodList[index].name
                //headers
                let headIndex = this.paramList.findIndex(md => md.name == app.paramTab)
                let content = this.paramList[headIndex].content
                history['paramID'] = this.paramList[headIndex].id
                history['reqBodyJson'] = JSON.stringify(content.reqBodyJson)
                if (content.reqType == '1') {
                    history['reqbody'] = JSON.stringify(content.param)
                }
                if (content.reqType == '3') {
                    history['reqbody'] = content.paramBody
                }
                history['reqtype'] = content.reqType
                history['resbody'] = content.resultType == '1' ? JSON.stringify(content.result) : content.resultBody
                history['restype'] = content.resultType
                history['reqQuery'] = JSON.stringify(content.reqQuery)
                history['reqheader'] = JSON.stringify(content.header)
                let reqHeader = {}
                let header = content.header.forEach(head => {
                    if (head.reqHeader != '') reqHeader[head.reqHeader] = head.reqHeaderMethod
                })
                config.headers = reqHeader;
                //data params
                let param = {}
                content.reqQuery.forEach(query => {
                    if (query.name != '') param[query.name] = query.value
                })
                config.params = param;
                // data data
                let data = {}
                if ("1" == content.reqType) {
                    //From
                    content.param.forEach(param => {
                        if (param.name != '') data[param.name] = param.value
                    })
                } else if ("2" == content.reqType) {
                    data = parseChildJson(content.reqBodyJson)
                } else {
                    try {
                        data = JSON.parse(content.paramBody)
                    } catch (e) {
                        notice(app, "数据格式有误，请检查数据后重试", "error")
                        return;
                    }
                }
                config.data = data

                let rs = await getIntfDebuging(config);
                app.debugIntfResult = JSON.stringify(rs.headers, null, 4)
                app.debugIntfBody = JSON.stringify(rs.data, null, 4)
                app.drawer = true

                //添加接口调用记录
                history['projectID'] = this.$route.params.id
                history['intfID'] = app.from.id
                history['title'] = "列表1"
                delete history.id
                console.log(app.from)
                let hs = await addIntf2History(history);
                // try {
                //     console.log(config)
                //     this.$axios.request(config).then(res=>{
                //         app.debugIntfResult = JSON.stringify(res.config.headers,null,4)
                //         app.debugIntfBody = JSON.stringify(res.data,null,4)
                //         app.drawer = true
                //     });
                // } catch (e) {
                //     notice(app, "调用失败，请检查参数", "error")
                //     return;
                // }

                // console.log(config)
                // let url =
            },
            //更换类型时，删除子节点
            changeType(node, data) {
                node.data.value = ''
                let msg = node.data
                if (msg.children)
                    msg.children.splice(0, msg.children.length)
            },
            beforeHandleCommand(data, item, command) {
                return {'node': data, 'item': item, 'command': command}
            },
            //添加接口(保存)
            saveIntf() {
                this.$refs.from.validate(async err => {
                        if (!err) return;
                        let param = {
                            msg: this.from,
                            param: this.paramList
                        }
                        let rs = await modifyIntfMes(param)
                        if (rs.data.code == 200) {
                            notice(this, "保存成功!")
                        }
                    }
                )
            },
            //请求头
            headerMes(q, c) {
                c(COMMON.HEADER)
            },
            //切换header
            headerContent(val, q, c) {
                if (val.reqHeader == 'Content-Type') {
                    c(COMMON.ContentType)
                    return;
                }
                if (val.reqHeader == 'Accept') {
                    c(COMMON.Accept)
                    return;
                }
                c([])
            },
            //添加header
            addHeader(e) {
                let index = this.paramList.findIndex(d => d.name == e.name)
                this.paramList[index].content.header.push({reqHeader: '', reqHeaderMethod: '', paramNote: ''});
            },
            //删除header
            removeHeader(e, num) {
                let index = this.paramList.findIndex(d => d.name == e.name)
                if (index !== -1) {
                    this.paramList[index].content.header.splice(num, 1)
                }
            },
            //添加query
            addQuery(e) {
                let index = this.paramList.findIndex(d => d.name == e.name)
                this.paramList[index].content.reqQuery.push({name: '', value: '', isRequired: false, note: ''});
            },
            //删除query
            removeQuery(e, num) {
                let index = this.paramList.findIndex(d => d.name == e.name)
                if (index !== -1) {
                    this.paramList[index].content.reqQuery.splice(num, 1)
                }
            },
            //添加param
            addParam(e) {
                let index = this.paramList.findIndex(d => d.name == e.name)
                this.paramList[index].content.param.push({name: '', value: '', isRequired: false, note: ''});
            },
            //删除param
            removeParam(e, num) {
                let index = this.paramList.findIndex(d => d.name == e.name)
                if (index !== -1) {
                    this.paramList[index].content.param.splice(num, 1)
                }
            },
            //添加reqBodyJson
            addBodyJson(e) {
                //添加兄弟节点
                if (!e.command || e.command == 'b') {
                    let data = e.node.parent.data
                    let level = data.children ? data.children[0].level : data[0].level
                    let node = {
                        id: uuid(), name: '', value: '', isRequired: false, note: '', type: 'Object',
                        level, parentIsArray: data.type == 'Array'
                    }
                    if (data.children) {
                        data.children.push(node)
                    } else {
                        data.push(node)
                    }

                } else {
                    let data = e.node
                    console.log(data)
                    let newChild = {
                        id: uuid(),
                        name: '',
                        value: '',
                        isRequired: false,
                        note: '',
                        type: 'Object',
                        parentIsArray: data.type == 'Array',
                        level: data.level + 1
                    };
                    if (!data.children) {
                        this.$set(data, 'children', []);
                    }
                    data.children.push(newChild);
                }
            },
            //删除reqBodyJson
            removeBodyJson(node, data) {
                let parent = node.parent
                let children = parent.data.children || parent.data
                let index = children.findIndex(d => d.id === data.id)
                children.splice(index, 1)
            },
            //添加tab
            addTab() {
                let newTabIndex = this.paramList.length + 1;
                this.paramList.push({
                    title: `列表${newTabIndex}`, name: newTabIndex + '', content: {
                        header: [
                            {reqHeader: '', reqHeaderMethod: '', paramNote: ''}
                        ],
                        reqType: '1',
                        paramBody: '',
                        param: [
                            {name: '', value: '', isRequired: false, note: ''}
                        ],
                        resultType: '1',
                        resultBody: '',
                        result: [
                            {id: uuid(), name: '', value: '', isRequired: false, note: '', type: 'Object', level: 1,}
                        ],
                        reqQuery: [
                            {name: '', value: '', isRequired: false, note: ''}
                        ],
                        reqBodyJson: [
                            {id: uuid(), name: '', value: '', isRequired: false, note: '', type: 'Object', level: 1,}
                        ]

                    }
                });
            },
            /* 活动标签切换时触发 */
            beforeLeave(currentName, oldName) {
                let self = this;
                //重点，如果name是add，则什么都不触发
                if (currentName == "add") {
                    this.addTab()
                    return false
                }
            },
            //删除tab
            removeTab(targetName) {
                let tabs = this.paramList;
                let index = this.paramList.findIndex(d => d.name == targetName)
                if (tabs.length <= 1) {
                    this.$message.error('删除失败，至少有存在一个参数列表');
                    return;
                }
                //删除
                //更改后面tab的name
                tabs.forEach((tab, num) => {
                    if (num >= index) {
                        tab.title = '列表' + num
                        tab.name = num + ''
                    }
                });
                this.paramList.splice(index, 1)
            },
        },
        async mounted() {
            // 获取环境列表
            let environment = await getProEnvironmentList(this.$route.params.id);
            if (environment.data.data) {
                this.environmentList.splice(0, this.environmentList.length)
                let param = environment.data.data;
                this.environmentList.push(...param)
                // param.forEach(msg => {
                //     this.environmentList.push({id: msg.id, name: msg.name})
                // })
            }
            // //模块列表
            let module = await getModuleByProId(this.$route.params.id);
            if (!module.data.data) {
                notice(this, "请先去添加模块！", "info")
                return
            }
            this.moduleList.splice(0, this.moduleList.length)
            this.moduleList.push(...module.data.data)

            //查询接口信息
            let intfId = this.$route.params.intfId
            let rs = await getIntfMesById(intfId);
            if (rs.data.data) {
                let data = rs.data.data
                this.from = data.baseMsg
                data.paramMsg.forEach(msg => {
                    msg.content.reqQuery = msg.content.reqQuery ? JSON.parse(msg.content.reqQuery)
                        : [{name: '', value: '', isRequired: false, note: ''}]
                    //判断Query是否为空
                    msg.content.reqQuery.forEach(query => {
                        if (query.paramNote != '' || query.reqHeader != '' || query.reqHeaderMethod != '') {
                            msg.content.reqQuery.empty = true
                        }
                    })
                    msg.content.header = JSON.parse(msg.content.header)
                    //判断header是否为空
                    msg.content.header.forEach(head => {
                        if (head.paramNote != '' || head.reqHeader != '' || head.reqHeaderMethod != '') {
                            msg.content.header.empty = true
                        }
                    })
                    msg.content.result = msg.content.result ? JSON.parse(msg.content.result) :
                        [{id: uuid(), name: '', value: '', isRequired: false, note: '', type: 'Object', level: 1,}]
                    msg.content.reqBodyJson = msg.content.reqBodyJson ? JSON.parse(msg.content.reqBodyJson) :
                        [{id: uuid(), name: '', value: '', isRequired: false, note: '', type: 'Object', level: 1,}]
                    msg.content.param = msg.content.param ? JSON.parse(msg.content.param) : [{
                        name: '',
                        value: '',
                        isRequired: false,
                        note: ''
                    }]

                })
                this.paramList.push(...data.paramMsg)
            }
        }

    }
</script>

<style lang="less" scoped>

  #his /deep/ .el-tabs__nav-scroll{
    justify-content: left;
  }

  /deep/ #result .el-collapse-item__header {
    padding-left: 15px;
  }

  .none_iocn {
    color: white !important;
  }

  /*/deep/ .el-tree-node__expand-icon {*/
  /*  display: none;*/
  /*}*/

  /deep/ .el-icon-caret-right {
    color: #0d1b3ea6;
    cursor: pointer;
    font-size: 18px;
  }

  /deep/ .custom-tree-node > div {
    width: auto;
  }

  /deep/ .el-tree-node {

    margin-bottom: 5px;
  }

  /deep/ .el-tree-node__content {
    display: block;
    height: 45px;
  }

  /*去除tree的高亮*/
  /deep/ .el-tree-node:focus > .el-tree-node__content {
    background-color: white !important;
  }

  /deep/ .el-tree-node__content:hover {
    background-color: white;
  }

  /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: white;
  }

  /deep/ #tab-add {
    float: right;

    .el-icon-close {
      display: none;
    }

    &:hover {
      padding: 0 20px !important;
    }
  }

  /deep/ .el-collapse-item__content {
    padding-bottom: 0;
    text-align: left;
  }

  /deep/ .el-collapse {
    border: none;

    .el-collapse-item__header, .el-collapse-item__wrap {
      font-size: 15px;
      border: none;
    }
  }

  .el-icon-close {
    color: red;
    margin-right: 5px;
    font-size: 18px;
  }

  .el-icon-plus {
    font-size: 18px;
  }

  /deep/ .el-tabs__content {
    margin-left: 20px;
  }


  .intf_rhs {
    min-height: 530px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px 0px;
    border: 1px solid #bbbbbb;
    background-color: white;
    border-radius: 8px;
    width: 870px;
    margin-left: 30px;
    padding: 15px;

    /deep/ .el-tabs .el-tabs__header .el-tabs__nav {
      transform: translateX(0) !important;
    }

    .rh_head {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #c3c3c3;
      padding-bottom: 10px;
      align-items: flex-end;
      margin-bottom: 0;
    }

  }

  /deep/ .el-form {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    .el-form-item {
      text-align: left;
      display: inline-block;
      margin-bottom: 15px;

      .el-select {
        width: 350px;
      }

      .el-form-item__label {
        padding: 0;
        line-height: 25px;
      }
    }
  }

</style>

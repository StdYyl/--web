<template>
  <div class="intf_rhs">
    <div class="rh_head">
      <h4 style="margin: 5px 0 0 15px;color: #1890FF">我的接口
        <span class="el-icon-info" style="color:#1890FF;"></span>
      </h4>
    </div>
    <el-form :model="from" :rules="rules" ref="from" label-position="top">
      <el-form-item label="名称" prop="name" style="margin-right: 50px">
        <el-input v-model="from.name" placeholder="接口名称" style="width: 350px" size="small"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="introduction">
        <el-input v-model="from.introduction" placeholder="接口简介" style="width: 350px" size="small"></el-input>
      </el-form-item>
      <el-form-item label="分组" prop="directoryID" style="margin-right: 50px">
        <el-select v-model="from.directoryID" size="small">
          <el-option :key="item.id" v-for="item in moduleList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="from.status" size="small">
          <el-option label="未完成" value="1"></el-option>
          <el-option label="已完成" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路径" style="margin-right: 20px;width: 160px">
        <el-select v-model="from.type" size="small">
          <el-option :key="item.id" v-for="item in methodList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="环境" style="margin-right: 20px;width: 160px">
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
        <el-button type="primary" size="mini" style="margin-right: 20px;font-size: 12px;padding: 7px 15px">运行
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
                <el-button type="text" class="el-icon-close" @click="removeHeader(item,num)"></el-button>
                <el-button type="text" class="el-icon-plus" @click="addHeader(item)"></el-button>
              </div>
            </el-collapse-item>

            <!--body-->
            <el-collapse-item title="Body" name="2">
              <template slot="title">
                <i class="header-icon el-icon-info" style="color:#1890FF;margin-right: 5px"></i>Body
              </template>
              <div style="text-align: left;margin:5px 20px">
                <el-radio v-model="item.content.reqType" label="1">Json</el-radio>
                <el-radio v-model="item.content.reqType" label="2">Raw</el-radio>
              </div>

              <div>
                <!--添加多个body-->
                <!--Json-->
                <div v-if="item.content.reqType == 1" v-for="(headMes,num) in item.content.param">
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
                  <el-button type="text" class="el-icon-close" @click="removeParam(item,num)"></el-button>
                  <el-button type="text" class="el-icon-plus" @click="addParam(item)"></el-button>
                </div>
                <div v-else style="text-align: left">
                  <el-form-item style="margin-right: 10px;width: 350px">
                    <el-input type="textarea" placeholder="输入参数"
                              v-model="item.content.paramBody"></el-input>
                  </el-form-item>
                </div>
              </div>

            </el-collapse-item>

            <!--result-->
            <el-collapse-item title="result" name="3">
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
                <div v-if="item.content.resultType == 1" v-for="(headMes,num) in item.content.result">
                  <el-form-item style="margin-right: 10px">
                    <el-input v-model="headMes.name" placeholder="名称" size="small"
                              style="width: 170px"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-right: 10px;width: 120px">
                    <el-select v-model="headMes.type" size="small">
                      <el-option :key="item.id" v-for="item in resultTypeList" :label="item.name"
                                 :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-checkbox v-model="headMes.isRequired" style="margin-right: 15px">必填</el-checkbox>
                  <el-form-item style="margin-right: 10px;">
                    <el-input v-model="headMes.value" placeholder="返回值" size="small"
                              style="width: 160px"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-right: 15px;">
                    <el-input v-model="headMes.note" placeholder="请填写备注" size="small"
                              style="width: 130px"></el-input>
                  </el-form-item>
                  <el-button type="text" class="el-icon-close" @click="removeResult(item,num)"></el-button>
                  <el-button type="text" class="el-icon-plus" @click="addResult(item)"></el-button>
                </div>
                <div v-else style="text-align: left">
                  <el-form-item style="margin-right: 10px;width: 350px">
                    <el-input type="textarea" placeholder="输入参数"
                              v-model="item.content.paramBody"></el-input>
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
  </div>
</template>

<script>
    import {COMMON} from '@/const/common'
    import {notice} from '@/utils/elementUtils'
    import {addNewInterface} from "../../api/interface";
    import {getModuleByProId} from "../../api/directory";
    import {getProEnvironmentList} from "../../api/project";

    export default {
        name: "index",
        data() {
            return {
                //环境列表
                environmentList:[],
                activeNames: ['1', '2', '3'],
                //模块列表
                moduleList: [],
                resultTypeList: COMMON.paramType,
                methodList: COMMON.methodList,
                module: '',
                //接口基本信息
                from: {
                    name: '', introduction: '', directoryID: '', status: '1', type: "1", path: '',environmentid:'',
                    createId:localStorage.getItem("id"), projectId:this.$route.params.id
                },
                //接口参数列表
                paramTab: '1',
                paramList: [
                    {
                        title: '列表1', name: '1', content: {
                            header: [
                                {reqHeader: '', reqHeaderMethod: '', paramNote: ''}
                            ],
                            reqType: '1',
                            paramBody: '',
                            param: [
                                {name: '', value: '', isRequired: '', note: ''}
                            ],
                            resultType: '1',
                            resultBody: '',
                            result: [
                                {name: '', value: '', isRequired: '', note: '', type: ''}
                            ]
                        }
                    },
                    // {
                    //     title: '列表2', name: '2', content: {
                    //         header: [
                    //             {reqHeader: '', reqHeaderMethod: '', paramNote: ''}
                    //         ],
                    //         reqType: '1',
                    //         paramBody: '',
                    //         param: [
                    //             {name: '', value: '', isRequired: '', note: ''}
                    //         ],
                    //         resultType: '1',
                    //         resultBody: '',
                    //         result: [
                    //             {name: '', value: '', isRequired: '', note: '', type: ''}
                    //         ]
                    //     }
                    // }
                ],
                rules: {
                    name: {required: true, message: "请输入接口名称", trigger: 'blur'},
                    introduction: {required: true, message: "请输入接口简介", trigger: 'blur'},
                    directoryID: {required: true, message: "请选择分组", trigger: 'blur'},
                    path: {required: true, message: "请输入接口路径", trigger: 'blur'},
                }
            }
        },
        methods: {
            //添加接口(保存)
            saveIntf() {
                this.$refs.from.validate(async err => {
                    if (!err) return;
                    let param = {
                        msg:this.from,
                        param:this.paramList
                    }

                    let rs = await addNewInterface(param)
                })
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
                if (this.paramList[index].content.header.length <= 1) {
                    this.$message.error('删除失败，至少有存在一个Header');
                    return;
                }
                if (index !== -1) {
                    this.paramList[index].content.header.splice(num, 1)
                }
            },
            //添加param
            addParam(e) {
                let index = this.paramList.findIndex(d => d.name == e.name)
                this.paramList[index].content.param.push({name: '', value: '', isRequired: '', note: ''});
            },
            //删除param
            removeParam(e, num) {
                let index = this.paramList.findIndex(d => d.name == e.name)
                if (this.paramList[index].content.param.length <= 1) {
                    this.$message.error('删除失败，至少有存在一个param');
                    return;
                }
                if (index !== -1) {
                    this.paramList[index].content.param.splice(num, 1)
                }
            },
            //添加result
            addResult(e) {
                let index = this.paramList.findIndex(d => d.name == e.name)
                this.paramList[index].content.result.push({name: '', value: '', isRequired: '', note: ''});
            },
            //删除param
            removeResult(e, num) {
                let index = this.paramList.findIndex(d => d.name == e.name)
                if (this.paramList[index].content.result.length <= 1) {
                    this.$message.error('删除失败，至少有存在一个Result');
                    return;
                }
                if (index !== -1) {
                    this.paramList[index].content.result.splice(num, 1)
                }
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
                            {name: '', value: '', isRequired: '', note: ''}
                        ],
                        resultType: '1',
                        resultBody: '',
                        result: [
                            {name: '', value: '', isRequired: '', note: '', type: ''}
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
            //获取环境列表
            let environment = await getProEnvironmentList(this.$route.params.id);
            if (environment.data.data) {
                this.environmentList.splice(0,this.environmentList.length)
                let param = environment.data.data;
                param.forEach(msg =>{
                    this.environmentList.push({id:msg.id, name:msg.name})
                })
                console.log(this.environmentList)

            }
            //模块列表
            let rs = await getModuleByProId(this.$route.params.id);
            if(!rs.data.data){
                notice(this,"请先去添加模块！","info")
                return
            }
            this.moduleList.splice(0,this.moduleList.length)
            this.moduleList.push(...rs.data.data)
            console.log(this.moduleList)
        }

    }
</script>

<style lang="less" scoped>

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
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px 0px;
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

<template>
  <div class="intf_rh">
    <div class="rh_head">
      <h4 style="margin: 0px 0 0 15px;color: #1890FF">接口预览
        <span class="el-icon-info" style="color:#1890FF;"></span>
      </h4>
      <el-button type="primary" size="mini" @click="toEditPage" v-if="from.status != 3"
                 style="margin-right: 20px;font-size: 12px;padding: 7px 15px">编辑
      </el-button>
    </div>
    <h3 style="text-align: left;border-left: 3px solid #1890FF;padding:3px 5px;margin-left: 15px">基本信息</h3>
    <div id="base">
      <el-form :model="from" ref="from">
        <el-form-item label="接口名称" style="color: #586069">：
          {{from.name}}
        </el-form-item>
        <el-form-item label="创建人">：
          <el-image :src="from.head" style="width: 25px;height: 20px;margin-right: 5px" fit="cover"></el-image>
          <div>{{from.createUserName}}</div>
        </el-form-item>
        <el-form-item label="状态">：
          <span class="circle"></span>
          <div>{{from.status=='1' ? '未完成' : '已完成'}}</div>
        </el-form-item>
        <el-form-item label="更新时间">：
          <div>{{from.updateTime}}</div>
        </el-form-item>
        <el-form-item label="接口路径">：
          <div>
          <span
            style="font-weight: bold;margin-right: 5px;color: #1890FF;font-size: 15px">{{from.typeName}}</span>
            {{from.path}}
          </div>
        </el-form-item>
        <el-form-item label="简介">：
          <div>{{from.introduction}}</div>
        </el-form-item>
      </el-form>
    </div>

    <!--参数列表-->
    <h3 style="text-align: left;border-left: 3px solid #1890FF;padding:3px 5px;margin-left: 15px;">请求参数</h3>
    <el-tabs v-model="paramTab" type="border-card" id="tab">
      <el-tab-pane v-for="(item, index) in paramList" :key="item.name" :label="item.title" :name="item.name">
        <el-form :model="from" ref="from" label-position="top">

          <!--header-->
          <div v-if="item.content.header.length > 0 && item.content.header.empty">
            <div style="text-align: left">
              <i class="header-icon el-icon-info" style="color:#1890FF;margin:0 5px 10px 0"></i>Header
            </div>
            <el-table :data="item.content.header" border>
              <el-table-column
                prop="reqHeader"
                label="参数名称"
                width="230">
              </el-table-column>
              <el-table-column
                prop="reqHeaderMethod"
                label="参数值"
                width="220">
              </el-table-column>
              <el-table-column
                prop="paramNote"
                label="备注">
              </el-table-column>
            </el-table>
          </div>

          <!--body-->
          <div v-if="from.type != 'GET' && item.content.param">
            <div style="text-align: left">
              <i class="header-icon el-icon-info" style="color:#1890FF;margin:15px 5px 10px 0"></i>Body
            </div>

            <!--from格式-->
            <div v-if="item.content.reqType == '1'">
              <el-table :data="item.content.param" border>
                <el-table-column
                  prop="name"
                  label="参数名称"
                  width="230">
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="参数值"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="isRequired"
                  label="是否必填"
                  width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.isRequired?'是':'否' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="note"
                  label="备注">
                </el-table-column>
              </el-table>
            </div>

            <!--Json格式-->
            <div v-else-if="item.content.reqType == '2'">
              <el-table :data="item.content.reqBodyJson" border
                        row-key="name"
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                  prop="name"
                  label="参数名称"
                  width="230">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="格式"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="isRequired"
                  label="是否必填"
                  width="110">
                  <template slot-scope="scope">
                    <span>{{ scope.row.isRequired?'是':'否' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="返回值"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="note"
                  label="备注">
                </el-table-column>
              </el-table>
            </div>

            <div v-else>
              <el-card class="box-card">
                {{item.content.paramBody}}
              </el-card>
            </div>
          </div>

          <!--Query-->
          <div v-if="item.content.reqQuery && item.content.reqQuery.empty">
            <div style="text-align: left;line-height: 41px">
              <i class="header-icon el-icon-info" style="color:#1890FF;margin:0 5px 10px 0"></i>Query
            </div>
            <el-table :data="item.content.reqQuery" border>
              <el-table-column
                prop="name"
                label="参数名称"
                width="230">
              </el-table-column>
              <el-table-column
                prop="value"
                label="参数值"
                width="230">
              </el-table-column>
              <el-table-column
                prop="isRequired"
                label="是否必填"
                width="80">
                <template slot-scope="scope">
                  <span>{{ scope.row.isRequired?'是':'否' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="note"
                label="备注">
              </el-table-column>
            </el-table>
          </div>

          <!--result-->
          <div v-if="item.content.result">
            <div style="text-align: left">
              <i class="header-icon el-icon-info" style="color:#1890FF;margin:15px 5px 10px 0"></i>Result
            </div>
            <div>
              <!--json格式-->
              <div v-if="item.content.resultType == '1'">
                <el-table :data="item.content.result" border
                          row-key="name"
                          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                  <el-table-column
                    prop="name"
                    label="参数名称"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="格式"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="isRequired"
                    label="是否必填"
                    width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row.isRequired?'是':'否' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="value"
                    label="返回值"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="note"
                    label="备注">
                  </el-table-column>
                </el-table>
              </div>

              <div v-else>
                <el-card class="box-card">
                  {{item.content.resultBody}}
                </el-card>
              </div>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
    import {getIntfMesById} from "../../api/interface";

    export default {
        name: "Preview",
        data() {
            return {
                from: {
                    name: '登陆', updateTime: '2021年3月28', introduction: '用户登录', status: '1', type: 'GET',
                    path: '/user/login', head: '/static/img/head.b818068.png', createUserName: '张三'
                },
                paramTab: '1',
                paramList: [
                    // {
                    //     title: '列表1', name: '1', content: {
                    //         header: [
                    //             {reqHeader: 'Content-Type', reqHeaderMethod: 'application/json', paramNote: '类型'}
                    //         ],
                    //         reqType: '1',
                    //         paramBody: '',
                    //         param: [
                    //             {name: 'name', value: '张三', isRequired: '是', note: '用户名'}
                    //         ],
                    //         resultType: '1',
                    //         resultBody: '',
                    //         result: [
                    //             {name: 'code', value: '200', isRequired: '是', note: '状态码', type: 'String',
                    //             children:[
                    //                 {name: 'codes', value: '200', isRequired: '是', note: '状态码', type: 'String',}
                    //             ]}
                    //         ]
                    //     }
                    // },
                    // {
                    //     title: '列表2', name: '2', content: {
                    //         header: [],
                    //         reqType: '2',
                    //         paramBody: `{
                    //         "paramKey":"Accept",
                    //         "paramVal":"*",
                    //         "paramNote":"请求头类型"
                    //     },`,
                    //         param: [
                    //             {name: 'name', value: '张三', isRequired: '是', note: '用户名'}
                    //         ],
                    //         resultType: '1',
                    //         resultBody: '',
                    //         result: [
                    //             {name: 'code', value: '200', isRequired: '是', note: '状态码', type: 'String',
                    //                 children:[
                    //                     {name: 'codes', value: '200', isRequired: '是', note: '状态码', type: 'String',}
                    //                 ]}
                    //         ]
                    //     }
                    // }
                ],
            }
        },
        methods: {
            toEditPage() {
                let {id, moduleId, intfId} = this.$route.params
                this.$router.push(`/home/intfIndex/${id}/intf/${moduleId}/modify/${intfId}`)
            }
        },
        async mounted() {
            let intfId = this.$route.params.intfId
            let rs = await getIntfMesById(intfId);
            if (rs.data.data) {
                let data = rs.data.data
                this.from = data.baseMsg
                data.paramMsg.forEach(msg => {
                    if (msg.content.reqQuery) {
                        msg.content.reqQuery = JSON.parse(msg.content.reqQuery)
                        //判断Query是否为空
                        msg.content.reqQuery.forEach(query => {
                            if (query.paramNote != '' || query.reqHeader != '' || query.reqHeaderMethod != '') {
                                msg.content.reqQuery.empty = true
                            }
                        })
                    }
                    msg.content.header = JSON.parse(msg.content.header)
                    //判断header是否为空
                    msg.content.header.forEach(head => {
                        if (head.paramNote != '' || head.reqHeader != '' || head.reqHeaderMethod != '') {
                            msg.content.header.empty = true
                        }
                    })
                    if (msg.content.result) {
                        msg.content.result = JSON.parse(msg.content.result)
                    }
                    if (msg.content.reqBodyJson) {
                        msg.content.reqBodyJson = JSON.parse(msg.content.reqBodyJson)
                    }
                    if (msg.content.param) {
                        msg.content.param = JSON.parse(msg.content.param)
                    }
                })
                this.paramList.push(...data.paramMsg)
                console.log(this.from)
            }
        }
    }
</script>

<style lang="less" scoped>

  .intf_rh {
    min-height: 530px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px 0px;
    border: 1px solid #bbbbbb;
    background-color: white;
    border-radius: 8px;
    width: 870px;
    margin-left: 30px;
    padding: 15px;

    /deep/ #tab {
      margin: 0 20px;
      width: 96%;

      .el-tabs__nav {
        transform: translateX(0) !important;

      }
    }

    /deep/ #base {
      .el-form {
        margin-left: 45px;
        display: flex;
        flex-wrap: wrap;

        .el-form-item {
          width: 50%;
          margin-bottom: 12px;
          display: flex;

          .circle {
            width: 5px;
            height: 5px;
            background-color: red;
            border-radius: 50%;
            margin-right: 5px;
          }

          .el-form-item__content {
            font-size: 13px;
            align-items: center;
            display: flex;


            div {
              width: 200px;
              white-space: nowrap; //文字超出时不换行
              text-overflow: ellipsis;
              overflow: hidden;
              text-indent: 5px;
              text-align: left;
            }

          }
        }

        .el-form-item__label {
          padding-right: 0;
          color: #333333;
          text-align-last: justify;
          width: 65px !important;

        }
      }
    }

    /deep/ #param {
      .el-form-item {
        margin-left: 45px;
        display: flex;
        flex-wrap: wrap;

        .el-form-item__label {
          font-size: 17px;
        }
      }
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
</style>

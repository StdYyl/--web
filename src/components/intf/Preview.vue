<template>
  <div class="intf_rh">
    <div class="rh_head">
      <h4 style="margin: 0px 0 0 15px;color: #1890FF">接口预览
        <span class="el-icon-info" style="color:#1890FF;"></span>
      </h4>
      <el-button type="primary" size="mini" @click="$router.push('./AddIntf')"
                 style="margin-right: 20px;font-size: 12px;padding: 7px 15px">编辑
      </el-button>
    </div>
    <h3 style="text-align: left;border-left: 3px solid #1890FF;padding:3px 5px;margin-left: 15px">基本信息</h3>
    <div id="base">
      <el-form :model="from" ref="from">
        <el-form-item label="接口名称" style="color: #586069">:
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
            style="font-weight: bold;margin-right: 5px;color: #1890FF;font-size: 15px">{{from.type.toUpperCase()}}</span>
            {{from.updateTime}}
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
          <div v-if="item.content.header.length > 0">
            <div style="text-align: left">
              <i class="header-icon el-icon-info" style="color:#1890FF;margin:0 5px 10px 0"></i>Header
            </div>
            <!--header-->
            <!--raw-->
            <el-table :data="item.content.header" border>
              <el-table-column
                prop="reqHeader"
                label="参数名称"
                width="230">
              </el-table-column>
              <el-table-column
                prop="reqHeaderMethod"
                label="参数值"
                width="230">
              </el-table-column>
              <el-table-column
                prop="paramNote"
                label="备注">
              </el-table-column>
            </el-table>
          </div>

          <!--body-->
          <div v-if="item.content.param.length > 0">
            <div style="text-align: left">
              <i class="header-icon el-icon-info" style="color:#1890FF;margin:15px 5px 10px 0"></i>Body
            </div>

            <!--json格式-->
            <div v-if="item.content.reqType == '1'">
              <el-table :data="item.content.param" border>
                <el-table-column
                  prop="name"
                  label="参数名称"
                  width="200">
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

          <div style="text-align: left">
            <i class="header-icon el-icon-info" style="color:#1890FF;margin:15px 5px 10px 0"></i>Result
          </div>

          <div>
            <!--添加多个result-->
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
        </el-form>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
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
                    {
                        title: '列表1', name: '1', content: {
                            header: [
                                {reqHeader: 'Content-Type', reqHeaderMethod: 'application/json', paramNote: '类型'}
                            ],
                            reqType: '1',
                            paramBody: '',
                            param: [
                                {name: 'name', value: '张三', isRequired: '是', note: '用户名'}
                            ],
                            resultType: '1',
                            resultBody: '',
                            result: [
                                {name: 'code', value: '200', isRequired: '是', note: '状态码', type: 'String',
                                children:[
                                    {name: 'codes', value: '200', isRequired: '是', note: '状态码', type: 'String',}
                                ]}
                            ]
                        }
                    },
                    {
                        title: '列表2', name: '2', content: {
                            header: [],
                            reqType: '2',
                            paramBody: `{
                            "paramKey":"Accept",
                            "paramVal":"*",
                            "paramNote":"请求头类型"
                        },`,
                            param: [
                                {name: 'name', value: '张三', isRequired: '是', note: '用户名'}
                            ],
                            resultType: '1',
                            resultBody: '',
                            result: [
                                {name: 'code', value: '200', isRequired: '是', note: '状态码', type: 'String',
                                    children:[
                                        {name: 'codes', value: '200', isRequired: '是', note: '状态码', type: 'String',}
                                    ]}
                            ]
                        }
                    }
                ],
            }
        },
        methods: {}
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

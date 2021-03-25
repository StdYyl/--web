<template>
  <div class="intfBg">
    <div class="intfBg_header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{projectName}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs v-model="activeName">
        <!--接口管理-->
        <el-tab-pane label="接口管理" name="interface">
          <div style="display: flex">
            <div class="intf_left" id="a">
              <el-tabs type="border-card">
                <el-tab-pane label="接口列表">
                  <div class="intf_left_in">
                    <el-input v-model="searchIntf" placeholder="接口名称" size="small"
                              style="width: 155px;margin-left: 15px"></el-input>
                    <el-button type="primary"
                               style="margin-left: 10px;font-size: 20px;height: 30px;line-height: 0px">+</el-button>
                  </div>
                  <el-tree :data="intfData" :props="defaultProps" :filter-node-method="search" ref="tree" accordion
                           :highlight-current='true'
                           :render-content="renderContent" :expand-on-click-node="isRemove" v-infinite-scroll="load">
                  </el-tree>
                </el-tab-pane>
                <el-tab-pane label="历史记录">
                  <div class="intf_left_in">

                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="intf_rh"></div>
          </div>
        </el-tab-pane>

        <!--周报管理-->
        <el-tab-pane label="周报管理" name="weekly">周报管理</el-tab-pane>

        <!--环境设置-->
        <el-tab-pane label="环境设置" name="environment">环境设置</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                activeName: 'interface',
                projectName: "软件测试项目",
                //接口搜索
                searchIntf:'',
                //历史搜索
                searchHistory:'',
                //接口列表
                intfData: [
                    {
                        id: 1,
                        label: "用户中心",
                        children: [
                            {
                                id: 2,
                                label: "个人信息",
                                children: [
                                    {id: 3, label: "用户名修改"},
                                    {id: 4, label: "密码修改"},
                                ]
                            },
                        ]
                    },
                    {
                        id: 5,
                        label: "客户管理",
                        children: [
                            {
                                id: 6,
                                label: "计算机学院",
                                children: [
                                    {id: 7, label: "学生管理系统"},
                                    {id: 8, label: "宿舍管理系统宿舍管理系统宿舍管理系统"},
                                ]
                            },
                        ]
                    },

                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },

            }
        },
        methods: {}
    }
</script>

<style lang="less" scoped>
  #a /deep/ .el-tabs {
    min-height: 530px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px 0px;
    border: 1px solid #bbbbbb;
    width: 250px;
    background-color: white;
    border-radius: 8px;
    margin-left: 20px;
    box-sizing: inherit;
    overflow: hidden;

    .el-tabs__header {
      background-color: white;
    }

    .el-tabs__content {
      padding: 0;
    }


    .el-tabs__nav {
      width: 100%;
      transform: translateX(0) !important;

      .el-tabs__item {
        width: 51%;
        color: rgb(16, 16, 16);

        &:hover {
          color: rgb(16, 16, 16);
        }
      }

      .is-active {
        background-color: #F0F0F0;
        font-weight: bold;
      }
    }

    .intf_left_in {
      display: flex;
      align-items: center;
      height: 80px;
      background-color: #F0F0F0;
    }
  }

  .intfBg {
    width: 1200px;
    min-height: 630px;
    margin: 20px auto 40px;
    background-color: white;
    border-radius: 8px;
    border: 1px solid rgb(187, 187, 187);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px 0px;

    .intf_rh {
      min-height: 530px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px 0px;
      border: 1px solid #bbbbbb;
      width: 250px;
      background-color: white;
      border-radius: 8px;
      margin-left: 20px;

    }

    .intf_rh {
      width: 870px;
      margin-left: 30px;
    }

    .intfBg_header {
      display: flex;
      padding: 10px 0;
      position: relative;

      /deep/ .el-breadcrumb {
        line-height: 40px;
        left: 20px;
        position: absolute;
      }

      /deep/ .el-tabs {
        width: 100%;

        .el-tabs__nav {
          transform: translateX(190%) !important;
        }
      }
    }

    //目录树
    /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
      background-color: #66B1FF;
      color: white !important;

      .el-icon-delete-solid:before, .el-icon-caret-right:before {
        color: white !important;
      }

    }

    /*.el-tree /deep/ .el-tree-node:focus> .el-tree-node__content {*/
    /*  background-color: #005fffb8;*/
    /*  color: white !important;*/

    /*  .el-icon-delete-solid:before, .el-icon-caret-right:before {*/
    /*    color: white !important;*/
    /*  }*/
    /*}*/

    .el-tree /deep/ .folder_name {
      font-size: 13px;
      text-align: left;
      width: 120px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .el-tree /deep/ .el-icon-delete-solid:before {
      font-size: 18px;
      color: #101010a6;
      margin-right: 20px;
    }

    .el-tree /deep/ .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      height: 16px;
    }

    .el-tree /deep/ .el-tree-node__content {
      padding: 10px 0;
      height: 50px;
    }

    .el-tree /deep/ .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    .el-tree /deep/ .el-icon-caret-right:before {
      content: "\e78a";
      font-size: 18px;
      padding-left: 15px;
      color: #101010;

    }

    .el-tree /deep/ .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
      content: "\e784";
      font-size: 18px;
    }

  }
</style>

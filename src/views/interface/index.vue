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
                    <el-input v-model="searchIntfName" placeholder="接口名称" size="small"
                              style="width: 155px;margin-left: 15px"></el-input>
                    <el-dropdown trigger="click" placement="bottom"  @command="ShowView">
                      <el-button type="primary"
                                 style="margin-left: 10px;font-size: 20px;height: 30px;line-height: 0px">+
                      </el-button>
                      <el-dropdown-menu slot="dropdown" class="drops" >
                        <el-dropdown-item :command="{'index':'one'}">
                          <span class="iconfont icon-jiekou" style=" margin-right: 5px;"></span>添加接口
                        </el-dropdown-item>
                        <el-dropdown-item class="iconfont " :command="{'index':2}">
                          <span class="iconfont icon-fenlei" style=" margin-right: 5px;"></span>新增分类
                        </el-dropdown-item>
                        <el-dropdown-item :command="{'index':'some'}">
                          <span class="iconfont icon-piliangtianjia" style=" margin-right: 5px;"></span>批量导入
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <!--接口列表树-->
                  <el-tree
                    id="xxx"
                    :data="intfData"
                    @node-click="nodeClick"
                    :props="defaultProps"
                    :filter-node-method="searchIntf"
                    :highlight-current='true'
                    accordion
                    ref="tree"
                    :expand-on-click-node="isShowMore">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <div v-if="data.id == 0">
                        <span class='custom-tree-node'>
                          <span class="el-tree-node__expand-icon el-icon-caret-right"></span>
                            <span class='folder_name' style="padding-left: 6px"> {{node.label}} </span>
                         </span>
                      </div>
                      <div v-else-if="data.isIntf">
                         <span class='custom-tree-node'>
                           <strong style='width:50px;text-align: left;font-size:12px;color:#66B1FF'>{{data.method.toUpperCase()}}</strong>
                           <span class='folder_name'> {{node.label}} </span>
                           <span class='el-icon-delete-solid' @click=deleteIntf(data)></span>
                         </span>
                      </div>
                      <div v-else>
                        <span class='custom-tree-node'>
                           <span class='folder_name'> {{node.label}} </span>
                           <el-dropdown trigger="click" @visible-change=menuChange @command="ShowView">
                             <span class="el-icon-s-fold" @click="isShowMore=false"></span>
                             <el-dropdown-menu slot="dropdown" class="drop">
                               <el-dropdown-item :command="{'index':0,'data':data}">
                                 <span class="iconfont icon-daochu" style=" margin-right: 5px;"></span>导出接口
                               </el-dropdown-item>
                               <el-dropdown-item class="iconfont" :command="{'index':1,'data':data}">
                                 <span class="iconfont icon-huishouzhan" style=" margin-right: 5px;"></span>删除分类
                               </el-dropdown-item>
                               <el-dropdown-item :command="{'index':2,'data':data}">
                                 <span class="el-icon-plus" style=" margin-right: 5px;"></span>添加分类
                               </el-dropdown-item>
                               <el-dropdown-item :command="{'index':3,'data':data}">
                                 <span class="iconfont icon-wuzhihuashijianzhouiconjihewanjie1-01-copy"
                                       style=" margin-right: 5px;"></span>接口归档
                               </el-dropdown-item>
                             </el-dropdown-menu>
                           </el-dropdown>
                         </span>
                      </div>
                    </span>
                  </el-tree>
                </el-tab-pane>
                <el-tab-pane label="历史记录">
                  <div class="intf_left_in">
                    <el-input v-model="searchHistory" placeholder="接口名称" size="small"
                              style="width: 155px;margin-left: 15px"></el-input>
                    <el-button type="primary"
                               style="margin-left: 10px;font-size: 12px;height: 30px;line-height: 0px;padding: 12px 14px">
                      搜索
                    </el-button>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="intf_rh">
              <router-view></router-view>
            </div>
          </div>
        </el-tab-pane>

        <!--接口导出提示-->
        <el-dialog
          title="提示"
          :visible="showDialog[0]"
          width="25%">
          <div slot="title" class="dialog-title">
            <div class="dialog_head">
              <div>
                <i class="el-icon-warning-outline"></i>
                <span class="title-text">接口导出{{showDialog[0]}}</span>
              </div>
              <div class="button-right">
                <span class="title-close" @click="showDelete = false"></span>
              </div>
            </div>
            <div class="dialog_mes">
              <span style="padding-right: 5px">文件类型</span>
              <el-select v-model="fileType" placeholder="请选择导出文件类型" size="small">
                <el-option label="html" value="html"></el-option>
                <el-option label="json" value="json"></el-option>
              </el-select>
              <div style="margin: 15px 0 0 60px">
                <span class="el-icon-download"></span>
                <span>导出接口文档为{{fileType}}文件</span>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog[0] = false;showDialog.push()" size="small">取 消</el-button>
          <el-button type="primary" @click="exportIntf" size="small">确 定</el-button>
        </span>
        </el-dialog>

        <!--删除分类提示-->
        <el-dialog
          title="提示"
          :visible.sync="showDialog[2]"
          width="25%">
          <div slot="title" class="dialog-title">
            <div class="dialog_head">
              <div>
                <i class="el-icon-warning-outline"></i>
                <span class="title-text">添加分类</span>
              </div>
              <div class="button-right">
                <span class="title-close" @click="showDelete = false"></span>
              </div>
            </div>
            <div class="dialog_mes">
              <span style="padding-right: 5px">分类名称</span>
              <el-input size="small" v-model="addModuleName" placeholder="分类名称" style="width: 200px"></el-input>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog[2] = false;showDialog.push()" size="small">取 消</el-button>
          <el-button type="primary" @click="removeIntf" size="small">确 定</el-button>
        </span>
        </el-dialog>

        <!--添加分类提示-->
        <el-dialog
          title="提示"
          :visible.sync="showDialog[1]"
          width="25%">
          <div slot="title" class="dialog-title">
            <div class="dialog_head">
              <div>
                <i class="el-icon-warning-outline"></i>
                <span class="title-text">确定删除此接口分类吗？</span>
              </div>
              <div class="button-right">
                <span class="title-close" @click="showDelete = false"></span>
              </div>
            </div>
            <div class="dialog_mes">确定删除'{{moduleMes.label}}'分类，以及其下所有接口么？删除后将不可恢复！</div>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog[1] = false;showDialog.push()" size="small">取 消</el-button>
          <el-button type="primary" @click="removeIntf" size="small">确 定</el-button>
        </span>
        </el-dialog>

        <!--接口归档-->
        <el-dialog
          title="提示"
          :visible.sync="showDialog[3]"
          width="25%">
          <div slot="title" class="dialog-title">
            <div class="dialog_head">
              <div>
                <i class="el-icon-warning-outline"></i>
                <span class="title-text">接口归档</span>
              </div>
              <div class="button-right">
                <span class="title-close" @click="showDelete = false"></span>
              </div>
            </div>
            <div class="dialog_mes">将该分类下所有的接口归档！归档后将无法修改！</div>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog[3] = false;showDialog.push()" size="small">取 消</el-button>
          <el-button type="primary" @click="endIntf" size="small">确 定</el-button>
        </span>
        </el-dialog>

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
                isShowMore: true,
                //添加分类名称
                addModuleName:'',
                //文件类型
                fileType: "html",
                //选择的模块
                moduleMes: {},
                showDialog:[false,false,false,false],
                //搜索
                searchIntfName: '',
                //历史搜索
                searchHistory: '',
                //接口列表
                intfData: [
                    {
                        id: 0, label: '我的接口'
                    },
                    {
                        id: 1,
                        label: "用户中心",
                        children: [
                            {
                                id: 2,
                                label: "个人信息",
                                children: [
                                    {id: 3, label: "用户名修改", isIntf: true, method: 'put'},
                                    {id: 4, label: "密码修改", isIntf: true, method: 'put'},
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
                                    {id: 7, label: "学生管理系统", isIntf: true, method: 'put'},
                                    {id: 8, label: "宿舍管理系统宿舍管理系统宿舍管理系统", isIntf: true, method: 'put'},
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
        methods: {
            nodeClick(e) {
                if(e.id != 0)
                  document.getElementById('xxx').getElementsByTagName('div')[0].className = 'el-tree-node is-focusable';
                else
                    this.$router.push(`/home/intfIndex/1/`)
            },
            //导出接口
            exportIntf() {
                console.log(this.moduleMes)
            },
            //删除接口
            removeIntf() {
                console.log(this.moduleMes)
            },
            //接口归档
            endIntf() {
                console.log(this.moduleMes)
            },
            //点击模块右侧menu
            ShowView(command) {
                console.log(command)

                if(command.index == 'one'){
                    this.$router.push("./AddIntf")
                    return;
                }
                if(command.index == 'some'){
                    this.$router.push("./ExportIntf")
                    return;
                }
                if(command.data) this.moduleMes = command.data
                this.showDialog[command.index] = true;
                this.showDialog.push()
                console.log(this.showDialog)
            },
            menuChange(e) {
                this.isShowMore = !e
            },
            //搜索
            searchIntf(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //删除接口
            deleteIntf(e) {
                this.$confirm(`确定要删除接口${e.label}吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //删除接口
                }).then(() => {

                })
            },
            //目录
            // renderContent(h, {node, data, store}) {
            //     if(data.id == 0) return(
            //         < span class='custom-tree-node'>
            //         < span class='folder_name'> {node.label} < /span>
            //     < /span>
            //     );
            //     if(data.isIntf) return(
            //         < span class='custom-tree-node'>
            //         <strong style='width:50px;text-align: left;font-size:12px;color:#66B1FF'>{data.method.toUpperCase()}</strong>
            //         < span class='folder_name'> {node.label} < /span>
            //         < span class='el-icon-delete-solid' on-click={() => this.deleteIntf(data)}>< /span>
            //         < /span>
            //      );
            //     return (
            //         < span class='custom-tree-node'>
            //         < span class='folder_name'> {node.label} < /span>
            //         <el-dropdown trigger="click" nativeOnClick={()=>this.menuChange(this.$refs['tree'])}>
            //           <span class="el-icon-s-fold" on-click={()=>this.isShowMore = false}></span>
            //           <el-dropdown-menu slot="dropdown">
            //             <el-dropdown-item>黄金糕</el-dropdown-item>
            //             <el-dropdown-item>狮子头</el-dropdown-item>
            //             <el-dropdown-item>螺蛳粉</el-dropdown-item>
            //             <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            //           </el-dropdown-menu>
            //         </el-dropdown>
            //     < /span> );
            // },
        },
        mounted() {
            document.getElementById('xxx').getElementsByTagName('div')[0].className = 'el-tree-node is-current is-focusable';
        }
    }
</script>

<style>
  .drop {
    left: 348px !important;
  }

  .drops {
    left: 334px !important;
    top: 230px;
  }
</style>

<style lang="less" scoped>

  /deep/.iconfont{
    font-size: 14px;
  }

    //dialog
  /deep/ .el-dialog__body {
    display: none;
  }

  .dialog_mes {
    font-weight: normal;
    font-size: 13px;
    line-height: 20px;
    padding: 15px 20px 5px;
  }

  .el-dialog__wrapper /deep/ .el-dialog__header {
    padding: 0px;
  }

  .dialog_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    border-bottom: 1px solid #BBBBBB;
  }

  .el-icon-warning-outline:before {
    color: #FAC200;
  }

  .dialog-title {
    text-align: left;
    font-size: 14px;
    font-weight: 700;
    overflow: hidden;
  }

  .dialog-title i {
    color: #45A4F9;
    /* color: #0B2278; */
    font-size: 16px;
    line-height: 38px;
  }

  .dialog-footer {
    text-align: left;
    font-size: 14px;
    font-weight: 700;
  }

  /deep/ .el-icon-s-fold {
    font-size: 18px;
  }

  /deep/ .custom-tree-node > div {
    width: 100%;

    .el-dropdown-selfdefine {
      float: right;
    }
  }

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

      strong {
        color: white !important;
      }

      .el-icon-delete-solid:before, .el-icon-caret-right:before, .el-icon-s-fold:before {
        color: white !important;
      }
    }


    .el-tree /deep/ .folder_name {
      font-size: 13px;
      text-align: left;
      width: 110px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .el-tree /deep/ .el-icon-delete-solid:before, /deep/ .el-icon-s-fold:before {
      font-size: 18px;
      color: #101010a6;
      margin-right: 20px;
    }

    .el-tree /deep/ .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 14px;
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

    .el-tree /deep/ .is-leaf:before {
      content: "" !important;
      padding-left: 5px !important;
    }

    .el-tree /deep/ .is-leaf {
      padding: 0;
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

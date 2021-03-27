<template>
  <div class="set" id="bd">
    <el-page-header @back="goBack" content="项目设置"></el-page-header>

    <!--    <el-menu-->
    <!--      default-active="1"-->
    <!--      class="el-menu-vertical-demo"-->
    <!--      style="width: 200px;height: 100%"-->
    <!--      @close="handleClose">-->
    <!--      <el-menu-item index="1">-->
    <!--          <i class="el-icon-warning-outline"></i>-->
    <!--          <span>基本信息</span>-->
    <!--      </el-menu-item>-->
    <!--      <el-menu-item index="2">-->
    <!--        <i class="iconfont icon-shijian"></i>-->
    <!--        <span slot="title">项目周期</span>-->
    <!--      </el-menu-item>-->
    <!--      <el-menu-item index="3">-->
    <!--        <i class="iconfont icon-gongneng"></i>-->
    <!--        <span slot="title">功能模块</span>-->
    <!--      </el-menu-item>-->
    <!--      <el-menu-item index="4">-->
    <!--        <i class="iconfont icon-tubiaozhizuomoban"></i>-->
    <!--        <span slot="title">所用技术</span>-->
    <!--      </el-menu-item>-->
    <!--      <el-menu-item index="5">-->
    <!--        <i class="iconfont icon-gengduo"></i>-->
    <!--        <span slot="title">所用技术</span>-->
    <!--      </el-menu-item>-->
    <!--    </el-menu>-->


    <el-tabs tab-position="left" style="" class="tabsH">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-warning-outline"></i> 基本信息</span>
        <div>
          <el-form :rules="systemFormRules" :model="systemForm" ref="systemForm">
            <el-form-item prop="name" label="项目名称" label-width="125px">
              <el-input v-model="systemForm.name" size="small" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item prop="basePath" label="接口基本路径" label-width="125px">
              <el-input v-model="systemForm.basePath" size="small" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item prop="introduction" label="项目简介" label-width="125px" class="crtUser">
              <el-input type="textarea" :row="0" v-model="systemForm.introduction" size="small"
                        style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="创建人" label-width="125px" class="crtUser">
              {{systemForm.createUser}}
            </el-form-item>
            <el-form-item label="创建时间" label-width="125px" class="crtUser">
              {{systemForm.createTime}}
            </el-form-item>
            <el-form-item label-width="125px">
              <div style="margin: 10px 15px 0 0;">
                <el-button size="small" type="primary" style="width: 110px">保存</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <el-tab-pane label="项目周期">
        <span slot="label"><i class="iconfont icon-shijian"></i> 项目周期</span>
        <div style="margin-top: 20px;padding-left: 20px">
          <div style="text-align: left;margin-bottom: 5px">预计完成时间</div>
          <div style="display: flex;margin-top: 10px;font-size: 13px">
            <div style="padding:0 25px 25px 0">
              <span style="padding-right: 5px">月</span>
              <el-input-number size="mini":min="1" :max="24"
                               v-model="endMouth"></el-input-number>
            </div>
            <div>
              <span style="padding-right: 5px">日</span>
              <el-input-number size="mini" :min="1" :max="31"
                               v-model="endDay"></el-input-number>
            </div>
            <el-button type="primary" size="small" class="modifyBtn" @click="modifyOrderTime">修改</el-button>
          </div>
          <div style="text-align: left;margin-bottom: 5px">
            项目时间轴
            <el-button type="primary" size="small" class="modifyBtn" @click="modifyOrderTime">修改</el-button>
          </div>
          <el-timeline >
            <el-timeline-item v-for="item in moduleProject" :key="item.id" :timestamp="item.createTime" placement="top">
              <el-card>
                <h4 style="display: flex;align-items: center;justify-content: center">
                  <img :src="item.head" style="width: 20px;margin-right: 5px">{{item.name}}
                </h4>
                <p>完成模块：{{item.moduleName}}</p>
                <p>进度：{{item.progress}}%</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-tab-pane>

      <el-tab-pane label="功能模块" class="fc">
        <span slot="label"><i class="iconfont icon-gongneng"></i> 功能模块</span>
        <div style="text-align: left;margin-top: 15px">
          <el-form label-position="top">
            <el-form-item label="分类名称">
              <el-select v-model="searchModule" filterable placeholder="请选择" size="small">
                <el-option
                  v-for="item in moduleList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button type="primary" size="small" class="modifyBtn" @click="addModuleUser">保存</el-button>
            </el-form-item>
            <el-form-item label="开发人员">
              <div style="display: flex;flex-flow: wrap">
                <el-tag
                  :key="tag.id"
                  v-for="tag in moduleUser"
                  closable
                  :disable-transitions="false"
                  @close="handleRemoveUser(tag)">
                  <div>
                    <div style="display: flex;align-items: center;height: 20px">
                      <el-image style="width: 20px; height: 20px;" :src="tag.head" fit="cover"></el-image>
                      <span style="margin-left: 10px">{{tag.name}}</span>
                    </div>
                    <span>{{tag.joinTime}}</span>
                  </div>
                </el-tag>
              </div>
              <el-button type="text" class="el-icon-circle-plus-outline" size="small"
                         style="font-size: 14px" @click="isInvitationUser = true">人员
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <!--邀请链接-->
      <el-dialog
        width="30%"
        title="邀请成员"
        :visible.sync="isInvitationUser"
        class="invateMember"
        append-to-body>
        <div slot="title" class="header-title">
          <span><i class="el-icon-warning-outline"></i></span>
          <span class="title-age">邀请成员</span>
        </div>
        <el-input v-model="InvitationUserEmail" placeholder="项目中人员邮箱">
          <template slot="append">
            <el-button class="tag-read" @click="invateUser">邀请</el-button>
          </template>
        </el-input>
      </el-dialog>

      <el-tab-pane label="所用技术">
        <span slot="label"><i class="iconfont icon-tubiaozhizuomoban"></i> 所用技术</span>

        <div class="technology">
          <div class="top">
            <span>技术架构</span>
            <div class="tech_img">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <div class="main">
            <div class="title">
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple tech_name">技术名</div>
                </el-col>
                <el-col :span="6">
                  <p></p>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light tech_version">版本号</div>
                </el-col>
                <el-col :span="4">
                  <p></p>
                </el-col>
              </el-row>
            </div>
            <div class="tech_item">
              <div class="data">
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple tech">VUE</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple-light link">
                      <i class="el-icon-paperclip"></i>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple version">2.3.0</div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light remove" @click="removeTech">
                      <i class="el-icon-close"></i>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="divider"></div>
            <div class="tech_item">
              <div class="data">
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple tech">VUE</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple-light link">
                      <i class="el-icon-paperclip"></i>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple version">2.3.0</div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light remove" @click="removeTech">
                      <i class="el-icon-close"></i>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="divider"></div>
            <div class="tech_item">
              <div class="data">
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple tech">VUE</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple-light link">
                      <i class="el-icon-paperclip"></i>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple version">2.3.0</div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light remove" @click="removeTech">
                      <i class="el-icon-close"></i>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="divider"></div>
            <div class="add">
                <el-row>
                  <el-col :span="8">
                    <div class="bind" @click="addTech">
                      <i class="el-icon-circle-plus-outline"></i>
                      <span>新增技术</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <p></p>
                  </el-col>
                  <el-col :span="6">
                    <p></p>
                  </el-col>
                  <el-col :span="4">
                    <p></p>
                  </el-col>
                </el-row>
              </div>
          </div>
          <div class="footer">
            <el-button type="primary">保存</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-dialog
        :visible.sync="techDialogVisible"
        width="30%">
        <div slot="title" align="left" style="display: flex;align-items: center;">
          <i class="el-icon-document-add" style="color: rgb(250,194,0);margin-right: 5px"></i>
          <span style="font-weight: bold;font-size: 14px">新增技术</span>
        </div>
        <span slot="">
          <el-form ref="form" :model="technology" label-width="80px">
            <el-form-item label="技术名称">
              <el-input v-model="technology.name"></el-input>
            </el-form-item>
            <el-form-item label="技术版本">
              <el-input v-model="technology.version"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer">
          <el-button @click="techDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="techDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-tab-pane label="更多">
        <span slot="label"><i class="iconfont icon-gengduo"></i> 更多</span>
        <div class="more">
          <div class="title">项目操作</div>
          <div class="note">您可以执行以下操作</div>
          <div class="operations">
            <el-button @click="archive">归档项目</el-button>
            <el-button @click="exit">退出</el-button>
            <el-button type="danger" @click="remove">移至回收站</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "setting",
        data() {
            return {
                //项目周期，时间轴内容
                moduleProject:[
                    {id: 1, name: '张三', head: '/static/img/head.b818068.png',
                        createTime: '2021-3-24',moduleName:'用户管理',progress:10},
                    {id: 1, name: '李四', head: '/static/img/head.b818068.png',
                        createTime: '2021-3-25',moduleName:'项目管理',progress:20},
                ],
                endMouth:'',
                endDay:'',
                systemFormRules: {
                    name: {required: true, message: "请输入项目名称", trigger: 'blur'},
                    introduction: {required: true, message: "请输入项目简介", trigger: 'blur'},
                    basePath: {required: true, message: "请输入项目基本路径", trigger: 'blur'},
                },
                //项目设置 基本信息form
                systemForm: {
                    name: 'zx',
                    introduction: '第一个项目',
                    basePath: 'http://www.baidu.com',
                    createUser: 'ls',
                    createTime: '2021-3-20'
                },
                //功能模块
                moduleList: [
                    {value: 1, label: '用户管理'},
                    {value: 2, label: '日志管理'},
                    {value: 3, label: '接口管理'},
                ],
                searchModule: '',
                //功能模块 邀请成员窗口
                isInvitationUser: false,
                //功能模块 邀请成员邮箱
                InvitationUserEmail: '',
                //功能模块的开发人员
                moduleUser: [
                  {id: 1, name: '张三', head: '/static/img/head.b818068.png', joinTime: '2021-3-24'},
                  {id: 1, name: '李四', head: '/static/img/head.b818068.png', joinTime: '2021-3-27'},
                ],
                techDialogVisible: false,
                //新增技术窗口
                technology: {
                  name: 'Dubbo',
                  version: '2.3.0',
                },
                imageUrl: '',
                //技术架构图
            }
        },
        methods: {
            goBack() {
              this.$router.go(-1)
            },
            //修改预计完成时间
            modifyOrderTime(){

            },
            //添加模块开发人员
            addModuleUser(){

            },
            //删除成员
            handleRemoveUser(e) {
                this.$confirm(`确定在该模块中移除成员${e.name}吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.moduleUser.splice(this.moduleUser.indexOf(e), 1);
                }).then(() => {
                })
            },
            //功能模块邀请成员
            invateUser() {

            },
            //设置tabs的高度
            setHeight() {
                let h = document.getElementById("bg").style.height
                return `height:${h}`
                console.log(h)
            },
            removeTech() {
              this.$confirm('此操作将删除该技术, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            },
            addTech() {
              this.techDialogVisible = true
            },
            beforeAvatarUpload() {
              //上传之前触发函数
            },
            handleAvatarSuccess() {
              //上传完成触发函数
            },
            archive() {
              //项目归档
              this.$confirm('此操作将归档全部已完成接口，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '归档成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消归档'
                });
              });
            },
            exit() {
              //退出项目
              this.$confirm('是否确认退出该项目?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '退出成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消退出'
                });
              });
            },
            remove() {
              //移至回收站
              this.$confirm('此操作奖项目移至回收站，稍后可在回收站恢复，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '移除成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消移除'
                });
              });
            },
        }
    }
</script>

<style lang="less" scoped>

  .avatar-uploader i{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .modifyBtn{
    height: 28px;
    margin-left: 15px;
    width: 70px;
    line-height: 10px;
  }

  /deep/.el-timeline-item__content{
    width: 40%;

    .el-card__body{
      padding: 10px;
    }
  }

  /deep/.el-timeline-item__timestamp{
    text-align: left;
  }

  .tabsH{
    /*height: 60vh;*/
  }

  /deep/ .crtUser {
    margin-bottom: 10px;
  }

  .set {
    width: 1150px;
    min-height: 500px;
    margin: 20px auto;
    background-color: #FFFFFF;
    border-radius: 6px;
    border: 1px solid rgb(187, 187, 187);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px 0px;


    /deep/ .el-page-header {
      padding: 15px;
      border-bottom: 1px solid rgb(187, 187, 187);
    }

    /deep/ .el-tabs {
      padding: 0 50px;
    }

    /deep/ .el-form {
      margin-top: 20px;
    }

    /deep/ .el-tabs__item {
      height: 50px;
      line-height: 50px;
    }

    /deep/ .fc {
      margin-left: 20px;

      .el-tabs__content {
      }
    }

  }


  .el-form-item__content {
    padding-left: 15px;
  }


  .el-form {
    margin-top: 25px;
  }

  /deep/ .el-tag .el-tag__close {
    color: rgb(16, 16, 16);

    &:hover {
      color: white;
    }
  }

  /deep/ .el-tag {
    width: 100px;
    height: 55px;
    display: flex;
    align-items: center;
    background-color: white;
    color: rgb(16, 16, 16);
    border: none;
    margin-bottom: 0;
  }

  /deep/ .el-form-item__content {
    display: flex;
    align-items: center;
    justify-content: left;
  }

  /deep/ .el-dialog__header {
    border-bottom: 1px solid #BBBBBB;

    .el-icon-warning-outline:before {
      color: #FAC200;
    }
  }

  /deep/ .el-input-group__append {
    background-color: #1890FF;
    color: white;
    cursor: pointer;
  }

  /deep/ .el-dialog__body {
    padding: 25px 20px 30px;
  }

  .technology {
    padding: 20px;
    .top {
      display: flex;
      span {
        flex: 3;
        font-size: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .tech_img {
        flex: 5;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }
    .main {
      .title {
        padding: 20px;
        .tech_name,.tech_version {
          font-size: 24px;
        }
      }
      .tech_item {
        padding: 20px 0 0 0;
        .data {
          .tech,.link,.version,.remove {
            color: rgb(24,144,255);
          }
          .tech,.version {
            font-size: 18px;
          }
          .link {
            font-size: 20px;
          }
          .remove {
            color: rgb(169,169,169);
            font-size: 20px;
            cursor: pointer;
          }
          .remove:hover {
            color: rgb(24,144,255);
          }
        }
        /*transform:rotate(-3deg);*/
        /*-ms-transform:rotate(-3deg); !* IE 9 *!*/
        /*-webkit-transform:rotate(-3deg); !* Safari and Chrome *!*/
      }
      .divider {
        margin: 10px 240px 10px 130px;
        border-bottom: 1px solid rgb(191,191,191);
        /*transform:rotate(-3deg);*/
        /*-ms-transform:rotate(-3deg); !* IE 9 *!*/
        /*-webkit-transform:rotate(-3deg); !* Safari and Chrome *!*/
      }
      .add {
        margin-top: 20px;
        color: rgb(187,187,187);
        .bind {
          display: flex;
          flex-direction: column;
          align-items: center;
          i {
            font-size: 28px;
            cursor: pointer;
          }
          span {
            margin: 10px 0;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
    .footer {
      padding: 10px;
    }
  }

  .more {
    padding: 20px 0 0 20px;
    text-align: left;
    .title {
      font-size: 20px;
      padding: 15px 0;
    }
    .note {
      font-size: 16px;
      color: rgb(140,151,170);
    }

    .operations {
      margin-top: 15px;
    }
  }


</style>

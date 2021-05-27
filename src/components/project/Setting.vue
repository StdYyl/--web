<template>
  <div class="set" id="bd">
    <el-page-header @back="goBack" content="项目设置"></el-page-header>
    <el-tabs tab-position="left" style="" class="tabsH">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-warning-outline"></i> 基本信息</span>
        <div>
          <el-form :rules="systemFormRules" :model="systemForm" ref="systemForm">
            <el-form-item prop="name" label="项目名称" label-width="125px">
              <el-input v-model="systemForm.name" size="small" style="width: 300px"
                :disabled="systemForm.createuser.id!=userId"></el-input>
            </el-form-item>
            <el-form-item prop="basePath" label="接口基本路径" label-width="125px">
              <el-input v-model="systemForm.basepath" size="small" style="width: 300px"
                        :disabled="systemForm.createuser.id!=userId"></el-input>
            </el-form-item>
            <el-form-item prop="introduction" label="项目简介" label-width="125px" class="crtUser">
              <el-input type="textarea" :row="0" v-model="systemForm.introduction" size="small"
                        style="width: 300px" :disabled="systemForm.createuser.id!=userId"></el-input>
            </el-form-item>
            <el-form-item label="创建人" label-width="125px" class="crtUser">
              {{systemForm.createuser.name}}
            </el-form-item>
            <el-form-item label="创建时间" label-width="125px" class="crtUser">
              {{new Date(systemForm.createtime).getFullYear()}}-{{new Date(systemForm.createtime).getMonth()+1}}-{{new Date(systemForm.createtime).getDate()}}
            </el-form-item>
            <el-form-item label-width="125px">
              <div style="margin: 10px 15px 0 0;">
                <el-button size="small" type="primary" style="width: 110px" @click="saveProject" v-if="systemForm.createuserid==userId">保存</el-button>
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
                               v-model="endMouth" :disabled="systemForm.createuser.id!=userId"></el-input-number>
            </div>
            <div>
              <span style="padding-right: 5px">日</span>
              <el-input-number size="mini" :min="1" :max="31"
                               v-model="endDay" :disabled="systemForm.createuser.id!=userId"></el-input-number>
            </div>
            <div>
              <el-button type="primary" size="small" class="modifyBtn" @click="modifyOrderTime" v-if="systemForm.createuser.id==userId">修改</el-button>
            </div>
          </div>
          <div style="text-align: left;margin-bottom: 5px">
            项目时间轴
            <el-button type="primary" size="small" class="modifyBtn" @click="modifyCycleNode">修改</el-button>
          </div>
          <el-timeline class="infinite-list" infinite-scroll-distance="0.5" v-infinite-scroll="load" style="overflow:auto;height: 300px;margin-bottom: 20px;">
            <el-timeline-item v-for="item in moduleProject" :key="item.id"
                              :timestamp="item.createtime" class="infinite-list-item" placement="top">
              <el-card>
                <h4 style="display: flex;align-items: center;justify-content: center">
                  <img :src="item.user.head" style="width: 20px;margin-right: 5px">{{item.user.name}}
                </h4>
                <div style="display: flex;align-items: center;justify-content: center">
                  <el-table
                    :data="item.modules"
                    style="width: 100%">
                    <el-table-column
                      prop="module"
                      label="完成模块"
                      min-width="1"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="progress"
                      label="进度"
                      min-width="1"
                      align="center">
                      <template slot-scope="scope">
                        {{scope.row.progress}}%
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="开发人员"
                      min-width="1"
                      align="center">
                      <template slot-scope="scope">
                        <span v-for="user in scope.row.chargers">
                          {{user.name}}
                        </span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
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
              <el-select v-model="searchModule" filterable placeholder="请选择" size="small" @change="changeModule">
                <el-option
                  v-for="item in moduleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button type="primary" size="small" class="modifyBtn" @click="manageModule" v-if="systemForm.createuser.id==userId">模块变动</el-button>
            </el-form-item>
            <el-form-item label="开发人员">
              <div style="display: flex;flex-flow: wrap">
                <el-tag
                  :key="tag.id"
                  v-for="tag in moduleUser"
                  :closable="systemForm.createuser.id==userId"
                  :disable-transitions="false"
                  @close="handleRemoveUser(tag)">
                  <div v-if="tag">
                    <div style="display: flex;align-items: center;height: 20px">
                      <el-image style="width: 20px; height: 20px;" :src="tag.user.head" fit="cover"></el-image>
                      <span style="margin-left: 10px">{{tag.user.name}}</span>
                    </div>
                    <span>{{tag.jointime}}</span>
                  </div>
                </el-tag>
              </div>
              <el-button type="text" class="el-icon-circle-plus-outline" size="small"
                         style="font-size: 14px" @click="openJoinedPanel" v-if="searchModule && systemForm.createuser.id==userId"> 人员
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
        <div style="display: flex;">
          <el-select v-model="joinedMember" placeholder="请选择" style="flex: 1;">
            <el-option
              v-for="item in joinedMemberList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button class="tag-read" @click="joinUser" style="margin-left: 20px;" :disabled="joinedMember==null">确认加入</el-button>
        </div>
      </el-dialog>

      <!--模块变动-->
      <el-dialog
        width="30%"
        title="邀请成员"
        :visible.sync="isVisibleModule"
        class="invateMember"
        append-to-body>
        <div slot="title" class="header-title">
          <span><i class="el-icon-warning-outline"></i></span>
          <span class="title-age">模块管理</span>
        </div>
        <div style="display: flex;flex-direction: column;">
          <el-table
            :data="moduleList"
            border
            style="width: 100%">
            <el-table-column
              fixed
              prop="id"
              label="编号"
              width="60"
              align="center">
            </el-table-column>
            <el-table-column
              fixed
              prop="name"
              label="模块名称"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="createtime"
              label="创建时间"
              width="200"
              align="center">
              <template slot-scope="scope">
                {{dateFormat(scope.row.createtime, 'YYYY-MM-DD HH:mm')}}
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleRemoveModuleFromProject(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button class="tag-read" @click="openModuleAddPanel" style="margin-top: 20px;">新增模块</el-button>
        </div>
      </el-dialog>

      <!-- 新增模块 -->
      <el-dialog
        :visible.sync="moduleDialogVisible"
        width="30%">
        <div slot="title" align="left" style="display: flex;align-items: center;">
          <i class="el-icon-document-add" style="color: rgb(250,194,0);margin-right: 5px"></i>
          <span style="font-weight: bold;font-size: 14px">新增模块</span>
        </div>
        <span slot="">
          <el-form ref="form" :model="module" label-width="80px">
            <el-form-item label="模块名称">
              <el-input v-model="module.name"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer">
          <el-button @click="moduleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addModule">确 定</el-button>
        </span>
      </el-dialog>

      <el-tab-pane label="所用技术">
        <span slot="label"><i class="iconfont icon-tubiaozhizuomoban"></i> 所用技术</span>

        <div class="technology">
          <div class="top">
            <span>技术架构</span>
            <div class="tech_img">
              <el-upload
                class="avatar-uploader"
                action="http://39.102.48.244:8080/interface_img_server2-1.0-SNAPSHOT/file/upload/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :disabled="systemForm.createuserid!=userId">
                <img v-if="imageUrl" :src="'http://39.102.48.244:8080/interface_img_server2-1.0-SNAPSHOT/upload/'+imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <i class="el-icon-zoom-in pic-zoom-in" @click="techPicDialogVisible = true" style="margin-left: 50px;font-size: 25px;cursor: pointer;"></i>
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
            <div v-for="(item, idx) in technologyList" :key="item.name">
              <div class="tech_item">
                <div class="data">
                  <el-row>
                    <el-col :span="8">
                      <div class="grid-content bg-purple tech">{{item.name}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple-light link">
                        <i class="el-icon-paperclip"></i>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple version">{{item.version}}</div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple-light remove" @click="removeTech(idx)" v-if="systemForm.createuserid==userId">
                        <i class="el-icon-close"></i>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="divider"></div>
            </div>
            <div class="add">
                <el-row>
                  <el-col :span="8">
                    <div class="bind" @click="openAddPanel" v-if="systemForm.createuserid==userId">
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
            <el-button type="primary" @click="saveTechnology" v-if="systemForm.createuserid==userId">保存</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-dialog
        :visible.sync="techPicDialogVisible"
        width="50%">
        <div slot="title" align="left" style="display: flex;align-items: center;">
          <i class="el-icon-picture-outline" style="color: rgb(250,194,0);margin-right: 5px"></i>
          <span style="font-weight: bold;font-size: 14px">技术架构图</span>
        </div>
        <span slot="">
          <div>
            <el-image
              style="height: 400px"
              :src="'http://39.102.48.244:8080/interface_img_server2-1.0-SNAPSHOT/upload/'+imageUrl"
              fit="scale-down"></el-image>
          </div>
        </span>
        <span slot="footer">
          <el-button type="primary" @click="techPicDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
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
              <el-input v-model="technology.name" placeholder="请输入技术名称"></el-input>
            </el-form-item>
            <el-form-item label="技术版本">
              <el-input v-model="technology.version" placeholder="请输入版本号"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer">
          <el-button @click="techDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTech">确 定</el-button>
        </span>
      </el-dialog>
      <el-tab-pane label="更多">
        <span slot="label"><i class="iconfont icon-gengduo"></i> 更多</span>
        <div class="more">
          <div class="title">项目操作</div>
          <div class="note">您可以执行以下操作</div>
          <div class="operations">
            <el-button @click="archive" v-if="systemForm.createuser.id==userId">归档项目</el-button>
            <el-button @click="exit" v-if="systemForm.createuser.id!=userId">退出</el-button>
            <el-button type="danger" @click="remove" v-if="systemForm.createuser.id==userId">移至回收站</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {getProjectByPid, updateProject, exit, archiveProject} from "../../api/project";
    import {confirmMessage, notice} from "../../utils/elementUtils";
    import {listCycleNode, addCycleNode} from "../../api/cycle";
    import {
      queryModuleListByPid,
      queryModuleUserListByMid,
      inviteUser,
      addDirectory,
      removeDirectory
    } from "../../api/directory";
    import {removeUserFromModule, addUserToModule} from "../../api/moduleanduser";
    import {findUserListByPid} from "../../api/projectanduser";
    import moment from 'moment';

    export default {
        name: "setting",
        data() {
            return {
                userId: null,
                //项目周期，时间轴内容
                moduleProject:[],
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
                    basepath: 'http://www.baidu.com',
                    createuser: {
                      name: 'XXX',
                    },
                    createtime: '2021-3-20',
                    technicalpicture: '',
                },
                //项目周期
                page: 1,
                size: 2,
                //功能模块
                isVisibleModule: false,
                moduleDialogVisible: false,
                module: {
                  name: '',
                },
                moduleList: [],
                searchModule: null,
                //功能模块 添加成员窗口
                isInvitationUser: false,
                //选择加入的开发人员
                joinedMember: null,
                //功能模块 可加入的开发人员
                joinedMemberList: [
                  {id:1,name:'张三',},
                  {id:2,name:'李四'}
                ],
                //功能模块的开发人员
                moduleUser: [],
                technologyList: [],
                techDialogVisible: false,
                techPicDialogVisible: false,
                //新增技术窗口
                technology: {
                  name: '',
                  version: '',
                },
                //技术架构图
                imageUrl: '',
            }
        },
        methods: {
            goBack() {
              this.$router.go(-1)
            },
            //修改预计完成时间
            modifyOrderTime(){
              if(this.systemForm.id) {
                confirmMessage(this, '确定修改项目完成时间吗？').then(async () => {
                  this.systemForm.endmonth = this.endMouth;
                  this.systemForm.endday = this.endDay;
                  let res = await updateProject(this.systemForm);
                  console.log(res);
                  if(res.data.code === 200) {
                    notice(this, '修改成功');
                  } else {
                    notice(this, '修改失败', 'error');
                  }
                }).catch(() => {
                  notice(this, '已取消更改', 'info');
                })
              }
            },
            //修改项目周期节点
            async modifyCycleNode() {
              let moduleNode;
              let res = await addCycleNode({
                pid: this.systemForm.id,
                uid: this.userId,
              });
              if(res.data.code === 200) {
                moduleNode = res.data.data.body;
                moduleNode.modules = JSON.parse(moduleNode.dirandprog);
                let date = new Date(moduleNode.createtime);
                moduleNode.createtime = date.getUTCFullYear()+'-'+date.getUTCMonth()+'-'+date.getUTCDate()
                +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
                if(!this.moduleProject) this.moduleProject = [];
                this.moduleProject.splice(0,0,moduleNode);
                notice(this, '节点已自动生成');
              } else {
                notice(this, res.data.data, 'error');
              }
            },
            //懒加载方式查看周期节点
            async load() {
              this.page++;
              let res = await listCycleNode({
                pid: this.$route.params.id,
                page: this.page,
                size: this.size,
              });
              if(res.data.code === 200) {
                if(res.data.data.list && res.data.data.list.length>0) {
                  res.data.data.list.forEach((item) => {
                    let date = new Date(item.createtime);
                    item.createtime = date.getUTCFullYear()+'-'+(date.getUTCMonth()+1)+'-'+date.getUTCDate()
                      +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
                    let modules = JSON.parse(item.dirandprog);
                    item.modules = modules;
                    this.moduleProject.push(item);
                  })
                }
                // if(this.page>(res.data.data.total%this.size==0?res.data.data.total/this.size:(res.data.data.total/this.size)+1)) {
                //   notice(this, '已经没有更多数据了', 'info');
                //   return;
                // }
              }
            },
            //添加模块开发人员
            manageModule(){
              console.log(this.moduleUser);
              this.searchModule = null;
              this.moduleUser = [];
              this.isVisibleModule = true;
            },
            //删除成员
            handleRemoveUser(e) {
                if(e.user.id == this.userId) {
                  notice(this, '您是项目负责人，不可移除', 'warning');
                  return;
                }
                confirmMessage(this,  `确定在该模块中移除成员${e.user.name}吗？`).then(async () => {
                  let res = await removeUserFromModule({
                    mauid: e.id,
                    pid: this.$route.params.id,
                  });
                  if(res.data.code === 200) {
                    notice(this, '移除成功', 'success');
                    this.moduleUser.splice(this.moduleUser.indexOf(e), 1);
                  } else {
                    notice(this, '移除失败', 'error');
                  }
                }).catch(() => {
                  notice(this, '取消移除', 'info');
                })
            },
            //打开成员加入面板
            async openJoinedPanel() {
              console.log(this.moduleUser);
              let res = await findUserListByPid({
                pid: this.$route.params.id,
              });
              if(res.data.code === 200) {
                if(res.data.data.total>0) {
                  if(this.moduleUser) {
                    this.joinedMemberList = res.data.data.list.filter((item) => {
                      let user = this.moduleUser.find((module) => {
                        return module.userid == item.id;
                      })
                      if(user) return false;
                      return true;
                    });
                  } else {
                    this.joinedMemberList = res.data.data.list;
                  }
                }
              }
              this.isInvitationUser=true;
            },
            //功能模块成员加入
            async joinUser() {
              let res = await addUserToModule({
                uid: this.joinedMember,
                mid: this.searchModule,
              });
              if(res.data.code === 200) {
                let moduleanduser = res.data.data.body;
                let date = new Date(moduleanduser.jointime);
                moduleanduser.jointime = date.getUTCFullYear()+'-'+date.getUTCMonth()+'-'+date.getUTCDate();
                let temp = this.joinedMemberList.find((item) => {
                  return item.id == this.joinedMember;
                });
                this.joinedMemberList.splice(temp, 1);
                this.moduleUser.push(moduleanduser);
                notice(this, '加入成功', 'success');
                this.isInvitationUser = false;
              } else {
                notice(this, '加入失败', 'error');
              }
            },
            //设置tabs的高度
            setHeight() {
                let h = document.getElementById("bg").style.height
                return `height:${h}`
                console.log(h)
            },
            removeTech(idx) {
              this.technologyList.splice(idx, 1);
            },
            openAddPanel() {
              this.technology.name = '';
              this.technology.version = '';
              this.techDialogVisible = true
            },
            addTech() {
              if(!this.technology.name || !this.technology.version) {
                notice(this, '请将技术名称和技术版本补全', 'warning');
                return;
              }
              if(!this.validateTech()) {
                notice(this, '该技术已经存在，无法继续添加', 'warning');
                return;
              }
              this.technologyList.push({
                name: this.technology.name,
                version: this.technology.version,
              });
              this.techDialogVisible = false;
              this.technology.name='';
              this.technology.version='';
            },
            validateTech() {
              if(this.technologyList.find((item) => {
                if(item.name == this.technology.name) return true;
              })) return false;
              return true;
            },
            saveTechnology() {
              confirmMessage(this, '此操作将保存对技术的更改, 是否继续?').then(async () => {
                let project = this.systemForm;
                project.technical = JSON.stringify(this.technologyList);
                console.log(project);
                let res = await updateProject(project);
                if(res.data.code === 200) {
                  notice(this, '保存成功', 'success');
                } else {
                  notice(this, res.data.msg, 'error');
                }
              }).catch(() => {
                notice(this, '已取消保存', 'info');
              });
            },
            beforeAvatarUpload(file) {
              //上传之前触发函数
              const isJPG = file.type === 'image/jpeg';
              const isLt2M = file.size / 1024 / 1024 < 2;

              if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                return;
              }
              if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                return;
              }
              if(isJPG && isLt2M) {

                return true;
              } else {
                return false;
              }
            },
            handleAvatarSuccess(res, file) {
              //上传完成触发函数
              // this.imageUrl = URL.createObjectURL(file.raw);
              if(res.code === 200) {
                if(res.data.status === 'OK') {
                  this.imageUrl = res.data.filename;
                  this.systemForm.technicalpicture = this.imageUrl;
                  notice(this, '上传图片成功', 'success');
                  return;
                }
              }
              notice(this, '上传图片失败', 'error');
            },
            archive() {
              //项目归档
              if(this.systemForm.id) {
                let tempProject = this.systemForm;
                confirmMessage(this, '此操作将归档全部已完成接口，是否继续?').then(async () => {
                  this.systemForm.status=2;
                  let res = await archiveProject(this.systemForm);
                  console.log(res);
                  if(res.data.code === 200) {
                    notice(this, '归档成功');
                  } else {
                    notice(this, '归档失败', 'error');
                    this.systemForm = tempProject;
                  }
                }).catch(async () => {
                  notice(this, '已取消归档', 'info');
                });
              }
            },
            exit() {
              //退出项目
              if(this.systemForm.id) {
                confirmMessage(this, '是否确认退出该项目?').then(async () => {
                  let res = await exit({
                    pid: this.systemForm.id,
                    uid: localStorage.getItem('id'),
                  });
                  console.log(res);
                  if(res.data.code === 200) {
                    notice(this, '退出成功');
                    this.$router.push('/home');
                  } else {
                    notice(this, '退出失败', 'error');
                  }
                }).catch(async () => {
                  notice(this, '已取消退出', 'info');
                });
              }
            },
            remove() {
              //移至回收站
              if(this.systemForm.id) {
                let tempProject = this.systemForm;
                confirmMessage(this, '此操作奖项目移至回收站，稍后可在回收站恢复，是否继续?').then(async () => {
                  this.systemForm.isremove=2;
                  let res = await updateProject(this.systemForm);
                  console.log(res);
                  if(res.data.code === 200) {
                    notice(this, '移除成功');
                    this.$router.push('/home');
                  } else {
                    notice(this, '移除失败', 'error');
                    this.systemForm = tempProject;
                  }
                }).catch(async () => {
                  notice(this, '已取消移除', 'info');
                });
              }
            },
            async saveProject() {
              if(this.systemForm.id) {
                confirmMessage(this, '是否确定更新项目信息?').then(async () => {
                  let res = await updateProject(this.systemForm);
                  console.log(res);
                  if(res.data.code === 200) {
                    notice(this, '更新成功');
                  } else {
                    notice(this, '更新失败', 'error');
                  }
                }).catch(() => {
                  notice(this, '已取消更新', 'info');
                });
              }
            },
            async changeModule() {
              this.moduleUser = []
              let res = await queryModuleUserListByMid({
                mid: this.searchModule,
              });
              if(res.data.code === 200) {
                this.moduleUser = res.data.data.list?res.data.data.list:[];
                if(res.data.data.total > 0) {
                  this.moduleUser.forEach((item) => {
                    let date = new Date(item.jointime);
                    item.jointime = date.getUTCFullYear()+'-'+date.getUTCMonth()+'-'+date.getUTCDate();
                  })
                }
              }
            },
            //日期转换方法
            dateFormat(date, pattern) {
              return moment(date).format(pattern);
            },
            handleRemoveModuleFromProject(module) {
              confirmMessage(this, '该模块下的开发人员将同时被释放，是否确定从该项目中移除该模块？').then(async () => {
                let res = await removeDirectory({
                  did: module.id,
                });
                if(res.data.code === 200) {
                  this.moduleList.splice(this.moduleList.findIndex((item) => {
                    return item.id == module.id;
                  }), 1);
                  notice(this, '删除成功', 'success')
                } else {
                  notice(this, '删除失败', 'error')
                }
              }).catch(() => {
                notice(this, '取消删除', 'info')
              });
            },
            openModuleAddPanel() {
              this.module.name = '';
              this.moduleDialogVisible = true;
            },
            async addModule() {
              let directory = {};
              directory.name = this.module.name;
              directory.category = 1;
              directory.archive = 1;
              directory.parentid = -1;
              directory.createtime = new Date();
              directory.createby = localStorage.getItem('id');
              directory.isdeleted = 1;
              directory.projectid = this.$route.params.id;
              let res = await addDirectory(directory);
              if(res.data.code === 200) {
                let module = res.data.data.body;
                this.moduleList.push(module);
                this.moduleDialogVisible = false;
                notice(this, '添加成功', 'success');
              } else {
                notice(this, '添加失败', 'error');
              }
            },
        },
        async mounted() {
          this.userId = localStorage.getItem('id');
          let res = await getProjectByPid({
            pid: this.$route.params.id,
          });
          if(res.data.code === 200) {
            this.systemForm = res.data.data.body;
            this.endMouth = res.data.data.body.endmonth;
            this.endDay = res.data.data.body.endday;
            this.technologyList = this.systemForm.technical?JSON.parse(this.systemForm.technical):[];
            this.imageUrl = this.systemForm.technicalpicture;
          }
          res = await listCycleNode({
            pid: this.$route.params.id,
            page: this.page,
            size: this.size,
          });
          if(res.data.code === 200) {
            this.moduleProject = res.data.data.list;
            if(res.data.data.total>0) {
              this.moduleProject.forEach((item) => {
                let date = new Date(item.createtime);
                item.createtime = date.getUTCFullYear()+'-'+(date.getUTCMonth()+1)+'-'+date.getUTCDate()
                  +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
                let modules = JSON.parse(item.dirandprog);
                item.modules = modules;
              })
            }
          }
          res = await queryModuleListByPid({
            pid: this.$route.params.id,
          });
          if(res.data.code === 200) {
            if(res.data.data.total>0) {
              this.moduleList = res.data.data.list;
            }
          }
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
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }

  .modifyBtn{
    margin-left: 15px;
    padding: 7px 13px;
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
    overflow-y: scroll;
    height: 60vh;
  }
  .tabsH::-webkit-scrollbar {
    display: none;
  }

  /deep/ .crtUser {
    margin-bottom: 10px;
  }

  .set {
    position: absolute;
    bottom: 40px;
    left: 200px;
    right: 200px;
    top: 80px;
    overflow: hidden;
    min-height: 500px;
    margin: 20px auto;
    background-color: #FFFFFF;
    border-radius: 8px;
    border: 1px solid rgb(187, 187, 187);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px 0px;


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

  .el-icon-zoom-in.pic-zoom-in {

  }

  .el-icon-zoom-in.pic-zoom-in:hover {
    color: rgb(24,144,255);
  }

  .technology {
    padding: 20px;
    .top {
      display: flex;
      span {
        flex: 3;
        font-size: 20px;
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
        padding: 10px 0 0 0;
        .tech_name,.tech_version {
          font-size: 18px;
        }
      }
      .tech_item {
        padding: 20px 0 0 0;
        .data {
          .tech,.link,.version,.remove {
            color: rgb(24,144,255);
          }
          .tech,.version {
            font-size: 16px;
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

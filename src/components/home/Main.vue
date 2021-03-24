<template>
  <div class="main">
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--全部项目-->
        <el-tab-pane label="全部项目" name="all">
          <el-table
            :data="allProject"
            :show-header="false"
            style="width: 100%;font-size: 13px">
            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              width="445">
              <template slot-scope="props">
                <div style="font-size: 16px;color: rgba(96, 144, 255, 1);cursor: pointer">{{ props.row.name}}</div>
                <div class="props_value">{{ props.row.introduction}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              :show-overflow-tooltip="true"
              align="center"
              width="130">
              <template slot-scope="props">
                <div>创建日期</div>
                <div class="props_value">{{ props.row.createTime}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="createUser"
              align="center"
              show-overflow-tooltip
              width="130">
              <template slot-scope="props">
                <div>创建人</div>
                <div class="props_value">{{ props.row.createUser}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="progress"
              align="center"
              :show-overflow-tooltip="true"
              width="250">
              <template slot-scope="props">
                <div>进度</div>
                <div class="props_value">
                  <el-progress :percentage="props.row.progress"></el-progress>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              :show-overflow-tooltip="true"
              width="150">
              <template slot-scope="scope">
                <div style="height: 70px;display: flex;align-items: center">
                  <el-tooltip class="item" effect="dark" content="邀请用户" placement="top">
                    <div @click="addProjectMember(scope.row.id,1)">
                      <el-icon class="iconfont icon-tianjiayonghu"></el-icon>
                    </div>
                  </el-tooltip>
                  <el-icon class="el-icon-minus icon_y"></el-icon>
                  <el-tooltip class="item" effect="dark" content="项目设置" placement="top">
                    <div @click="addProjectMember(scope.row.id,2)">
                      <el-icon class="iconfont icon-xitongshezhi"></el-icon>
                    </div>
                  </el-tooltip>
                  <el-icon class="el-icon-minus icon_y"></el-icon>
                  <el-tooltip class="item" effect="dark" content="项目周期" placement="top">
                    <el-icon class="iconfont icon-wenjian"></el-icon>
                  </el-tooltip>
                  <el-icon class="el-icon-minus icon_y"></el-icon>
                  <el-tooltip class="item" effect="dark" content="移入回收站" placement="top">
                    <el-icon class="iconfont icon-huishouzhan"></el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!--分页，每页最多8条数据-->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalCount">
          </el-pagination>
        </el-tab-pane>

        <!--已加入-->
        <el-tab-pane label="已加入" name="in">
          <el-table
            :data="inProject"
            :show-header="false"
            style="width: 100%;font-size: 13px">
            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              width="445">
              <template slot-scope="props">
                <div style="font-size: 16px;color: rgba(96, 144, 255, 1);cursor: pointer">{{ props.row.name}}</div>
                <div class="props_value">{{ props.row.introduction}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              :show-overflow-tooltip="true"
              align="center"
              width="130">
              <template slot-scope="props">
                <div>创建日期</div>
                <div class="props_value">{{ props.row.createTime}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="createUser"
              align="center"
              show-overflow-tooltip
              width="130">
              <template slot-scope="props">
                <div>创建人</div>
                <div class="props_value">{{ props.row.createUser}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="progress"
              align="center"
              :show-overflow-tooltip="true"
              width="250">
              <template slot-scope="props">
                <div>进度</div>
                <div class="props_value">
                  <el-progress :percentage="props.row.progress"></el-progress>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              :show-overflow-tooltip="true"
              width="150">
              <div style="height: 70px;display: flex;align-items: center">
                <el-tooltip class="item" effect="dark" content="邀请用户" placement="top">
                  <el-icon class="iconfont icon-tianjiayonghu"></el-icon>
                </el-tooltip>
                <el-icon class="el-icon-minus icon_y"></el-icon>
                <el-tooltip class="item" effect="dark" content="项目设置" placement="top">
                  <el-icon class="iconfont icon-xitongshezhi"></el-icon>
                </el-tooltip>
                <el-icon class="el-icon-minus icon_y"></el-icon>
                <el-tooltip class="item" effect="dark" content="项目周期" placement="top">
                  <el-icon class="iconfont icon-wenjian"></el-icon>
                </el-tooltip>
                <el-icon class="el-icon-minus icon_y"></el-icon>
                <el-tooltip class="item" effect="dark" content="移入回收站" placement="top">
                  <el-icon class="iconfont icon-huishouzhan"></el-icon>
                </el-tooltip>
              </div>
            </el-table-column>
          </el-table>
          <!--分页，每页最多8条数据-->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalCountIn">
          </el-pagination>
        </el-tab-pane>

        <!--已创建-->
        <el-tab-pane label="已创建" name="create">已创建</el-tab-pane>

        <!--回收站-->
        <el-tab-pane label="回收站" name="recycle">回收站</el-tab-pane>

        <!--添加新项目-->
        <el-button class="new_project" size="small" type="primary" icon="el-icon-plus"
                   @click="dialogFormVisible = true">创建新项目
        </el-button>
        <!--添加新项目-->
        <el-dialog title="项目创建" :visible.sync="dialogFormVisible" width="500px" class="projectCss">
          <div slot="title" class="header-title">
            <span><i class="el-icon-warning-outline"></i></span>
            <span class="title-age">项目创建</span>
          </div>
          <el-form :model="projectForm" :rules="rules" ref="projectForm">
            <el-form-item prop="name">
              <el-input v-model="projectForm.name" placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item prop="introduction">
              <el-input type="textarea" :row="2" v-model="projectForm.introduction" placeholder="项目简介"></el-input>
            </el-form-item>
            <el-form-item prop="basePath">
              <el-input v-model="projectForm.basePath" placeholder="项目基本路径"></el-input>
            </el-form-item>
            <div style="text-align: left;font-weight: bold;margin-bottom: 5px">预计完成时间</div>
            <el-form-item>
              <div style="padding-right: 25px">
                <span style="padding-right: 5px">月</span>
                <el-input-number size="mini" controls-position="right" :min="1" :max="24"
                                 v-model="projectForm.endMonth"></el-input-number>
              </div>
              <div>
                <span style="padding-right: 5px">日</span>
                <el-input-number size="mini" controls-position="right" :min="1" :max="31"
                                 v-model="projectForm.endDay"></el-input-number>
              </div>
            </el-form-item>
            <div style="text-align: left;font-weight: bold;margin-bottom: 10px">项目分类</div>
            <div style="display: flex;flex-flow: wrap">
              <el-tag
                :key="tag"
                v-for="tag in projectForm.addDirs"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">新增分类</el-button>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addProject">确 定</el-button>
          </div>
        </el-dialog>

        <!--邀请新成员-->
        <el-dialog title="邀请新成员" :visible.sync="inviteMember" width="400px" class="memberCss">
          <div slot="title" class="header-title">
            <span><i class="el-icon-warning-outline"></i></span>
            <span class="title-age">邀请新成员</span>
          </div>
          <!--邀请链接-->
          <el-dialog
            width="30%"
            title="邀请成员"
            :visible.sync="isInvitationLink"
            class="invateMember"
            append-to-body>
            <div slot="title" class="header-title">
              <span><i class="el-icon-warning-outline"></i></span>
              <span class="title-age">邀请成员</span>
            </div>
            <div style="padding-bottom: 15px;text-indent: 5px">链接有效日期：{{linkEndTime}}</div>
            <el-input v-model="invitationLink" disabled="">
              <template slot="append">
                <el-button class="tag-read" :data-clipboard-text="linkEndTime" @click="copy">复制链接</el-button>
              </template>
            </el-input>
          </el-dialog>
          <!--邀请-->
          <div style="display: flex;justify-content: space-between;margin-bottom: 10px">
            <div>账号邀请</div>
            <el-link :underline="false" type="primary" @click="InviteMembers">通过链接邀请</el-link>
          </div>
          <el-input placeholder="输入昵称或邮箱查找" v-model="selectMember" prefix-icon="el-icon-search"></el-input>
          <el-table
            :data="memberList"
            :show-header="false"
            style="width: 100%;font-size: 13px">
            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              width="30">
              <template slot-scope="props">
                <el-image style="width: 20px; height: 20px" :src="props.row.head" fit="cover"></el-image>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              width="220">
              <template slot-scope="props">
                <div style="font-size: 16px;cursor: pointer">{{ props.row.name}}</div>
                <div class="props_value">{{ props.row.email}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              align="center"
              width="110">
              <template slot-scope="props">
                <div v-if="props.row.isJoin == 1">
                  <el-button icon="iconfont icon-tianjiayonghu" size="mini"
                             style="font-size: 14px;border-style: dashed" @click="InviteMember(props.row)">邀请
                  </el-button>
                </div>
                <div v-else>
                  <el-button icon="iconfont icon-denglu1" size="mini" type="text" disabled>已加入</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>

        <!--项目设置-->
        <el-dialog title="" :visible.sync="isShowSystem" width="600px" class="systemCss">
          <div slot="title" class="header-title">
            <span class="title-age">项目设置</span>
          </div>
          <el-tabs tab-position="left" style="height: 500px;">
            <el-tab-pane>
              <span slot="label"><i class="el-icon-warning-outline"></i> 基本信息</span>
              <div>
                <el-form :rules="systemFormRules" :model="systemForm" ref="systemForm">
                  <el-form-item prop="name" label="项目名称" label-width="125px">
                    <el-input v-model="systemForm.name" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="basePath" label="接口基本路径" label-width="125px">
                    <el-input v-model="systemForm.basePath" size="small"></el-input>
                  </el-form-item>
                  <el-form-item prop="introduction" label="项目简介" label-width="125px">
                    <el-input type="textarea" :row="0" v-model="systemForm.introduction" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="创建人" label-width="125px" class="crtUser">
                    {{systemForm.createUser}}
                  </el-form-item>
                  <el-form-item label="创建时间" label-width="125px" class="crtUser">
                    {{systemForm.createTime}}
                  </el-form-item>
                  <el-form-item label-width="125px" class="save">
                    <div style="margin: 10px 15px 0 0;">
                      <el-button size="small" type="primary">保存</el-button>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>

            <el-tab-pane label="项目周期">
              <span slot="label"><i class="iconfont icon-shijian"></i> 项目周期</span>
              <div>

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
                  </el-form-item>
                  <el-form-item label="开发人员">
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
                    <el-button type="text" class="el-icon-circle-plus-outline" size="small" @click="" >新增分类</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>

            <el-tab-pane label="所用技术">
              <span slot="label"><i class="iconfont icon-tubiaozhizuomoban"></i> 所用技术</span>
            </el-tab-pane>
            <el-tab-pane label="更多">
              <span slot="label"><i class="iconfont icon-gengduo"></i> 更多</span>
            </el-tab-pane>
          </el-tabs>
        </el-dialog>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    import {notice} from '@/utils/elementUtils'
    import Clipboard from 'clipboard'

    export default {
        name: "aside",
        data() {
            return {
                activeName: "all",
                dialogFormVisible: false,
                //项目设置窗口
                isShowSystem: true,
                //创建项目
                inputVisible: false,
                //邀请成员
                inviteMember: false,
                //链接邀请窗口
                isInvitationLink: false,
                //邀请链接
                invitationLink: 'http://www.baidu.com',
                //链接有效时间
                linkEndTime: '2021年3月23日 18:11',
                //选择的项目
                projectID: -1,
                //是否有重复数据
                isRepeatedData: false,
                selectMember: '',
                inputValue: '',
                //功能模块
                moduleList: [
                    {value: 1, label: '用户管理'},
                    {value: 2, label: '日志管理'},
                    {value: 3, label: '接口管理'},
                ],
                searchModule: '',
                //功能模块的开发人员
                moduleUser: [
                    {id: 1, name: '张三', head: '/static/img/head.b818068.png', joinTime: '2021-3-24'},
                ],
                //成员列表 (isJoin:1未加入，2已加入)
                memberList: [
                    {id: 1, name: '张三', head: '/static/img/head.b818068.png', email: '528243772@qq.com', isJoin: 1},
                    {id: 2, name: '李思', head: '/static/img/head.b818068.png', email: '321302997@qq.com', isJoin: 2},
                    {id: 2, name: '李思', head: '/static/img/head.b818068.png', email: '321302997@qq.com', isJoin: 2},
                    {id: 2, name: '李思', head: '/static/img/head.b818068.png', email: '321302997@qq.com', isJoin: 2},
                    {id: 2, name: '李思', head: '/static/img/head.b818068.png', email: '321302997@qq.com', isJoin: 2},
                ],
                //项目设置 基本信息form
                systemForm: {
                    name: 'zx',
                    introduction: '第一个项目',
                    basePath: 'http://www.baidu.com',
                    createUser: 'ls',
                    createTime: '2021-3-20'
                },
                //创建项目 from
                projectForm: {
                    name: '',
                    introduction: '',
                    basePath: '',
                    endMonth: '',
                    endDay: '',
                    addDirs: []

                },
                allProject: [
                    {
                        id: 1,
                        name: "软件测试项目1",
                        introduction: "那时候我只会想自己想要什么",
                        createTime: "2020-11-12",
                        createUser: "张三张三张三张三",
                        progress: 20
                    },
                    {
                        id: 2,
                        name: "软件测试项目2",
                        introduction: "那时候我只会想自己想要什么",
                        createTime: "2020-11-12",
                        createUser: "张三张三张三张三",
                        progress: 20
                    },
                    {
                        id: 3,
                        name: "软件测试项目3",
                        introduction: "那时候我只会想自己想要什么",
                        createTime: "2020-11-12",
                        createUser: "张三张三张三张三",
                        progress: 20
                    },
                    {
                        id: 1,
                        name: "软件测试项目4",
                        introduction: "那时候我只会想自己想要什么",
                        createTime: "2020-11-12",
                        createUser: "张三张三张三张三",
                        progress: 20
                    },
                    {
                        id: 1,
                        name: "软件测试项目5",
                        introduction: "那时候我只会想自己想要什么",
                        createTime: "2020-11-12",
                        createUser: "张三张三张三张三",
                        progress: 20
                    },
                    {
                        id: 1,
                        name: "软件测试项目6",
                        introduction: "那时候我只会想自己想要什么",
                        createTime: "2020-11-12",
                        createUser: "张三张三张三张三",
                        progress: 20
                    },
                    {
                        id: 1,
                        name: "软件测试项目7",
                        introduction: "那时候我只会想自己想要什么",
                        createTime: "2020-11-12",
                        createUser: "张三张三张三张三",
                        progress: 20
                    },
                ],
                inProject: [
                    {
                        id: 1,
                        name: "软件测试项目1",
                        introduction: "那时候我只会想自己想要什么",
                        createTime: "2020-11-12",
                        createUser: "张三张三张三张三",
                        progress: 20
                    },
                    {
                        id: 1,
                        name: "软件测试项目2",
                        introduction: "那时候我只会想自己想要什么",
                        createTime: "2020-11-12",
                        createUser: "张三张三张三张三",
                        progress: 20
                    },

                ],
                createProject: [
                    {
                        id: 1,
                        name: "软件测试项目1",
                        introduction: "那时候我只会想自己想要什么",
                        createTime: "2020-11-12",
                        createUser: "张三张三张三张三",
                        progress: 20
                    },
                ],
                recycleProject: [
                    {
                        id: 1,
                        name: "软件测试项目1",
                        introduction: "那时候我只会想自己想要什么",
                        createTime: "2020-11-12",
                        createUser: "张三张三张三张三",
                        progress: 20
                    },
                ],

                //当前页码
                currentPage: 1,
                //总条数（全部项目）
                totalCount: 20,
                //已加入
                totalCountIn: 10,
                //已创建
                totalCountCreate: 10,
                //每页展示条数
                pageSize: 7,
                systemFormRules: {
                    name: {required: true, message: "请输入项目名称", trigger: 'blur'},
                    introduction: {required: true, message: "请输入项目简介", trigger: 'blur'},
                    basePath: {required: true, message: "请输入项目基本路径", trigger: 'blur'},
                },
                rules: {
                    name: {required: true, message: "请输入项目名称", trigger: 'blur'},
                    introduction: {required: true, message: "请输入项目简介", trigger: 'blur'},
                    basePath: {required: true, message: "请输入项目基本路径", trigger: 'blur'},
                }
            }
        },
        methods: {
            //删除成员
            handleRemoveUser(e){
                this.$confirm(`确定是否要移除${e.name}吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.moduleUser.splice(this.moduleUser.indexOf(e), 1);
                }).then(() => {})
            },
            //复制链接
            copy() {
                let clipboard = new Clipboard('.tag-read')
                clipboard.on('success', e => {
                    notice(this, `复制成功！`, 'success')
                })
                clipboard.on('error', e => {
                    notice(this, `复制失败！`, 'error')
                })
            },
            //生成邀请链接
            InviteMembers() {
                //调用生成邀请链接的接口，（出参：结束时间、链接）
                this.isInvitationLink = true
            },
            //邀请单个成员
            InviteMember(e) {
                console.log(e.id)
                console.log(this.projectID)
            },
            //添加项目成员
            addProjectMember(e, index) {
                this.projectID = e;
                if (index == 1) this.inviteMember = true
                else if (index == 2) this.isShowSystem = true
                else if (index == 3) ;
            },
            handleClick(tab) {
                //获取项目列表

                if (tab.index == 0) {
                    //全部 allProject

                } else if (tab.index == 1) {
                    //已加入 inProject

                } else if (tab.index == 2) {
                    //已创建  createProject

                } else if (tab.index == 3) {
                    //已删除  recycleProject

                }
            },
            //处理
            handleClose(tag) {
                this.projectForm.addDirs.splice(this.projectForm.addDirs.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            //添加分类处理
            handleInputConfirm() {
                this.isRepeatedData = false;
                let inputValue = this.inputValue;
                //去除空格
                inputValue = inputValue.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                if (inputValue == '') {
                    this.inputVisible = false;
                    return;
                }
                //判断新增的值是否重复
                if (this.projectForm.addDirs.indexOf(inputValue) != -1) {
                    this.isRepeatedData = true;
                    notice(this, `模块'${inputValue}'已存在`, 'warning')
                    return;
                } else {
                    this.isRepeatedData = false;
                }
                if (inputValue) {
                    this.projectForm.addDirs.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            //新增项目
            addProject() {
                this.$refs['projectForm'].validate(err => {
                    if (!err) return
                    console.log(222)
                    //提交表单projectForm
                    this.dialogFormVisible = false

                })
                //
            }
        }
    }
</script>

<style lang="less" scoped>
  /deep/ .el-input-group__append {
    background-color: #1890FF;
    color: white;
    cursor: pointer;
  }

  /deep/ .el-button--mini span {
    padding-left: 5px;
  }

  /deep/ .crtUser {
    margin-bottom: 5px;
  }

  .memberCss /deep/ .el-table td {
    padding: 8px 0;

    /deep/ .el-bt.el-tooltip {
      text-align: center;
    }
  }

  .systemCss /deep/ .el-dialog__body {
    padding-top: 0;

    .el-tag .el-tag__close{
      color: rgb(16, 16, 16);

      &:hover{
        color: white;
      }
    }

    .el-tag {
      width: 100px;
      height: 60px;
      display: flex;
      align-items: center;
      background-color: white;
      color: rgb(16, 16, 16);
      border: none;
    }

    .el-form-item__content{
      padding-left: 15px;
    }

    .fc {
      .el-form-item__label {
        padding-bottom: 0;

      }

      .el-form-item {
        margin-bottom: 50px;
      }
    }


    .el-tabs__nav {
      transform: translateY(10px) !important;

      .el-tabs__item {
        padding: 10px 20px;
        line-height: 20px;
        text-align: left;
      }
    }

    .el-form {
      margin-top: 25px;

      .save /deep/ .el-form-item__content {
        border-top: 1px solid #E4E7ED;
        flex-direction: row-reverse;
      }

      .el-form-item {
        height: 40px;

        .el-form-item__label {
          padding-left: 15px;
          text-align: left;
        }
      }
    }

    .is-active /deep/ .el-icon-warning-outline:before {
      color: rgb(24, 144, 255);
    }

    .el-icon-warning-outline:before {
      color: rgb(16, 16, 16);
    }
  }


  /deep/ .el-form-item {
    height: auto;
  }

  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .el-tag {
    margin: 0 10px 5px 0;
  }

  /deep/ .el-form-item__content {
    display: flex;
    align-items: center;
    justify-content: left;
  }

  /deep/ .el-input-number--mini {
    width: 90px;
  }

  .projectCss /deep/ .el-dialog__body {
    padding: 30px 100px;
  }

  .memberCss /deep/ .el-dialog__body, .invateMember /deep/ .el-dialog__body {
    padding-top: 15px;
  }

  /deep/ .el-dialog__header {
    border-bottom: 1px solid #BBBBBB;
  }

  .header-title {
    text-align: left;
  }

  .el-icon-warning-outline:before {
    color: #FAC200;
  }

  /deep/ .el-pagination {
    padding: 20px 5px;
    text-align: right;
  }

  /deep/ .el-table td {
    padding: 0px 0;
  }

  /deep/ .icon_y {
    transform: rotate(90deg);
    font-size: 16px;
  }

  /deep/ .iconfont {
    font-size: 16px;
    cursor: pointer;
  }

  /deep/ .props_value {
    font-size: 13px;
    color: rgba(143, 143, 143, 1);
    //内容过多无省略号
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /deep/ .el-tabs {
    position: relative;

    .el-tabs__content {
      overflow: visible;
    }
  }


  .new_project {
    position: absolute;
    right: 20px;
    top: -40px;
  }

  .main {
    margin: 20px;
    background: white;
    min-height: 620px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px 0px;

    .tabs {
      padding: 20px 40px 0;
    }

    /deep/ .is-top {
      margin: 0;
    }
  }
</style>

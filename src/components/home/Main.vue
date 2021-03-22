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
              <div style="height: 70px;display: flex;align-items: center">
                <el-tooltip class="item" effect="dark" content="邀请用户" placement="top">
                  <el-icon class="iconfont icon-tianjiayonghu"></el-icon>
                </el-tooltip>
                <el-icon class="el-icon-minus icon_y"></el-icon>
                <el-tooltip class="item" effect="dark" content="项目设置" placement="top">
                  <el-icon class="iconfont icon-xitongshezhi"></el-icon>
                </el-tooltip>
                <el-icon class="el-icon-minus icon_y"></el-icon>
                <el-tooltip class="item" effect="dark" content="邀请用户" placement="top">
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
                <el-tooltip class="item" effect="dark" content="邀请用户" placement="top">
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
        <el-dialog title="项目创建" :visible.sync="dialogFormVisible" width="500px">
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
      </el-tabs>
    </div>
  </div>
</template>

<script>
    import {notice} from '@/utils/elementUtils'

    export default {
        name: "aside",
        data() {
            return {
                activeName: "all",
                dialogFormVisible: false,
                inputVisible: false,
                //是否有重复数据
                isRepeatedData: false,
                inputValue: '',
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
                        id: 1,
                        name: "软件测试项目2",
                        introduction: "那时候我只会想自己想要什么",
                        createTime: "2020-11-12",
                        createUser: "张三张三张三张三",
                        progress: 20
                    },
                    {
                        id: 1,
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
                totalCountIn:10,
                //已创建
                totalCountCreate:10,
                //每页展示条数
                pageSize: 7,
                rules: {
                    name: {required: true, message: "请输入项目名称", trigger: 'blur'},
                    introduction: {required: true, message: "请输入项目简介", trigger: 'blur'},
                    basePath: {required: true, message: "请输入项目基本路径", trigger: 'blur'},
                }
            }
        },
        methods: {
            handleClick(tab) {
                //获取项目列表

                if(tab.index == 0){
                //全部 allProject

                }else if(tab.index == 1){
                //已加入 inProject

                }else if(tab.index == 2){
                //已创建  createProject

                }else if(tab.index == 3){
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

  /deep/ .el-dialog__body {
    padding: 30px 100px;
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

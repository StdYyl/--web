<template>
  <div class="main">
    <div class="tabs" id="project">
      <el-tabs v-model="activeName" @tab-click="handleClick" >
        <!--全部项目-->
        <el-tab-pane label="全部项目" name="all" v-loading="loading[0]">
          <el-table
            :data="allProject"
            :show-header="false"
            style="width: 100%;font-size: 13px">
            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              width="445">
              <template slot-scope="props">
                <div style="font-size: 16px;color: rgba(96, 144, 255, 1);cursor: pointer"
                     @click="$router.push(`/home/intfIndex/${props.row.id}/intf/all`)">{{ props.row.name}}
                </div>
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
                <div class="props_value" @click="progressManagement(props.row.id, 0)">
                  <el-progress :percentage="parseFloat(props.row.progress)"></el-progress>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              :show-overflow-tooltip="true">
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
                  <el-tooltip class="item" effect="dark" content="接口导出" placement="top">
                    <div @click="interfaceExport">
                      <el-icon class="iconfont icon-wenjian"></el-icon>
                    </div>
                  </el-tooltip>
                  <el-icon class="el-icon-minus icon_y"></el-icon>
                  <el-tooltip class="item" effect="dark" content="移入回收站" placement="top">
                    <div @click="removeToCycle(scope.row.id)">
                      <el-icon class="iconfont icon-huishouzhan"></el-icon>
                    </div>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!--分页，每页最多8条数据-->
          <el-pagination
            v-if="totalCount>0"
            background
            @current-change="changeIndex"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalCount">
          </el-pagination>
        </el-tab-pane>

        <el-dialog
          :visible.sync="exportDialogVisible"
          width="30%">
          <div slot="title" align="left" style="display: flex;align-items: center;">
            <i class="el-icon-warning-outline" style="color: rgb(250,194,0);margin-right: 5px"></i>
            <span style="font-weight: bold;font-size: 14px">接口导出</span>
          </div>
          <span slot="">
            <el-form ref="form" :model="interface" label-width="80px">
              <el-form-item style="margin-bottom: 5px;">
                <el-select v-model="interface.format" placeholder="请选择导出格式">
                  <el-option label="html文档" value="html"></el-option>
                  <el-option label="word文档" value="word"></el-option>
                  <el-option label="pdf文档" value="pdf"></el-option>
                  <el-option label="markdown语法文档" value="markdown"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-bottom: 5px;display: flex;align-items: center">
                <i class="iconfont icon-download" style="font-size: 24px;margin-right: 5px;cursor: auto"></i>
                <span>导出项目文档为{{interface.format}}文档</span>
              </el-form-item>
              <el-form-item style="margin-left: 30px;display: flex;align-items: center">
                <el-button type="primary" @click="assureExport"
                           style="padding: 10px 40px;">导 出</el-button>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" style="display: flex;justify-content: center">
          </span>
        </el-dialog>

        <!--已加入-->
        <el-tab-pane label="已加入" name="in" v-loading="loading[1]">
          <el-table
            :data="inProject"
            :show-header="false"
            style="width: 100%;font-size: 13px">
            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              width="445">
              <template slot-scope="props">
                <div style="font-size: 16px;color: rgba(96, 144, 255, 1);cursor: pointer"
                     @click="$router.push(`/home/intfIndex/${props.row.id}`)">{{ props.row.name}}</div>
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
                  <el-progress :percentage="parseFloat(props.row.progress)"></el-progress>
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
                    <el-icon class="iconfont icon-tianjiayonghu"></el-icon>
                  </el-tooltip>
                  <el-icon class="el-icon-minus icon_y"></el-icon>
                  <el-tooltip class="item" effect="dark" content="项目设置" placement="top">
                    <el-icon class="iconfont icon-xitongshezhi"></el-icon>
                  </el-tooltip>
                  <el-icon class="el-icon-minus icon_y"></el-icon>
                  <el-tooltip class="item" effect="dark" content="接口导出" placement="top">
                    <div @click="interfaceExport">
                      <el-icon class="iconfont icon-wenjian"></el-icon>
                    </div>
                  </el-tooltip>
                  <el-icon class="el-icon-minus icon_y"></el-icon>
                  <el-tooltip class="item" effect="dark" content="移入回收站" placement="top">
                    <div @click="removeToCycle(scope.row.id)">
                      <el-icon class="iconfont icon-huishouzhan"></el-icon>
                    </div>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!--分页，每页最多8条数据-->
          <el-pagination
            background
            v-if="totalCount>0"
            @current-change="changeIndex"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalCount">
          </el-pagination>
        </el-tab-pane>

        <!--已创建-->
        <el-tab-pane label="已创建" name="create" v-loading="loading[2]">
          <el-table
            :data="createProject"
            :show-header="false"
            style="width: 100%;font-size: 13px">
            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              width="445">
              <template slot-scope="props">
                <div style="font-size: 16px;color: rgba(96, 144, 255, 1);cursor: pointer"
                     @click="$router.push(`/home/intfIndex/${props.row.id}`)">{{ props.row.name}}</div>
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
                  <el-progress :percentage="parseFloat(props.row.progress)"></el-progress>
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
                    <el-icon class="iconfont icon-tianjiayonghu"></el-icon>
                  </el-tooltip>
                  <el-icon class="el-icon-minus icon_y"></el-icon>
                  <el-tooltip class="item" effect="dark" content="项目设置" placement="top">
                    <el-icon class="iconfont icon-xitongshezhi"></el-icon>
                  </el-tooltip>
                  <el-icon class="el-icon-minus icon_y"></el-icon>
                  <el-tooltip class="item" effect="dark" content="接口导出" placement="top">
                    <div @click="interfaceExport">
                      <el-icon class="iconfont icon-wenjian"></el-icon>
                    </div>
                  </el-tooltip>
                  <el-icon class="el-icon-minus icon_y"></el-icon>
                  <el-tooltip class="item" effect="dark" content="移入回收站" placement="top">
                    <div @click="removeToCycle(scope.row.id)">
                      <el-icon class="iconfont icon-huishouzhan"></el-icon>
                    </div>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!--分页，每页最多8条数据-->
          <el-pagination
            background
            v-if="totalCount>0"
            @current-change="changeIndex"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalCount">
          </el-pagination>
        </el-tab-pane>

        <!--回收站-->
        <el-tab-pane label="回收站" name="recycle" v-loading="loading[3]">
          <el-table
            :data="recycleProject"
            :show-header="false"
            style="width: 100%;font-size: 13px">
            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              width="445">
              <template slot-scope="props">
                <div style="font-size: 16px;color: rgba(96, 144, 255, 1);cursor: pointer"
                     @click="$router.push(`/home/intfIndex/${props.row.id}`)">{{ props.row.name}}</div>
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
                  <el-progress :percentage="parseFloat(props.row.progress)"></el-progress>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              :show-overflow-tooltip="true"
              width="150">
              <template slot-scope="scope">
                <div style="height: 70px;display: flex;align-items: center;justify-content: center;">
                  <el-tooltip class="item" effect="dark" content="恢复项目" placement="top">
                    <div @click="recoveryProject(scope.row.id)">
                      <el-icon class="iconfont icon-yihuifu-xiugai" style="font-size: 20px"></el-icon>
                    </div>
                  </el-tooltip>
                  <el-icon class="el-icon-minus icon_y"></el-icon>
                  <el-tooltip class="item" effect="dark" content="彻底删除项目" placement="top">
                    <div @click="removeProject(scope.row.id)">
                      <el-icon class="iconfont icon-weihuifu-xiugai" style="font-size: 20px"></el-icon>
                    </div>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!--分页，每页最多8条数据-->
          <el-pagination
            background
            v-if="totalCount>0"
            @current-change="changeIndex"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalCount">
          </el-pagination>
        </el-tab-pane>

        <!--添加新项目-->
        <el-button class="new_project" size="small" type="primary" icon="el-icon-plus"
                   @click="dialogFormVisible = true" v-if="this.$route.params.id != 'all'">创建新项目
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
                <el-button class="tag-read" :data-clipboard-text="invitationLink" @click="copy">复制链接</el-button>
              </template>
            </el-input>
          </el-dialog>

          <!--邀请-->
          <div style="display: flex;justify-content: space-between;margin-bottom: 10px">
            <div>账号邀请</div>
            <el-link :underline="false" type="primary" @click="InviteMembers">通过链接邀请</el-link>
          </div>
          <el-input placeholder="输入昵称或邮箱查找" v-model="selectMember" prefix-icon="el-icon-search" @change="searchMember(projectID)"></el-input>
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
                <div v-if="!props.row.isJoin">
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
          <!--          <el-tabs tab-position="left" style="height: 500px;">-->
          <!--            <el-tab-pane>-->
          <!--              <span slot="label"><i class="el-icon-warning-outline"></i> 基本信息</span>-->
          <!--              <div>-->
          <!--                <el-form :rules="systemFormRules" :model="systemForm" ref="systemForm">-->
          <!--                  <el-form-item prop="name" label="项目名称" label-width="125px">-->
          <!--                    <el-input v-model="systemForm.name" size="small"></el-input>-->
          <!--                  </el-form-item>-->
          <!--                  <el-form-item prop="basePath" label="接口基本路径" label-width="125px">-->
          <!--                    <el-input v-model="systemForm.basePath" size="small"></el-input>-->
          <!--                  </el-form-item>-->
          <!--                  <el-form-item prop="introduction" label="项目简介" label-width="125px">-->
          <!--                    <el-input type="textarea" :row="0" v-model="systemForm.introduction" size="small"></el-input>-->
          <!--                  </el-form-item>-->
          <!--                  <el-form-item label="创建人" label-width="125px" class="crtUser">-->
          <!--                    {{systemForm.createUser}}-->
          <!--                  </el-form-item>-->
          <!--                  <el-form-item label="创建时间" label-width="125px" class="crtUser">-->
          <!--                    {{systemForm.createTime}}-->
          <!--                  </el-form-item>-->
          <!--                  <el-form-item label-width="125px" class="save">-->
          <!--                    <div style="margin: 10px 15px 0 0;">-->
          <!--                      <el-button size="small" type="primary">保存</el-button>-->
          <!--                    </div>-->
          <!--                  </el-form-item>-->
          <!--                </el-form>-->
          <!--              </div>-->
          <!--            </el-tab-pane>-->

          <!--            <el-tab-pane label="项目周期">-->
          <!--              <span slot="label"><i class="iconfont icon-shijian"></i> 项目周期</span>-->
          <!--              <div>-->

          <!--              </div>-->
          <!--            </el-tab-pane>-->

          <!--            <el-tab-pane label="功能模块" class="fc">-->
          <!--              <span slot="label"><i class="iconfont icon-gongneng"></i> 功能模块</span>-->
          <!--              <div style="text-align: left;margin-top: 15px">-->
          <!--                <el-form label-position="top">-->
          <!--                  <el-form-item label="分类名称">-->
          <!--                    <el-select v-model="searchModule" filterable placeholder="请选择" size="small">-->
          <!--                      <el-option-->
          <!--                        v-for="item in moduleList"-->
          <!--                        :key="item.value"-->
          <!--                        :label="item.label"-->
          <!--                        :value="item.value">-->
          <!--                      </el-option>-->
          <!--                    </el-select>-->
          <!--                  </el-form-item>-->
          <!--                  <el-form-item label="开发人员">-->
          <!--                    <el-tag-->
          <!--                      :key="tag.id"-->
          <!--                      v-for="tag in moduleUser"-->
          <!--                      closable-->
          <!--                      :disable-transitions="false"-->
          <!--                      @close="handleRemoveUser(tag)">-->
          <!--                      <div>-->
          <!--                        <div style="display: flex;align-items: center;height: 20px">-->
          <!--                          <el-image style="width: 20px; height: 20px;" :src="tag.head" fit="cover"></el-image>-->
          <!--                          <span style="margin-left: 10px">{{tag.name}}</span>-->
          <!--                        </div>-->
          <!--                        <span>{{tag.joinTime}}</span>-->
          <!--                      </div>-->
          <!--                    </el-tag>-->
          <!--                    <el-button type="text" class="el-icon-circle-plus-outline" size="small"-->
          <!--                    style="font-size: 14px" @click="isInvitationUser = true">人员</el-button>-->
          <!--                  </el-form-item>-->
          <!--                </el-form>-->
          <!--              </div>-->
          <!--            </el-tab-pane>-->
          <!--            &lt;!&ndash;邀请链接&ndash;&gt;-->
          <!--            <el-dialog-->
          <!--              width="30%"-->
          <!--              title="邀请成员"-->
          <!--              :visible.sync="isInvitationUser"-->
          <!--              class="invateMember"-->
          <!--              append-to-body>-->
          <!--              <div slot="title" class="header-title">-->
          <!--                <span><i class="el-icon-warning-outline"></i></span>-->
          <!--                <span class="title-age">邀请成员</span>-->
          <!--              </div>-->
          <!--              <el-input v-model="InvitationUserEmail" placeholder="邀请项目中人员邮箱">-->
          <!--                <template slot="append">-->
          <!--                  <el-button class="tag-read"   @click="copy">邀请</el-button>-->
          <!--                </template>-->
          <!--              </el-input>-->
          <!--            </el-dialog>-->

          <!--            <el-tab-pane label="所用技术">-->
          <!--              <span slot="label"><i class="iconfont icon-tubiaozhizuomoban"></i> 所用技术</span>-->
          <!--            </el-tab-pane>-->
          <!--            <el-tab-pane label="更多">-->
          <!--              <span slot="label"><i class="iconfont icon-gengduo"></i> 更多</span>-->
          <!--            </el-tab-pane>-->
          <!--          </el-tabs>-->
        </el-dialog>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    import {notice, confirmMessage} from '@/utils/elementUtils'
    import Clipboard from 'clipboard'
    import {addProject, getProjectListById, getProjectByPid, updateProject, inviteUserByClick, inviteUserByLink} from "../../api/project";
    import {listUser, listAllUserExcludeCreate} from "../../api/user";
    import {findUserListByPid} from "../../api/projectanduser";

    export default {
        name: "aside",
        data() {
            return {
                //数据加载
                loading:[false,false,false,false],
                activeName: "all",
                dialogFormVisible: false,
                //项目设置窗口
                isShowSystem: false,
                //创建项目
                inputVisible: false,
                //邀请成员
                inviteMember: false,
                //链接邀请窗口
                isInvitationLink: false,
                //邀请链接
                invitationLink: '',
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
                //功能模块 邀请成员窗口
                isInvitationUser: false,
                //功能模块 邀请成员邮箱
                InvitationUserEmail: '',
                //功能模块的开发人员
                moduleUser: [
                    {id: 1, name: '张三', head: '/static/img/head.b818068.png', joinTime: '2021-3-24'},
                ],
                //成员列表 (isJoin:1未加入，2已加入)
                memberList: [],
                //项目设置 基本信息form
                // systemForm: {
                //     name: 'zx',
                //     introduction: '第一个项目',
                //     basePath: 'http://www.baidu.com',
                //     createUser: 'ls',
                //     createTime: '2021-3-20'
                // },
                //创建项目 from
                projectForm: {
                    name: '',
                    introduction: '',
                    basePath: '',
                    endMonth: '',
                    endDay: '',
                    addDirs: []

                },
                allProject: [],
                inProject: [],
                createProject: [],
                recycleProject: [],

                //当前页码
                currentPage: 1,
                //总条数（全部项目）
                totalCount: 0,
                //已加入
                totalCountIn: 10,
                //已创建
                totalCountCreate: 10,
                //每页展示条数
                pageSize: 7,
                // systemFormRules: {
                //     name: {required: true, message: "请输入项目名称", trigger: 'blur'},
                //     introduction: {required: true, message: "请输入项目简介", trigger: 'blur'},
                //     basePath: {required: true, message: "请输入项目基本路径", trigger: 'blur'},
                // },
                rules: {
                    name: {required: true, message: "请输入项目名称", trigger: 'blur'},
                    introduction: {required: true, message: "请输入项目简介", trigger: 'blur'},
                    basePath: {required: true, message: "请输入项目基本路径", trigger: 'blur'},
                },
                exportDialogVisible: false,
                interface: {
                    format: 'html'
                }
            }
        },
        methods: {
            //更换页码
            async changeIndex(index){
                //所有
                if(this.activeName == 'all'){
                    let rs = await this.getProListFc(0,index)
                    console.log(rs)
                }
                if(this.activeName == 'in'){
                    let rs = this.getProListFc(1,index)
                }
                if(this.activeName == 'create'){
                    let rs = this.getProListFc(2,index)
                }
                if(this.activeName == 'recycle'){
                    let rs = this.getProListFc(3,index)
                }


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
            async InviteMembers() {
                //调用生成邀请链接的接口，（出参：结束时间、链接）
                let res = await inviteUserByLink({
                  uid: localStorage.getItem('id'),
                  pid: this.projectID,
                });
                console.log(res);
                if(res.data.code === 200) {
                  this.invitationLink = 'http://localhost:8080/#/home/member/accept?code='+res.data.data;
                  this.isInvitationLink = true;
                }
            },
            //邀请单个成员
            async InviteMember(e) {
              let res = await inviteUserByClick({
                uid: localStorage.getItem('id'),
                toid: e.id,
                pid: this.projectID,
              });
              console.log(res);
              if(res.data.code === 200) {
                notice(this, '邀请成功，提醒他注意查收', 'success');
              } else if(res.data.code === 101) {
                notice(this, res.data.data, "error");
              } else {
                notice(this, res.data.data?res.data.data:res.data.msg, "warning");
              }
            },
            //添加项目成员
            async addProjectMember(e, index) {
                this.projectID = e;
                if (index == 1) {
                  await this.searchMember(e);
                  this.inviteMember = true;
                }
                else if (index == 2) this.$router.push('/home/setting/'+e)
                else if (index == 3) ;
            },
            //搜索member
            async searchMember(pid) {
              let res = await findUserListByPid({
                pid: pid,
              });
              let projectMember = [];
              if(res.data.code === 200) {
                projectMember = res.data.data.list;
              }
              res = await listUser({
                search: this.selectMember,
              });
              if(res.data.code === 200) {
                if(res.data.data.total>0) {
                  this.memberList = res.data.data.list.filter((item) => {
                    return item.id != localStorage.getItem('id');
                  });
                  this.memberList.forEach((item) => {
                    if(projectMember.find((element) => {
                      return element.id == item.id;
                    })) {
                      item.isJoin = true;
                    } else {
                      item.isJoin = false;
                    }
                  });
                }
              }
              console.log(this.memberList);
            },
            //进度管理
            progressManagement(id, index) {
                if (index == 0) this.$router.push('/home/progress/'+id)
            },
            //查询项目列表
            async getProListFc(type,index=1){
                let app = this
                if (type == 0) {
                    //全部 allProject
                    let rs = await this.getProList(1,index);
                    if (rs.data.code == 200) {
                        app.allProject.splice(0, this.allProject.length)
                        app.totalCount = rs.data.data.count
                        if (app.totalCount > 0)
                            app.allProject.push(...rs.data.data.list)
                    }
                } else if (type == 1) {
                    //已加入 inProject
                    let rs = await this.getProList(2,index);
                    if (rs.data.code == 200) {
                        app.inProject.splice(0, this.inProject.length)
                        console.log(rs.data)
                        app.totalCount = rs.data.data.count
                        if (app.totalCount > 0)
                            app.inProject.push(...rs.data.data.list)
                    }
                } else if (type == 2) {
                    //已创建  createProject
                    let rs = await this.getProList(3,index);
                    if (rs.data.code == 200) {
                        app.createProject.splice(0, this.createProject.length)
                        app.totalCount = rs.data.data.count
                        if (app.totalCount > 0)
                            app.createProject.push(...rs.data.data.list)
                    }
                } else if (type == 3) {
                    //已删除  recycleProject
                    let rs = await this.getProList(4,index);
                    if (rs.data.code == 200) {
                        app.recycleProject.splice(0, this.recycleProject.length)
                        app.totalCount = rs.data.data.count
                        if (app.totalCount > 0)
                            app.recycleProject.push(...rs.data.data.list)
                    }
                }
            },
            async handleClick(tab) {
                this.loading[tab.index] = true
                this.loading.push()
                //获取项目列表
                let rs = await this.getProListFc(tab.index)
                app.currentPage = 1
                this.loading[tab.index] = false
                this.loading.push()
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
                let app = this
                this.$refs['projectForm'].validate(async err => {
                    if (!err) return
                    //提交表单projectForm
                    this.dialogFormVisible = false
                    let param = {
                        name: app.projectForm.name,
                        basepath: app.projectForm.basePath,
                        introduction: app.projectForm.introduction,
                        endmonth: app.projectForm.endMonth,
                        endday: app.projectForm.endDay,
                        createuserid: localStorage.getItem("id"),
                        directoryid: app.$route.params.id,
                        module: app.projectForm.addDirs
                    }
                    let rs = await addProject(param);
                    if (rs.data.code == 200) {
                        notice(this, "创建成功")
                    }
                    Object.keys(this.projectForm).forEach(key => this.projectForm[key] = key == 'addDirs' ? [] : '')
                    let rss = await this.getProList();
                    if (rss.data.code == 200) {
                        app.allProject.splice(0, this.allProject.length)
                        app.totalCount = rss.data.data.count
                        if (app.totalCount > 0)
                            app.allProject.push(...rss.data.data.list)
                    }
                })
            },
            //移入回收站
            removeToCycle(pid) {
                // confirmMessage(this, '将项目 软件测试项目一 放入回收站， 信息将不可用', '确定放入回收站?', '放入回收站', '考虑一下', 'warning').then(() => {
                //
                // }).catch(() => {
                //
                // });
                this.$confirm('将项目 软件测试项目一 放入回收站， 信息将不可用', '确定放入回收站?', {
                    type: 'warning',
                    confirmButtonText: '放入回收站',
                    cancelButtonText: '考虑一下',
                    confirmButtonClass: 'btnClass',
                }).then(async() => {
                  console.log(pid);
                  let res = await getProjectByPid({
                    pid: pid,
                  });
                  if(res.data.code === 200) {
                    let project = res.data.data.body;
                    project.isremove = 2;
                    let rs = await updateProject(project);
                    if(rs.data.code === 200) {
                      console.log(rs);
                      this.allProject.splice(project, 1);
                      this.recycleProject.push(project);
                      notice(this, '移入回收站成功', 'success');
                    }
                  }
                }).catch(() => {
                  notice(this, '已取消移入回收站', 'info');
                });
            },
            //打开导出dialog对话框
            interfaceExport() {
                this.exportDialogVisible = true;
            },
            //导出按钮事件
            assureExport() {
              if(this.interface.format==='html') {
                console.log('导出为html格式');

              } else if (this.interface.format === 'word') {

              } else if (this.interface.format === 'pdf') {

              } else {

              }
            },
            //导出文件操作
            export(data, format, filename) {
              if(data) {
                let blob = new Blob([data],{
                  type: `application/${format}`
                });
                let suffix = '';
                if(format === 'html') {
                  suffix = '.html';
                } else if (format === 'word' ) {
                  suffix = '.word';
                } else if(format === 'pdf') {
                  suffix = '.pdf';
                } else {
                  suffix = '.markdown';
                }
                let Url = URL.createObjectURL(blob);
                let link = document.createElement('a');
                // let downloadName = `个人简历.doc`;
                let downloadName = filename.concat(suffix);
                link.href = Url;
                link.setAttribute('download',downloadName);
                document.body.appendChild(link);
                link.click();
              } else {
                notice(this, '文件导出失败', 'error');
              }
            },
            //获取项目列表
            //type 1:全部  2:已加入  3:已创建  4：回收站
            //current 页码、
            async getProList(type = 1, current = 1) {
                let id = this.$route.params.id
                let param = {
                    current: current,
                    size: this.pageSize,
                    id: id,
                    type: type,
                    userId: localStorage.getItem("id")
                }
                let rs = await getProjectListById(param);
                return rs;
            },
            //回收站恢复项目
            async recoveryProject(pid) {
              let res = await getProjectByPid({
                pid: pid,
              });
              if(res.data.code === 200) {
                let project = res.data.data.body;
                confirmMessage(this, '确定恢复项目吗？').then(async () => {
                  project.isremove = 1;
                  let rs = await updateProject(project);
                  if(rs.data.code === 200) {
                    this.recycleProject.splice(res.data.data.body, 1);
                    notice(this, '恢复成功', 'success');
                  } else {
                    notice(this, '恢复失败', 'error');
                  }
                }).catch(() => {
                  notice(this, '已取消恢复', 'info');
                });
              } else {
                notice(this, '恢复失败', 'error');
              }
            },
            //回收站彻底删除项目
            async removeProject(pid) {
              let res = await getProjectByPid({
                pid: pid,
              });
              if(res.data.code === 200) {
                let project = res.data.data.body;
                confirmMessage(this, '确定彻底删除项目吗？').then(async () => {
                  project.isremove = 3;
                  let rs = await updateProject(project);
                  if(rs.data.code === 200) {
                    this.recycleProject.splice(res.data.data.body, 1);
                    notice(this, '彻底删除成功', 'success');
                  } else {
                    notice(this, '删除失败', 'error');
                  }
                }).catch(() => {
                  notice(this, '已取消删除', 'info');
                });
              } else {
                notice(this, '删除失败', 'error');
              }
            }
        },
        async mounted() {
            let app = this
            let rs = await this.getProList();
            if (rs.data.code == 200) {
                app.allProject.splice(0, this.allProject.length)
                app.totalCount = rs.data.data.count
                if (app.totalCount > 0)
                    app.allProject.push(...rs.data.data.list)
            }
        },
        watch: {
            async $route() {
                let app = this
                let rs = await this.getProList();
                this.activeName = "all"
                if (rs.data.code == 200) {
                    app.allProject.splice(0, this.allProject.length)
                    app.totalCount = rs.data.data.count
                    if (app.totalCount > 0)
                        app.allProject.push(...rs.data.data.list)
                }
            }
        }
    }
</script>

<style lang="less" scoped>

  #project/deep/.el-tabs__nav-scroll{
    display: block;
  }

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

    .el-tag .el-tag__close {
      color: rgb(16, 16, 16);

      &:hover {
        color: white;
      }
    }

    .el-icon-circle-plus-outline span {
      margin-left: 5px;
    }

    .el-tag {
      width: 100px;
      height: 55px;
      display: flex;
      align-items: center;
      background-color: white;
      color: rgb(16, 16, 16);
      border: none;
      margin-bottom: 0;
    }

    .el-form-item__content {
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

  .btnClass {
    color: #fff !important;
    background: rgb(255, 77, 79) !important;
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

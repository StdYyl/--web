<template>
  <div class="intfBg">
    <div class="intfBg_header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页1</el-breadcrumb-item>
        <el-breadcrumb-item>{{projectName}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs v-model="activeName" @tab-click="chooseTabs" id="intfTabs">
        <!--接口管理-->
        <el-tab-pane label="接口管理" name="interface">
          <div style="display: flex">
            <div class="intf_left" id="a">
              <el-tabs type="border-card" @tab-click="chooseIntf" v-model="activeIntf">
                <el-tab-pane label="接口列表" name="intf">
                  <div class="intf_left_in">
                    <el-input v-model="searchIntfName" placeholder="接口名称" size="small"
                              style="width: 155px;margin-left: 15px"></el-input>
                    <el-dropdown trigger="click" placement="bottom" @command="ShowView">
                      <el-button type="primary"
                                 style="margin-left: 10px;font-size: 20px;height: 30px;line-height: 0px">+
                      </el-button>
                      <el-dropdown-menu slot="dropdown" class="drops">
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
                    id="sss"
                    :data="intfData"
                    @node-click="changeRouter"
                    node-key="id"
                    :props="defaultProps"
                    :filter-node-method="searchIntf"
                    :highlight-current='true'
                    accordion
                    lazy
                    :load="nodeClick"
                    ref="intfTree"
                    :expand-on-click-node="isShowMore">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <div v-if="data.id == 0">
                        <span class='custom-tree-node'>
<!--                          <span class="el-tree-node__expand-icon el-icon-caret-right"></span>-->
                            <span class='folder_name' style="padding-left: 6px"> {{node.label}}</span>
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
<!--                          <span>-->
                          <!--                            <span class="el-tree-node__expand-icon el-icon-caret-right"></span>-->
                            <span class='folder_name' style="padding-left: 6px"> {{node.label}}</span>
                          <!--                          </span>-->
                          <!--<span class='folder_name'> {{node.label}} +2</span>-->
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

                <!--历史记录-->
                <el-tab-pane label="历史记录" name="history">
                  <div class="intf_left_in">
                    <el-input v-model="searchHistory" placeholder="接口名称" size="small"
                              style="width: 155px;margin-left: 15px"></el-input>
                    <el-button type="primary"
                               style="margin-left: 10px;font-size: 12px;height: 30px;line-height: 0px;padding: 12px 14px">
                      搜索
                    </el-button>
                  </div>
                  <el-tree
                    id="history"
                    :data="historyData"
                    @node-click="nodeClickHistory"
                    :props="defaultProps"
                    :filter-node-method="searchIntf"
                    :highlight-current='true'
                    accordion
                    node-key="id"
                    ref="intfTrees"
                    :expand-on-click-node="isShowMore">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span class='custom-tree-node'>
                          <span class="el-icon-date"></span>
                          <span class='folder_name' style="padding-left: 6px"> {{node.label}} </span>
                      </span>
                    </span>
                  </el-tree>
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
                <span class="title-text">接口导出</span>
              </div>
              <div class="button-right">
                <span class="title-close" @click="showDelete = false"></span>
              </div>
            </div>
            <div class="dialog_mes">
              <span style="padding-right: 5px">文件类型</span>
              <el-select v-model="fileType" placeholder="请选择导出文件类型" size="small">
                <el-option label="html" value="html"></el-option>
                <el-option label="word" value="word"></el-option>
                <el-option label="pdf" value="pdf"></el-option>
                <el-option label="markdown" value="markdown"></el-option>
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

        <!--添加分类提示-->
        <el-dialog
          title="提示"
          :visible.sync="showDialog[2]"
          @close="addModuleName='';parentId=-1"
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
            <div class="dialog_mes" style="padding-bottom: 5px">
              <span style="padding-right: 5px">选择目录</span>
              <el-select v-model="parentId" size="small" style="width: 210px">
                <el-option :key="item.id" v-for="item in folderList" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="dialog_mes">
              <span style="padding-right: 5px">分类名称</span>
              <el-input size="small" v-model="addModuleName" placeholder="分类名称" style="width: 210px"></el-input>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog[2] = false;showDialog.push()" size="small">取 消</el-button>
          <el-button type="primary" @click="addModule" size="small">确 定</el-button>
        </span>
        </el-dialog>

        <!--删除分类提示-->
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
        <el-tab-pane label="周报管理" name="weekly">
          <div class="weekly">
            <div class="header">
              <div class="info" @click="changeBar">
                周报管理
                <i class="el-icon-info"></i>
              </div>
              <div class="add" @click="writeWeekly">
                <i class="icon iconfont icon-date"></i>
                写周报
              </div>
            </div>
            <div class="main list" v-show="weeklyFlag==1?true:false">
              <div class="left">
                <div class="content" v-for="(item, idx) in weeklyconList" :key="idx">
                  <div class="week">
                    <div class="head">
                      <div class="logo">
                        <img :src="item.user.head" alt="">
                      </div>
                      <div class="info">
                        <div class="user">{{item.user.name}}的周报</div>
                        <div class="date">{{item.showTime}}</div>
                      </div>
                    </div>
                    <div class="modul">
                      当前模块：<span v-for="m in item.moduleList">{{m}}</span>
                    </div>
                    <div class="progress">
                      完成进度：<span v-for="p in item.progressList">{{p}}</span>
                    </div>
                    <div class="assignment">
                      <div class="ass_left">
                        <i class="icon iconfont icon-gongneng1"></i>
                      </div>
                      <div class="ass_right">
                        <div class="ass_right_header">本周任务完成情况:</div>
                        <div class="ass_right_desc">
                          {{item.complete}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="comment">
                    <div v-for="(comment, idx2) in item.commentList" :key="idx2" style="padding: 10px 0;border-bottom: 1px solid rgb(215,215,215);">
                      <div class="comment_item">
                        <div class="item_left">
                          <img :src="comment.user.head" alt="">
                        </div>
                        <div class="item_right">
                          <div class="item_right_name">{{comment.user.name}}</div>
                          <div class="item_right_content">{{comment.content}}</div>
                          <div class="item_right_footer">
                            <span class="date" v-if="(new Date().getTime()-new Date(comment.time).getTime())<24*60*60*1000">今天 {{dateFormat(comment.time, "HH:mm")}}</span>
                            <span class="date" v-if="(new Date().getTime()-new Date(comment.time).getTime())>=24*60*60*1000">{{dateFormat(comment.time, "YYYY年MM月DD日 HH:mm")}}</span>
                            <span v-if="comment.userid!=userid" class="reply" @click="replyComment(idx, idx2, null, comment, 'parent')">回复</span>
                            <span v-if="comment.userid==userid" class="delete" @click="deleteComment(idx, idx2, null, comment, 'parent')">删除</span>
                          </div>
                        </div>
                      </div>
                      <div style="margin-left: 30px;" class="comment_item" v-for="(subComment, idx3) in comment.subCommentList" :key="subComment.id">
                        <div class="item_left">
                          <img :src="subComment.user.head" alt="">
                        </div>
                        <div class="item_right">
                          <div class="item_right_name">{{subComment.user.name}} 回复了 {{subComment.reply.name}}</div>
                          <div class="item_right_content">{{subComment.content}}</div>
                          <div class="item_right_footer">
                            <span class="date" v-if="(new Date().getTime()-new Date(subComment.time).getTime())<24*60*60*1000">今天 {{dateFormat(subComment.time, "HH:mm")}}</span>
                            <span class="date" v-if="(new Date().getTime()-new Date(subComment.time).getTime())>=24*60*60*1000">{{dateFormat(subComment.time, "YYYY年MM月DD日 HH:mm")}}</span>
                            <span v-if="subComment.userid!=userid" class="reply" @click="replyComment(idx, idx2, idx3, subComment, 'children')">回复</span>
                            <span v-if="subComment.userid==userid" class="delete" @click="deleteComment(idx, idx2, idx3, subComment, 'children')">删除</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="comment_input_container">
                    <input type="text" v-if="item.user.id!=userid" class="comment_input" v-model="commentVal"
                           :placeholder="'评论'+item.user.name+'的周报'" v-on:keyup.enter="comment(item)"/>
                  </div>
                </div>
                <div class="more">
                  <div class="more_content" v-if="weeklyconList.length>0" @click="getMore">
                    <i v-if="!loadingComment" class="el-icon-refresh"></i>
                    <i v-if="loadingComment" class="el-icon-loading"></i>
                    点击加载更多
                  </div>
                  <div class="more_content" v-if="weeklyconList.length==0">
                    <i class="el-icon-loading"></i>
                    暂无任何数据
                  </div>
                </div>
              </div>
              <div class="right">
                <div v-if="weeklyTable.length!=0" id="myChart" style="width: 400px;height: 400px;"></div>
                <div v-if="weeklyTable.length==0" style="width: 400px;height: 400px;">
                  <i class="el-icon-loading"></i>
                  暂时没有任何接口
                </div>
              </div>
            </div>
            <div class="main write" v-show="weeklyFlag==2?true:false">
              <div class="write_wrapper" v-if="weeklyTable.length!=0">
                <div :class="item.week==1?'write_item blue':(item.week==weeklyTable.length?'write_item yellow':'write_item grey')"
                     v-for="(item, idx) in weeklyTable" @click="openDrawer(idx)">
                  <div class="week">
                    <span v-if="item.week==weeklyTable.length">本周（第{{item.week}}周）</span>
                    <span v-if="item.week!=weeklyTable.length">第 {{item.week}} 周</span>
                  </div>
                  <div class="date">
                    {{item.start}}-{{item.end}}
                  </div>
                </div>
              </div>
              <div class="write_wrapper" v-if="weeklyTable.length==0" style="display: flex;align-items: center;justify-content: center;">
                <span style="font-size: 30px;color: rgba(0,0,0,.2);">暂时没有任何周报</span>
              </div>
              <div class="add_weekly_wrapper">
                <div class="add_weekly" @click="openDrawer(0)">
                  <i class="el-icon-plus"></i>
                  写周报
                </div>
              </div>
              <div class="mantle" v-show="right_drawer" @click="right_drawer=false"></div>
              <div class="cover cover_left">
              </div>
              <transition enter-active-class="animate__slideInRight" leave-active-class="animate__slideOutRight" :duration="{ enter:1000, leave:1000 }">
                <div class="cover cover_right animate__animated" v-show="right_drawer">
                  <div>
                    <div class="c_r_header">
                      <div class="c_r_h_left">
                        <span class="mine">我的周报</span>
                        <span class="time">{{dateFormat(weekly.startTime, "YYYY.MM.DD")}}-{{dateFormat(weekly.endTime, "YYYY.MM.DD")}}</span>
                      </div>
                      <div class="c_r_h_right">
                        <span @click="generateTemplate">点击重新生成周报模板</span>
                      </div>
                    </div>
                    <div class="c_r_main">
<!--                      <MarkdownPro-->
<!--                        v-model="weekly.weeklyText"-->
<!--                        :height="400"-->
<!--                        theme="OneDark"-->
<!--                      />-->
                      <mavon-editor
                        ref="md"
                        id="editor"
                        v-model="weekly.weeklyText"
                        style="height: 400px;"
                        :toolbars="toolbars"
                      />
                    </div>
                  </div>
                  <div class="c_r_footer">
                    <el-button v-if="!weeklycon.weeklyid" type="primary" style="padding: 8px 20px; font-size: 16px"
                               @click="saveWeekly('save')">保存
                    </el-button>
                    <el-button v-if="weeklycon.weeklyid" type="warning" style="padding: 8px 20px; font-size: 16px"
                               @click="saveWeekly('update')" plain>更新
                    </el-button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </el-tab-pane>

        <!--环境设置-->
        <el-tab-pane label="环境设置" name="environment">
          <div style="display: flex">
            <div class="environment">
              <div class="environment_hd">项目环境列表</div>
              <el-menu
                id="menu"
                @select="selectEnvironment"
                :default-active="activeIndex"
                class="el-menu-vertical-demo">
                <el-menu-item :index="item.id" v-for="item in environmentList" :key="item.id">
                  <i class="el-icon-place"></i>
                  <span slot="title">{{item.name}}</span>
                </el-menu-item>
              </el-menu>
              <el-button type="text" class="addEnvir" @click="isAddEnvironment = true">新增环境</el-button>
            </div>

            <div class="environment_rh">
              <div v-if="isAddEnvironment">
                <div class="rh_head">
                  <h4 style="margin: 9px 0 0 15px;color: #1890FF">添加环境
                    <span class="el-icon-info" style="color:#1890FF;"></span>
                  </h4>
                </div>

                <el-form :model="environmentMrs" :rules="rules" ref="environmentMrs">
                  <el-form-item label="名称:" style="width: 500px">
                    <el-input v-model="environmentMrs.name" placeholder="环境名称"></el-input>
                  </el-form-item>
                  <el-form-item label="域名地址:" style="width: 500px">
                    <el-input v-model="environmentMrs.baseurl" placeholder="项目的域名地址BaseUrl"></el-input>
                  </el-form-item>
                  <el-form-item label="Cookies:" style="width: 500px">
                    <el-input v-model="environmentMrs.environmentcookies" placeholder="项目Cookie"></el-input>
                  </el-form-item>
                  <el-form-item label="Header:">
                    <div v-for="(headMes,num) in environmentMrs.header" style="display: flex;margin-bottom: 10px">
                      <el-form-item style="margin-right: 45px">
                        <el-autocomplete class="inline-input" v-model="headMes.reqHeader"
                                         :fetch-suggestions="headerMes" placeholder="请填写Header">
                        </el-autocomplete>
                      </el-form-item>
                      <el-form-item style="margin-right: 10px;">
                        <el-autocomplete style="width: 250px" class="inline-input"
                                         v-model="headMes.reqHeaderMethod"
                                         :fetch-suggestions="((a,b)=>{headerContent(headMes,a,b)})"
                                         placeholder="请填写Header"></el-autocomplete>
                      </el-form-item>
                      <el-button type="text" class="el-icon-plus addBtn" @click="addHeader('add')"></el-button>
                      <el-button type="text" class="el-icon-close rmBtn" @click="removeHeader('add',num)"
                                 v-if="environmentMrs.header.length > 1"></el-button>
                    </div>
                  </el-form-item>
                  <div style="text-align: center;width: 450px">
                    <el-button size="small" style="margin-right: 15px">取消</el-button>
                    <el-button size="small" type="primary" @click="addEnvironment('add')">确定</el-button>
                  </div>
                </el-form>
              </div>

              <div v-if="!isAddEnvironment">
                <div class="rh_head">
                  <h4 style="margin: 9px 0 0 15px;color: #1890FF">{{environmentTitle}}
                    <span class="el-icon-info" style="color:#1890FF;"></span>
                  </h4>
                </div>

                <el-form :model="environmentMsg" :rules="rules" ref="environmentMsg">
                  <el-form-item label="名称:" style="width: 500px">
                    <el-input v-model="environmentMsg.name" placeholder="环境名称"></el-input>
                  </el-form-item>
                  <el-form-item label="域名地址:" style="width: 500px">
                    <el-input v-model="environmentMsg.baseurl" placeholder="项目的域名地址BaseUrl"></el-input>
                  </el-form-item>
                  <el-form-item label="Cookies:" style="width: 500px">
                    <el-input v-model="environmentMsg.environmentcookies" placeholder="项目Cookie"></el-input>
                  </el-form-item>
                  <el-form-item label="Header:">
                    <div v-for="(headMes,num) in environmentMsg.header" style="display: flex;margin-bottom: 10px">
                      <el-form-item style="margin-right: 45px">
                        <el-autocomplete class="inline-input" v-model="headMes.reqHeader"
                                         :fetch-suggestions="headerMes" placeholder="请填写Header">
                        </el-autocomplete>
                      </el-form-item>
                      <el-form-item style="margin-right: 10px;">
                        <el-autocomplete style="width: 250px" class="inline-input"
                                         v-model="headMes.reqHeaderMethod"
                                         :fetch-suggestions="((a,b)=>{headerContent(headMes,a,b)})"
                                         placeholder="请填写Header"></el-autocomplete>
                      </el-form-item>
                      <el-button type="text" class="el-icon-plus addBtn" @click="addHeader()"></el-button>
                      <el-button type="text" class="el-icon-close rmBtn" @click="removeHeader(num)"
                                 v-if="environmentMsg.header.length > 1"></el-button>
                    </div>
                  </el-form-item>
                  <div style="text-align: center;width: 450px">
                    <el-button size="small" style="margin-right: 15px">取消</el-button>
                    <el-button size="small" type="primary" @click="addEnvironment">确定</el-button>
                  </div>
                </el-form>
              </div>

            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--导出接口模板-->
    <div style="position: absolute;left:9999px;top:100px">
      <div id="intfTemplate" ref="intfTemplate" style="width: 800px;margin: 0 auto;font-size: 14px">
        <div v-for="(item,index) in intfMesList" :key="index" style="text-align: left">
          <h2>{{index+1}}、{{item.name}}</h2>
          <h3 style="border-left: 3px solid rgb(24, 144, 255);padding-left: 15px;line-height: 35px">基本信息：</h3>
          <div style="margin-left: 15px;line-height: 28px">
            <div><strong>Path：</strong>{{item.environmentPath}}{{item.path}}</div>
            <div><strong>Method：</strong><span style="color: rgb(24, 144, 255)">{{item.typeName}}</span></div>
          </div>

          <h3 style="border-left: 3px solid rgb(24, 144, 255);padding-left: 15px;line-height: 35px">请求参数：</h3>
          <!--请求参数-->
          <el-tabs v-model="paramTab" type="border-card" id="tab">
            <el-tab-pane v-for="(items, indexs) in item.paramMsg" :key="items.name" :label="items.title"
                         :name="items.name">
              <el-form :model="from" ref="from" label-position="top">

                <!--header-->
                <div v-if="items.headEmpty">
                  <div style="text-align: left">
                    <i class="header-icon el-icon-info" style="color:#1890FF;margin:0 5px 10px 0"></i>Header
                  </div>
                  <el-table :data="items.reqheader" border>
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
                <div v-if="item.typeName != 'GET'">
                  <div style="text-align: left">
                    <i class="header-icon el-icon-info" style="color:#1890FF;margin:15px 5px 10px 0"></i>Body{{items.reqType}}
                  </div>

                  <!--from格式-->
                  <div v-if="items.reqtype == '1'">
                    <el-table :data="items.reqBody" border>
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
                  <div v-else-if="items.reqtype == '2'">
                    <el-table :data="JSON.parse(items.reqBodyJson)" border
                              row-key="name" default-expand-all
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
                      {{items.reqBody}}
                    </el-card>
                  </div>
                </div>

                <!--Query-->
                <div v-if="items.queryStr">
                  <div style="text-align: left;line-height: 41px">
                    <i class="header-icon el-icon-info" style="color:#1890FF;margin:0 5px 10px 0"></i>Query
                  </div>
                  <el-table :data="items.reqQuery" border>
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
                <div v-if="items.resultStr">
                  <div style="text-align: left">
                    <i class="header-icon el-icon-info" style="color:#1890FF;margin:15px 5px 10px 0"></i>Result
                  </div>
                  <div>
                    <!--json格式-->
                    <div v-if="items.restype == '1'">
                      <el-table :data="JSON.parse(items.resbody)" border
                                row-key="name" default-expand-all
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
                        {{items.resultStr}}
                      </el-card>
                    </div>
                  </div>
                </div>
              </el-form>
            </el-tab-pane>
          </el-tabs>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {MarkdownPreview, MarkdownPro} from 'vue-meditor'
    import {mavonEditor} from "mavon-editor"
    import "mavon-editor/dist/css/index.css"
    import {addDir, getDirOneList, queryModuleListSecond} from "../../api/directory";
    import {notice, confirmMessage} from "../../utils/elementUtils";
    import {COMMON} from "../../const/common";
    import moment from "moment";
    import {addProEnvironment, getProEnvironmentList, putEnvironmentMes, getProjectByPid} from "../../api/project";
    import {writeWeeklyCon, getWeeklyCon, listWeeklyCon} from "../../api/weeklycon";
    import {satisfyInterface} from "../../api/intfsituation";
    import {removeComment, addComment} from "../../api/comment";
    import {archiveIntf, exportIntfList, getInterfaceList} from "../../api/interface";
    import {exportMD, exportWord, interface2MDJSON, parseChildJson} from "../../utils/utils";

    import writer from 'file-writer';
    import htmlToPdf from "../../utils/htmlToPdf";

    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    export default {
        name: "index",
        data() {
            return {
                //对应项目
                project: {},
                activeIntf: 'intf',
                from: {},
                paramTab: '1',
                //接口详情列表
                intfMesList: [],
                //查询环境时
                environmentTitle: '',
                activeIndex: "",
                environmentMsg: {},
                isAddEnvironment: false,
                //新增环境时
                environmentMrs: {
                    name: '',
                    baseurl: '',
                    environmentcookies: '',
                    header: [
                        {reqHeader: '', reqHeaderMethod: '',}
                    ]
                },
                //环境列表
                environmentList: [],
                folderList: [],
                parentId: -1,
                activeName: 'interface',
                projectName: "软件测试项目",
                isShowMore: true,
                //历史记录
                historyData: [
                    {
                        id: 1,
                        label: "一天前",
                    },
                    {
                        id: 2,
                        label: "三天前",
                    },
                    {
                        id: 3,
                        label: "一周前",
                    },
                    {
                        id: 4,
                        label: "一个月前",
                    },
                    {
                        id: 5,
                        label: "三个月前",
                    },
                    {
                        id: 6,
                        label: "半年前",
                    },
                    {
                        id: 7,
                        label: "更早",
                    },
                ],
                //添加分类名称
                addModuleName: '',
                //文件类型
                fileType: "html",
                //选择的模块
                moduleMes: {},
                showDialog: [false, false, false, false],
                //搜索
                searchIntfName: '',
                //历史搜索
                searchHistory: '',
                //接口列表
                intfData: [
                    {
                        id: 0, label: '我的接口'
                    },
                    // {
                    //     id: 1,
                    //     label: "用户中心",
                    //     children: [
                    //         {
                    //             id: 2,
                    //             label: "个人信息",
                    //             children: [
                    //                 {id: 3, label: "用户名修改", isIntf: true, method: 'put'},
                    //                 {id: 4, label: "密码修改", isIntf: true, method: 'put'},
                    //             ]
                    //         },
                    //     ]
                    // },
                    // {
                    //     id: 5,
                    //     label: "客户管理",
                    //     children: [
                    //         {
                    //             id: 6,
                    //             label: "计算机学院",
                    //             children: [
                    //                 {id: 7, label: "学生管理系统", isIntf: true, method: 'put'},
                    //                 {id: 8, label: "宿舍管理系统宿舍管理系统宿舍管理系统", isIntf: true, method: 'put'},
                    //             ]
                    //         },
                    //     ]
                    // },

                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                commentVal: '',
                weeklyFlag: 1,
                right_drawer: false,
                left_drawer: false,
                weekly: {
                    weeklyText: '周报填写',
                },
                weeklycon: {},
                weeklyconList: [],
                //加载评论
                loadingComment: false,
                current: 1,
                size: 1,
                rules: {
                    name: {required: true, message: "请输入环境名称", trigger: 'blur'},
                    baseUrl: {required: true, message: "请输入域名地址", trigger: 'blur'},
                },
                weeklyTable: [],
                toolbars:  {
                  bold: true, // 粗体
                  italic: true, // 斜体
                  header: true, // 标题
                  underline: true, // 下划线
                  strikethrough: true, // 中划线
                  mark: true, // 标记
                  superscript: true, // 上角标
                  subscript: true, // 下角标
                  quote: true, // 引用
                  ol: true, // 有序列表
                  ul: true, // 无序列表
                  link: true, // 链接
                  // imagelink: true, // 图片链接
                  code: true, // code
                  table: true, // 表格
                  fullscreen: true, // 全屏编辑
                  readmodel: true, // 沉浸式阅读
                  htmlcode: true, // 展示html源码
                  help: true, // 帮助
                  /* 1.3.5 */
                  undo: true, // 上一步
                  redo: true, // 下一步
                  trash: true, // 清空
                  save: true, // 保存（触发events中的save事件）
                  /* 1.4.2 */
                  navigation: true, // 导航目录
                  /* 2.1.8 */
                  alignleft: true, // 左对齐
                  aligncenter: true, // 居中
                  alignright: true, // 右对齐
                  /* 2.2.1 */
                  subfield: true, // 单双栏模式
                  preview: true, // 预览
                }
            }
        },
        components: {
            MarkdownPreview,
            MarkdownPro,
            mavonEditor
        },
        computed: {
            userid() {
                return localStorage.getItem('id');
            }
        },
        methods: {
            nodeClickHistory(e) {
                let {id, moduleId} = this.$route.params
                if (moduleId == e.id || (moduleId == 'all' && e.id === 0)) return;
                this.$router.push(`/home/intfIndex/${id}/history/${e.id}`)
            },
            //切换历史记录和接口列表
            chooseIntf() {
                let {id} = this.$route.params
                let path = this.$route.path
                if (this.activeIntf == 'intf') {
                    console.log(path.indexOf("intf"))
                    if (path.indexOf("/intf/") == -1) {
                        this.$router.push(`/home/intfIndex/${id}/intf/all`)
                        this.$refs.intfTrees.setCurrentKey(id);
                    }
                }
                if (this.activeIntf == 'history') {
                    if (path.indexOf("/history/") == -1) {
                        this.$router.push(`/home/intfIndex/${id}/history/1`)
                        this.$refs.intfTree.setCurrentKey(id == 'all' || !id ? 0 : id);
                    }
                }
            },
            //切换tabs
            async chooseTabs() {
                if (this.activeName == 'environment') {
                    let rs = await getProEnvironmentList(this.$route.params.id);
                    if (rs.data.data) {
                        this.environmentList.splice(0, this.environmentList.length)
                        let param = rs.data.data
                        param.forEach(arr => {
                            if (arr.header)
                                arr.header = JSON.parse(arr.header)
                        })
                        this.environmentList.push(...param)
                        //设置默认值
                        this.activeIndex = JSON.parse(JSON.stringify(param[0].id))
                        this.environmentMsg = JSON.parse(JSON.stringify(param[0]))
                        this.environmentTitle = JSON.parse(JSON.stringify(param[0].name))
                    }
                } else if (this.activeName == 'interface') {
                    if (this.$route.path.indexOf("/intf/all") == -1) {
                        console.log(this.$route.path.indexOf("/intf/all"))
                        this.$router.push(`/home/intfIndex/${this.$route.params.id}/intf/all`)
                    }
                } else if(this.activeName == 'weekly') {
                  this.weeklyFlag = 1;
                  this.weeklyTable = [];
                  this.weeklyconList = [];
                  this.current=1;
                  this.size=1;
                  this.loadingComment = true;
                  await this.dealWithWeeklyDate(this.$route.params.id);
                  await this.getWeeklyConList(this.current, this.size);
                  await this.drawLine(this.$route.params.id);
                }
            },
            //添加addEnvironment
            async addEnvironment(e) {
                //新增环境  environmentMrs
                if (e == 'add') {
                    if(this.environmentMrs.name == ''){
                        notice(this,"环境名称不能为空！","error")
                        return
                    }
                    if(this.environmentMrs.baseurl == ''){
                        notice(this,"环境域名地址不能为空！","error")
                        return
                    }
                    let param = JSON.parse(JSON.stringify(this.environmentMrs))
                    param.header = JSON.stringify(this.environmentMrs.header)
                    param.createuser = localStorage.getItem("id")
                    param.updateuser = localStorage.getItem("id")
                    param.projectid = this.$route.params.id
                    let rs = await addProEnvironment(param)
                    if (rs.data.code == 200) {
                        notice(this, "添加成功!")
                    }
                    let params = {
                        name: '', baseurl: '', environmentcookies: '',
                        header: [{reqHeader: '', reqHeaderMethod: '',}]
                    }
                    this.environmentMrs = params;
                    // 修改环境  environmentMsg
                } else {
                    if(this.environmentMsg.name == ''){
                        notice(this,"环境名称不能为空！","error")
                        return
                    }
                    if(this.environmentMsg.baseurl == ''){
                        notice(this,"环境域名地址不能为空！","error")
                        return
                    }
                    let param = JSON.parse(JSON.stringify(this.environmentMsg))
                    param.header = JSON.stringify(this.environmentMsg.header)
                    param.updateuser = localStorage.getItem("id")
                    param.projectid = this.$route.params.id
                    let rs = await putEnvironmentMes(param)
                    if (rs.data.code == 200) {
                        notice(this, "修改成功")
                    } else {
                        notice(this, "修改失败", "error")
                    }
                }
                //重新查询接口
                this.chooseTabs();
                this.isAddEnvironment = false

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
            //请求头
            headerMes(q, c) {
                c(COMMON.HEADER)
            },
            //添加header
            addHeader(e) {
                if (e == 'add') {
                    this.environmentMrs.header.push({reqHeader: '', reqHeaderMethod: ''});
                } else {
                    this.environmentMsg.header.push({reqHeader: '', reqHeaderMethod: ''});
                }
            },
            //删除header
            removeHeader(e, num) {
                if (e == 'add') {
                    if (this.environmentMrs.header.length <= 1) {
                        this.$message.error('删除失败，至少有存在一个Header');
                        return;
                    }
                    this.environmentMrs.header.splice(num, 1)
                } else {
                    if (this.environmentMsg.header.length <= 1) {
                        this.$message.error('删除失败，至少有存在一个Header');
                        return;
                    }
                    this.environmentMsg.header.splice(num, 1)
                }

            },
            //切换项目环境
            selectEnvironment(e) {
                let param = {
                    name: '', baseurl: '', environmentcookies: '',
                    header: [{reqHeader: '', reqHeaderMethod: '',}]
                }
                let index = this.environmentList.findIndex(param => param.id == e);
                this.environmentMrs = param;
                this.isAddEnvironment = false
                this.environmentMsg = JSON.parse(JSON.stringify(this.environmentList[index]))
            },
            //更换路由
            changeRouter(e) {
                let {id, moduleId} = this.$route.params
                if (moduleId == e.id || (moduleId == 'all' && e.id === 0)) return;
                if (e.id == 0) {
                    this.$router.push(`/home/intfIndex/${id}/intf/all`)
                    return;
                }
                this.$router.push(`/home/intfIndex/${id}/intf/${e.id}`)
            },
            //添加模块
            async addModule() {
                if (this.addModuleName == '') {
                    notice(this, '请输入模块名称', 'error')
                    return;
                }
                let param = {
                    name: this.addModuleName,
                    category: "1",
                    parentid: this.parentId,
                    createby: localStorage.getItem("id"),
                    projectid: this.$route.params.id,
                    updateby: localStorage.getItem("id"),
                }
                let rs = await addDir(param);
                if (rs.data.code != 200) {
                    notice(this, rs.data.msg, 'error')
                    return;
                }
                notice(this, "添加成功")
                this.parentId = -1
                this.addModuleName = ''
                //调用查询目录接口
                let msg = await this.getModuleList();
                if (msg.data.data) {
                    this.intfData = [{id: 0, label: '我的接口'}]
                    this.intfData.push()
                    let arr = msg.data.data;
                    for (let i = 0; i < arr.length; i++) {
                        this.intfData.push({id: arr[i].id, label: arr[i].name, children: []})
                    }
                }
                this.$nextTick(function () {
                    let id = this.$route.params.moduleId
                    this.$refs.intfTree.setCurrentKey(id == 'all' ? 0 : id);
                })
                this.showDialog[2] = false
                this.showDialog.push()
            },
            async nodeClick(node, resolve) {
                //查询子目录
                let rs = await queryModuleListSecond(node.data.id)
                if (rs.data.data) {
                    let arr = rs.data.data;
                    let child = []
                    for (let i = 0; i < arr.length; i++) {
                        child.push({id: arr[i].id, label: arr[i].name})
                    }
                    resolve(child);
                }
            },
            //导出word
            getWord(data) {
                let intf = []
                intf.push(...data)
                exportWord(intf, this.projectName)
            },
            //导出html
            getHtml(data) {
                this.intfMesList = []
                this.intfMesList.push(...data)
                this.$nextTick(() => {
                    let tem = this.$refs.intfTemplate.outerHTML
                    console.log(data)
                    let html = `<!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1.0">
                    <title></title>
                    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
                    <script src="https://cdn.jsdelivr.net/npm/vue"><\/script>
                    <script src="https://unpkg.com/element-ui/lib/index.js"><\/script>
                </head>
                <body>
                    <div class="app" style="margin:0 auto;width:1200px">
                       ${tem}
                    </div>
                    <script type="text/javascript">
                        const vm = new Vue({
                            el: '#app',
                            data: {
                                msg: ''
                            }
                        })
                    <\/script>
                </body>
                </html>`;
                    try {
                        let s = writer(`${this.projectName}-接口文档.html`, html, 'utf-8');
                        notice(this, "导出成功！");
                        this.showDialog[0] = false;
                        this.showDialog.push()
                    } catch (e) {
                    }
                })
            },
            //导出接口
            async exportIntf() {
                console.log(this.project);
                let {id, moduleId} = this.$route.params;
                let rs = await exportIntfList(id, moduleId)
                if (rs.data.code == -9999) {
                    notice(this, rs.data.msg, "error")
                    return;
                } else {
                    let data = rs.data.data
                    data.forEach((dataItem, index) => {
                        dataItem['index'] = index + 1
                        dataItem.paramMsg.forEach(msg => {
                            //header
                            if (msg.reqheader) {
                                msg.reqheader = JSON.parse(msg.reqheader)
                                //判断header是否为空
                                msg.reqheader.forEach(head => {
                                    if (head.reqHeader != '' && head.reqHeaderMethod != '' && head.paramNote != '') {
                                        msg['headEmpty'] = 1
                                    }
                                })
                            }
                            //Prarm
                            let param = {}
                            if (msg.reqtype == '1' && msg.reqbody) {
                                msg.reqBody = JSON.parse(msg.reqbody)
                                msg.reqBody.forEach(msg => {
                                    param[msg.name] = msg.value
                                })
                            }
                            if (msg.reqtype == '2') {
                                param = parseChildJson(JSON.parse(msg.reqBodyJson))
                            }
                            if (msg.reqtype == '3') {
                                param = JSON.parse(msg.reqBody)
                            }
                            if (JSON.stringify(param) != "{}") msg['paramStr'] = JSON.stringify(param)
                            //Query
                            if (msg.reqQuery) {
                                msg.reqQuery = JSON.parse(msg.reqQuery)
                                let query = {}
                                msg.reqQuery.forEach(msg => {
                                    if (msg.name != '') query[msg.name] = msg.value
                                })
                                if (JSON.stringify(query) != "{}") msg['queryStr'] = JSON.stringify(query)
                            }
                            //Result
                            let result = {}
                            if (msg.restype == "1") {
                                result = parseChildJson(JSON.parse(msg.resbody))
                            }
                            if (msg.restype == "2") {
                                result = JSON.parse(msg.resbody)
                            }
                            if (JSON.stringify(result) != "{}") msg['resultStr'] = JSON.stringify(result)
                        })
                    })
                    if (this.fileType == 'word') {
                        this.getWord(data);
                    } else if (this.fileType == 'html') {
                        this.getHtml(data)
                    } else if (this.fileType == 'pdf') {
                        this.intfMesList = []
                        this.intfMesList.push(...data)
                        this.$nextTick(() => {
                            htmlToPdf.downloadPDF(document.querySelector('#intfTemplate'), this.projectName+'-接口文档')
                            notice(this, "导出成功！");
                            this.showDialog[0] = false;
                            this.showDialog.push()
                        })
                    } else if (this.fileType == 'markdown') {
                      interface2MDJSON(data);
                      let rs = exportMD(data);
                      const element = document.createElement('a')
                      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(rs))
                      element.setAttribute('download', this.projectName+'-接口文档.md')
                      element.style.display = 'none'
                      element.click()
                        // this.$nextTick(() => {
                        //     exportMD(document.querySelector('#intfTemplate'))
                        //     notice(this, "导出成功！");
                        //     this.showDialog[0] = false;
                        //     this.showDialog.push()
                        // })
                    }
                }
            },
            //删除接口
            removeIntf() {
                console.log(this.moduleMes)
            },
            //接口归档
            async endIntf() {
                let {id, moduleId} = this.$route.params;
                let rs = await archiveIntf(localStorage.getItem("id"), moduleId, id)
                if (rs.data.code == 200) {
                    notice(this, rs.data.msg)
                } else {
                    notice(this, rs.data.msg, "error")
                }
                this.showDialog[3] = false
                this.showDialog.push()
            },
            //点击模块右侧menu
            async ShowView(command) {
                let route = this.$route
                //添加接口
                if (command.index == 'one' && route.path.indexOf("/AddIntf") == -1) {
                    this.$router.push(`/home/intfIndex/${route.params.id}/AddIntf`)
                    return;
                }
                //导出接口
                if (command.index == 'some' && route.path.indexOf("/ExportIntf") == -1) {
                    this.$router.push(`/home/intfIndex/${route.params.id}/ExportIntf`)
                    return;
                }
                //新增分类
                this.folderList.splice(0, this.folderList.length)
                this.folderList.push({id: -1, label: "无"})
                let rs = await getDirOneList(localStorage.getItem("id"), 1, this.$route.params.id);
                if (rs.data.data) {
                    let arr = rs.data.data;
                    for (let i = 0; i < arr.length; i++) {
                        this.folderList.push({id: arr[i].id, label: arr[i].name})
                    }
                }
                if (command.data) this.moduleMes = command.data
                this.showDialog[command.index] = true;
                this.showDialog.push()
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
            writeWeekly() {
                //写周报
                this.weeklyFlag = 2;
            },
            handleCloseRight() {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.right_drawer = false;
                    })
                    .catch(_ => {
                    });
            },
            async changeBar() {
                //点击周报管理按钮，切换回周报首页
              this.weeklyFlag = 1;
              this.weeklyTable = [];
              this.weeklyconList = [];
              this.current=1;
              this.size=1;
              this.loadingComment = true;
              await this.dealWithWeeklyDate(this.$route.params.id);
              await this.getWeeklyConList(this.current, this.size);
              await this.drawLine(this.$route.params.id);
            },
            //echarts画图操作
            async drawLine(pid) {
                console.log(this.weeklyTable);
                if(this.weeklyTable.length==0) {
                  notice(this, '周报将从下周开始算起，暂时没有任何关于接口的数据', 'info');
                  return;
                }
                let res = await satisfyInterface({
                    pid: pid,
                    weeks: this.weeklyTable[0].week,
                });
                let data = [];
                if(res.data.code === 200) {
                  data.push(res.data.data.body.successful);
                  data.push(res.data.data.body.fail);
                  data.push(res.data.data.body.newcase);
                  data.push(res.data.data.body.number);
                  data.push(res.data.data.body.newintf);
                } else if(res.data.code === 101) {
                  notice(this, '暂时没有任何关于接口的数据', 'info');
                  // return;
                }
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '本周接口使用统计图',
                        subtext: '详细统计'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        data: ["10", "20", "30", "40", "50", "60"]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['响应成功数量', '响应失败数', '新增用例数', '接口调用次数', '新建接口数']
                    },
                    series: [{
                        name: '数量',
                        type: 'bar',
                        data: data,
                        barWidth: 25,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                    var colorList = ['#52C41A', '#FF4D4F', '#52C41A', '#FF4D4F', '#52C41A'];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    }]
                });
            },
            //获取模块列表
            async getModuleList() {
                let app = this
                let id = this.$route.params.id
                app.intfData.splice(0, this.intfData.length)
                app.intfData.push({id: 0, label: '我的接口'})
                let rs = await getDirOneList(localStorage.getItem("id"), 1, id);
                if (rs.data.data) {
                    let arr = rs.data.data;
                    for (let i = 0; i < arr.length; i++) {
                        this.intfData.push({id: arr[i].id, label: arr[i].name, children: []})
                    }
                }
                return rs;

            },
            //处理周报日期问题
            async dealWithWeeklyDate(pid) {
                if (pid) {
                    let res = await getProjectByPid({
                        pid: pid,
                    });
                    if (res.data.code === 200) {
                        this.project = res.data.data.body;
                        this.getWeeksWithYearAndMonth(new Date(this.project.createtime),
                            this.project.endmonth, this.project.endday);
                        return;
                    }
                }
                notice(this, '找不到对应的项目', 'error');
            },
            getWeeksWithYearAndMonth(startDate, endMonth, endDay) {
                let day = startDate.getUTCDay();
                let balance = (8 - day) % 7;
                let firstDate = new Date(startDate.getTime() + balance * 24 * 60 * 60 * 1000);

                let dateTable = [];
                let week = 1;
                let nowDate = new Date();
                let enddays = (nowDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
                for (let index = 0; index < endMonth * 30 + endDay - balance && index < enddays; index += 7, week++) {
                    let startTime = new Date(firstDate.getTime() + (index) * 24 * 60 * 60 * 1000);
                    let start = moment(startTime).format('MM.DD');
                    let endTime = new Date(firstDate.getTime() + (index + 4) * 24 * 60 * 60 * 1000);
                    let end = moment(endTime).format('MM.DD');
                    let item = {};
                    item.start = start;
                    item.startTime = startTime;
                    item.end = end;
                    item.endTime = endTime;
                    item.week = week;
                    dateTable.push(item);
                }
                dateTable.reverse();
                this.weeklyTable = dateTable;
            },
            async openDrawer(idx) {
              if(this.weeklyTable.length==0) {
                notice(this, '周报从下周开始', 'info');
                return;
              }
              notice(this, '请严格按照模板内容进行周报填写！！！', 'warning');
              this.weeklycon = {};
              this.weekly.weeklyText = '';
              this.weekly = this.weeklyTable[idx];
              let res = await getWeeklyCon({
                weeks: this.weekly.week,
                pid: this.project.id,
                uid: localStorage.getItem('id'),
              });
              console.log(res);
              if(res.data.code === 200) {
                this.weeklycon = res.data.data.body;
                if(!this.weeklycon.body) {
                  this.weekly.weeklyText = '### 当前模块\n' +
                    '\n' +
                    '1.  \n' +
                    '2.  \n' +
                    '3.  \n' +
                    '\n' +
                    '### 完成进度\n' +
                    '\n' +
                    '1.  \n' +
                    '2.  \n' +
                    '3.  \n' +
                    '\n' +
                    '### 本周任务完成情况\n' +
                    '\n' +
                    '1.  \n' +
                    '2.  \n' +
                    '3.  \n' +
                    '\n' +
                    '### 需要支持\n' +
                    '\n' +
                    '1.  \n' +
                    '2.  \n' +
                    '3.  \n';
                  this.right_drawer=true;
                  return;
                }
                this.weekly.weeklyText = this.weeklycon.body;
                this.right_drawer=true;
                return;
              }
              this.right_drawer=true;
              //周报template模板
              let templateWeekly = '### 当前模块\n' +
                '\n' +
                '1.  \n' +
                '2.  \n' +
                '3.  \n' +
                '\n' +
                '### 完成进度\n' +
                '\n' +
                '1.  \n' +
                '2.  \n' +
                '3.  \n' +
                '\n' +
                '### 本周任务完成情况\n' +
                '\n' +
                '1.  \n' +
                '2.  \n' +
                '3.  \n' +
                '\n' +
                '### 需要支持\n' +
                '\n' +
                '1.  \n' +
                '2.  \n' +
                '3.  \n';
              this.weekly.weeklyText = templateWeekly;
            },
            async saveWeekly(type) {
                if (this.weekly.weeklyText.indexOf('### 当前模块\n') == -1 || this.weekly.weeklyText.indexOf('### 完成进度\n') == -1
                    || this.weekly.weeklyText.indexOf('### 本周任务完成情况\n') == -1 || this.weekly.weeklyText.indexOf('### 需要支持\n') == -1) {
                    notice(this, '模板已被变动，请考虑重新生成模板', 'warning');
                    return;
                }
                let weeklycon = {};
                if (type == 'save') {
                    let weekly = {};
                    weekly.projectid = this.project.id;
                    weekly.begintime = this.weekly.startTime;
                    weekly.endtime = this.weekly.endTime;
                    weekly.weeks = this.weekly.week;
                    weeklycon.weekly = weekly;
                    weeklycon.userid = localStorage.getItem('id');
                    weeklycon.addtime = new Date();
                }
                if (type == 'update') {
                    weeklycon = this.weeklycon;
                    weeklycon.updatetime = new Date();
                }
                weeklycon.body = this.weekly.weeklyText;
                let res = await writeWeeklyCon(weeklycon);
                if (res.data.code === 200) {
                    if (type == 'save') notice(this, '保存成功', 'success');
                    else notice(this, '更新成功', 'success');
                    this.right_drawer = false;
                    return;
                }
                notice(this, '更新失败', 'error');
            },
            //日期转换方法
            dateFormat(date, pattern) {
                return moment(date).format(pattern);
            },
          async getWeeklyConList(current, size) {
            let res = await listWeeklyCon({
              current: current,
              size: size,
              pid: this.$route.params.id,
            });
            console.log(res.data.data);
            if (res.data.code === 200) {
              if (res.data.data.total > 0) {
                res.data.data.list.forEach((item) => {
                  let weeklycon = item;
                  weeklycon.showTime = item.updatetime ? moment(item.updatetime).format('YYYY年MM月DD日 HH:mm') : moment(item.addtime).format('YYYY年MM月DD日 HH:mm');
                  let moduleList = [];
                  let progressList = [];
                  let completeStr = '';
                  if(item.body) {
                    //处理字符串拿到当前模块
                    let moduleStr = item.body.substring(item.body.indexOf('当前模块') + 6, item.body.indexOf('完成进度') - 5);
                    let moduleStrList = moduleStr.split('\n');
                    moduleStrList.forEach((item) => {
                      if(item!='') {
                        let module = item.substring(item.lastIndexOf(' ')+1);
                        moduleList.push(module);
                      }
                    });
                    //处理字符串拿到完成进度
                    let progressStr = item.body.substring(item.body.indexOf('完成进度') + 6, item.body.indexOf('本周任务完成情况') - 5);
                    let progressStrList = progressStr.split('\n');
                    progressStrList.forEach((item) => {
                      if(item!='') {
                        let progress = item.substring(item.lastIndexOf(' ')+1);
                        progressList.push(progress);
                      }
                    });
                    //处理字符串拿到本周任务完成情况
                    completeStr = item.body.substring(item.body.indexOf('本周任务完成情况') + 10, item.body.indexOf('需要支持') - 5);
                    // let completeStrList = completeStr.split('\n');
                    // let completeList = [];
                    // completeStrList.forEach((item) => {
                    //   if(item!='') {
                    //     let complete = item.substring(item.lastIndexOf(' ')+1);
                    //     completeList.push(complete);
                    //   }
                    // });
                  }
                  weeklycon.moduleList = moduleList;
                  weeklycon.progressList = progressList;
                  weeklycon.complete= completeStr;
                  this.weeklyconList.push(weeklycon);
                })
              } else {
                notice(this, '已经没有更多数据了', 'info');
              }
              this.loadingComment = false;
            }
          },
          //生成周报模板
          generateTemplate() {
            this.weekly.weeklyText = '### 当前模块\n' +
              '\n' +
              '1.  \n' +
              '2.  \n' +
              '3.  \n' +
              '\n' +
              '### 完成进度\n' +
              '\n' +
              '1.  \n' +
              '2.  \n' +
              '3.  \n' +
              '\n' +
              '### 本周任务完成情况\n' +
              '\n' +
              '1.  \n' +
              '2.  \n' +
              '3.  \n' +
              '\n' +
              '### 需要支持\n' +
              '\n' +
              '1.  \n' +
              '2.  \n' +
              '3.  \n';
          },
          //点击获取更多操作
          getMore() {
            this.loadingComment = true;
            setTimeout(() => {
              this.getWeeklyConList(++this.current, this.size);
            }, 1000);
          },
          //删除评论
          deleteComment(idx, idx2, idx3, comment, level) {
            console.log(idx);
            console.log(idx2);
            console.log(idx3);
            console.log(comment);
            console.log(level);
            confirmMessage(this, '确定删除该评论吗？').then(async () => {
              let res = await removeComment({
                cid: comment.id,
              });
              if(res.data.code === 200) {
                console.log(this.weeklyconList[idx].commentList[idx2]);
                if(level=='parent') {
                  this.weeklyconList[idx].commentList.splice(idx2, 1);
                } else {
                  this.weeklyconList[idx].commentList[idx2].subCommentList.splice(idx3, 1);
                }
                notice(this, '删除成功', 'success');
              } else {
                notice(this, '删除失败', 'error');
              }
            }).catch(() =>  {
              notice(this, '已取消删除', 'info');
            });
          },
          //回复评论
          replyComment(idx, idx2, idx3, comment, level) {
            // console.log(idx);
            // console.log(idx2);
            // console.log(idx3);
            // console.log(comment);
            // console.log(level);
            this.$prompt('请输入评论内容', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /^[\u0391-\uFFE5A-Za-z]+$/,
              inputErrorMessage: '评论内容不能未空'
            }).then(async ({ value }) => {
              let comm = {};
              comm.weeklyconid = comment.weeklyconid;
              comm.userid = localStorage.getItem('id');
              comm.replyto = comment.userid;
              comm.content = value;
              comm.isdeleted = 1;
              comm.time = new Date();
              comm.parentid = comment.id;
              let res = await addComment(comm);
              if(res.data.code === 200) {
                if(!this.weeklyconList[idx].commentList) this.weeklyconList[idx].commentList=[];
                if(!this.weeklyconList[idx].commentList[idx2].subCommentList) this.weeklyconList[idx].commentList[idx2].subCommentList=[];
                if(level=='parent') {
                  let temp = this.weeklyconList[idx].commentList[idx2].subCommentList;
                  temp.push(res.data.data.body);
                  this.weeklyconList[idx].commentList[idx2].subCommentList = temp;
                  //强制刷新数组
                  this.$forceUpdate();
                  // this.weeklyconList[idx].commentList[idx2].subCommentList.push(res.data.data.body);
                } else {
                  this.weeklyconList[idx].commentList[idx2].subCommentList.splice(idx3+1, 0, res.data.data.body);
                }
                this.commentVal = '';
                notice(this, '评论成功', 'success');
              } else {
                notice(this, '评论失败', 'error');
              }
            }).catch(() => {
              notice(this, '取消评论', 'info')
            });
          },
          //评论
          async comment(weeklycon) {
            let comment = {};
            comment.weeklyconid = weeklycon.id;
            comment.userid = localStorage.getItem('id');
            comment.replyto = weeklycon.user.id;
            comment.content = this.commentVal;
            comment.isdeleted = 1;
            comment.time = new Date();
            comment.parentid = -1;
            let res = await addComment(comment);
            if(res.data.code === 200) {
              if(!weeklycon.commentList) weeklycon.commentList=[];
              weeklycon.commentList.push(res.data.data.body);
              this.commentVal = '';
              notice(this, '评论成功', 'success');
            } else {
              notice(this, '评论失败', 'error');
            }
          },
        },
        watch: {
            async $route() {
                this.$nextTick(function () {
                    let id = this.$route.params.moduleId
                    if (this.$route.path.indexOf("/history/") != -1) {
                        app.activeIntf = 'history'
                        this.$refs.intfTrees.setCurrentKey(id);
                    }
                    if (this.$route.path.indexOf("/intf/") != -1) {
                        app.activeIntf = 'intf'
                        this.$refs.intfTree.setCurrentKey(id == 'all' || !id ? 0 : id);
                    }
                })
            }
        },
        async mounted() {
            let pid = this.$route.query.pid;
            let res = await getProjectByPid({
              pid: pid,
            })
            if(res.data.code === 200) {
              this.projectName = res.data.data.body.name;
            }
            let app = this
            //模块列表
            await this.getModuleList();
            this.$nextTick(function () {
                let id = this.$route.params.moduleId
                if (this.$route.path.indexOf("/history/") != -1) {
                    app.activeIntf = 'history'
                    this.$refs.intfTrees.setCurrentKey(id);
                }
                if (this.$route.path.indexOf("/intf/") != -1) {
                    app.activeIntf = 'intf'
                    this.$refs.intfTree.setCurrentKey(id == 'all' || !id ? 0 : id);
                }
            })
        }
    }
</script>

<style>

  #intfTabs .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
  }

  .drop {
    left: 348px !important;
  }

  .drops {
    left: 334px !important;
    top: 230px;
  }
</style>

<style lang="less" scoped>

  #intfTabs /deep/ .el-tabs__nav-scroll{
    display: flex;
    justify-content: center;
  }

  /deep/ .addEnvir span {
    text-decoration: underline;
  }

  /deep/ .el-form-item__content {
    display: flex;
    flex-wrap: wrap;
  }

  .addBtn, .rmBtn {
    font-size: 18px;
  }

  .rmBtn {
    color: red;
  }

  .environment_rh {
    min-height: 530px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px 0px;
    border: 1px solid #bbbbbb;
    background-color: white;
    border-radius: 8px;
    width: 870px;
    margin-left: 30px;
    padding: 15px;
    text-align: left;

    /deep/ .el-form {
      margin: 20px 0 0 30px;

      .el-form-item__label {
        width: 100px;
        text-align: right;
      }
    }

    .rh_head {
      border-bottom: 1px solid #c3c3c3;
      padding-bottom: 10px;
      margin-bottom: 0;
    }
  }

  #menu /deep/ {
    .is-active {
      background-color: #66B1FF;
      color: white;
    }

    .el-menu-item {
      text-align: left;
      width: 101%;
    }
  }

  /deep/ .el-tree-node__loading-icon {
    display: none;
  }

  /deep/ #history {
    .el-tree-node__children {
      .el-tree-node__content {
        padding-left: 40px !important;
      }
    }

    .el-tree-node__content {
      padding-left: 20px !important;
    }

    .el-tree-node__expand-icon {
      padding: 0;
    }

    .el-tree-node__expand-icon:before, .el-icon-caret-right:before {
      content: "" !important;
      display: none;
    }
  }

  /deep/ .iconfont {
    font-size: 14px;
  }

  //dialog
  /deep/ .el-dialog__body {
    display: none;
  }

  /*/deep/ .el-drawer.ltr, .el-drawer.rtl, .el-drawer__container{*/
  /*  top: 216px;*/
  /*  height: 66%;*/
  /*}*/

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

  #a /deep/ .el-tabs, .environment {
    min-height: 530px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px 0px;
    border: 1px solid #bbbbbb;
    width: 250px;
    background-color: white;
    border-radius: 8px;
    margin-left: 20px;
    box-sizing: inherit;
    overflow: hidden;

    .environment_hd {
      height: 90px;
      background-color: #F0F0F0;
      line-height: 90px;
      letter-spacing: 2px;
      font-weight: bold
    }

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
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px 0px;


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
          /*transform: translateX(190%) !important;*/
        }
      }
    }

    .weekly {
      /*height: 550px;*/
      position: relative;
      z-index: 1;
      background-color: rgb(247, 247, 247);
      margin: 0 20px 10px 20px;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px 0px;
      border-radius: 10px;

      .header {
        margin: 0 20px;
        padding: 30px 0 10px 0;
        border-bottom: 1px solid rgb(217, 217, 217);
        display: flex;
        justify-content: space-between;

        .info {
          color: rgb(24, 144, 255);
          margin-left: 40px;
          cursor: pointer;
        }

        .add {
          margin-right: 40px;
          cursor: pointer;

          i {
            font-size: 16px;
          }
        }

        .add:hover {
          color: rgb(24, 144, 255);
        }
      }

      .list.main {
        margin: 10px 40px;
        display: flex;
        /*height: 470px;*/
        clear: both;

        .left {
          flex: 6;
          background-color: #fff;
          border: 1px solid rgb(215, 215, 215);
          border-radius: 0 45% 0 0;
          padding: 10px;
          height: 500px;
          overflow-y: scroll;

          .content {
            width: 60%;
            border: 1px solid rgb(219, 219, 219);
            border-radius: 10px;
            padding: 15px;

            .week {
              padding-bottom: 20px;
              border-bottom: 1px solid rgb(215, 215, 215);

              .head {
                display: flex;
                align-items: center;

                .logo {
                  display: flex;
                  align-items: center;

                  img {
                    width: 35px;
                    height: 35px;
                  }
                }

                .info {
                  .user {
                    font-weight: 700;
                    color: rgb(16, 16, 16);
                    text-align: left;
                    padding: 10px 0 10px 10px;
                  }

                  .date {
                    font-size: 10px;
                    color: rgb(189, 189, 189);
                    padding: 0 0 10px 10px;
                  }
                }
              }

              .modul, .progress {
                text-align: left;
                margin-left: 45px;
                font-size: 15px;
                font-weight: 700;
                color: rgb(16, 16, 16);
                padding: 0 0 10px 0;

                span {
                  font-weight: 400;
                }
              }

              .assignment {
                display: flex;

                .ass_left {
                  text-align: left;
                  margin-right: 18px;

                  i {
                    font-size: 25px;
                  }
                }

                .ass_right {
                  .ass_right_header {
                    font-size: 15px;
                    font-weight: 700;
                    color: rgb(16, 16, 16);
                    text-align: left;
                  }

                  .ass_right_desc {
                    font-size: 12px;
                    padding: 10px 100px 0 0;
                    text-align: left;
                    line-height: 16px;
                  }
                }
              }
            }

            .comment {
              .comment_item {
                display: flex;
                margin-bottom: 10px;

                .item_left {
                  padding: 10px 10px 10px 5px;

                  img {
                    width: 23px;
                    height: 23px;
                  }
                }

                .item_right {
                  .item_right_name {
                    padding-top: 10px;
                    text-align: left;
                    font-weight: 700;
                    color: rgb(16, 16, 16);
                  }

                  .item_right_content {
                    padding: 10px 0;
                    text-align: left;
                  }

                  .item_right_footer {
                    font-size: 13px;
                    text-align: left;
                    span {
                      margin-right: 10px;
                      color: rgb(116, 116, 116);
                    }

                    span.reply, span.delete {
                      cursor: pointer;
                    }
                  }
                }
              }
            }

            .comment_input_container {
              margin-top: 15px;
              width: 100%;

              .comment_input {
                border: none;
                border: 1px solid rgb(195, 195, 195);
                padding: 10px;
                padding-left: 20px;
                border-radius: 20px;
                width: 73%;
                outline: 0;
              }
            }
          }

          .more {
            width: 60%;
            text-align: left;

            .more_content {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 90%;
              margin: 5px auto;
              padding: 10px 0;
              background-color: rgb(252, 252, 252);
              cursor: pointer;
              border-radius: 5px;
            }

            .more_content:hover {
              background-color: rgb(247, 247, 247);
            }
          }
        }

        .right {
          flex: 4;
          margin-left: 10px;
          background-color: #fff;
          border: 1px solid rgb(215, 215, 215);
          padding: 30px 10px;
          text-align: center;
        }
      }

      .write.main {
        margin: 10px 40px;
        height: 600px;
        background-color: #fff;
        border: 1px solid rgb(200, 200, 200);

        .write_wrapper {
          display: flex;
          padding: 20px;
          flex-wrap: wrap;
          height: 500px;
          overflow: hidden;

          .write_item {
            cursor: pointer;
            padding: 20px 50px 20px 20px;
            box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px 0px;
            border-radius: 5px;
            margin: 29px;
            height: 100px;
            width: 200px;
            text-align: left;

            .week {
              font-weight: 700;
              color: rgb(16, 16, 16);
              padding-bottom: 10px;
            }

            .date {
              color: rgb(130, 130, 130);
              line-height: 20px;
            }
          }

          .write_item:hover {
            transform: translate(2px, 2px);
          }

          .write_item.yellow {
            border-top: 3px solid rgb(250, 194, 0);
          }

          .write_item.blue {
            border-top: 3px solid rgb(151, 179, 206);
          }

          .write_item.grey {
            border-top: 3px solid rgb(214, 215, 217);
          }
        }

        .add_weekly_wrapper {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;

          .add_weekly {
            display: flex;
            font-size: 16px;
            align-items: center;
            padding: 10px;
            background-color: rgb(250, 194, 0);
            color: #FFFFFF;
            cursor: pointer;

            i {
              font-size: 20px;
              margin-right: 5px;
            }
          }

          .add_weekly:hover {
            background-color: rgb(250, 176, 33);
          }
        }
      }

      .mantle {
        position: absolute;
        left: 0;
        top: 70px;
        right: 0;
        bottom: 1px;
        z-index: 100;
      }

      .cover {
        position: absolute;
        background-color: #FFFFFF;
        border: 1px solid rgb(212, 212, 212);
        z-index: 999999;
      }

      .cover_left {
        bottom: 1px;
        left: -20px;
        top: 71px;
        width: 0;
        border-left: none;
        box-shadow: rgba(0, 0, 0, .15) 10px 0px 6px 0px;
      }

      .cover_right {
        bottom: 1px;
        right: -20px;
        top: 71px;
        width: 80%;
        border-right: none;
        box-shadow: rgba(0, 0, 0, .15) -10px 0px 6px 0px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .c_r_header {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .c_r_h_left {
            display: flex;
            align-items: center;

            .mine {
              font-size: 18px;
              color: rgb(16, 16, 16);
              margin-right: 20px;
            }

            .time {
              font-size: 13px;
              color: rgb(130, 130, 130);
            }
          }

          .c_r_h_right {
            display: flex;
            align-items: center;

            span {
              font-size: 14px;
              margin-right: 10px;
            }

            span:hover {
              cursor: pointer;
              color: rgb(230, 162, 60);
            }
          }

          margin-bottom: 20px;
        }

        .c_r_main {

        }

        .c_r_footer {
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
      width: 120px;
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

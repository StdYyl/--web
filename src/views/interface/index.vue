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

                <!--历史记录-->
                <el-tab-pane label="历史记录">
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
                    @node-click="nodeClick"
                    :props="defaultProps"
                    :filter-node-method="searchIntf"
                    :highlight-current='true'
                    accordion
                    ref="tree"
                    :expand-on-click-node="isShowMore">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <div v-if="data.isIntf">
                         <span class='custom-tree-node'>
                           <strong style='width:50px;text-align: left;font-size:12px;color:#66B1FF'>{{data.method.toUpperCase()}}</strong>
                           <span class='folder_name'> {{node.label}} </span>
                           <span class='el-icon-delete-solid' @click=deleteIntf(data)></span>
                         </span>
                      </div>
                      <span v-else class='custom-tree-node'>
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
                <div class="content">
                  <div class="week">
                    <div class="head">
                      <div class="logo">
                        <img src="../../assets/image/common/head.png" alt="">
                      </div>
                      <div class="info">
                        <div class="user">yyl123的周报</div>
                        <div class="date">2020年10月12日 15:30</div>
                      </div>
                    </div>
                    <div class="modul">
                      当前模块：<span>T1</span>
                    </div>
                    <div class="progress">
                      完成进度：<span>50%</span>
                    </div>
                    <div class="assignment">
                      <div class="ass_left">
                        <i class="icon iconfont icon-gongneng1"></i>
                      </div>
                      <div class="ass_right">
                        <div class="ass_right_header">本周任务完成情况:</div>
                        <div class="ass_right_desc">
                          除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。
                          除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="comment">
                    <div class="comment_item">
                      <div class="item_left">
                        <img src="../../assets/image/common/head.png" alt="">
                      </div>
                      <div class="item_right">
                        <div class="item_right_name">雨落</div>
                        <div class="item_right_content">啦啦啦啦啦啦！！！</div>
                        <div class="item_right_footer">
                          <span class="date">今天18:52</span>
                          <span class="reply">回复</span>
                          <span class="delete">删除</span>
                        </div>
                      </div>
                    </div>
                    <div class="comment_item">
                      <div class="item_left">
                        <img src="../../assets/image/common/head.png" alt="">
                      </div>
                      <div class="item_right">
                        <div class="item_right_name">雨落</div>
                        <div class="item_right_content">啦啦啦啦啦啦！！！</div>
                        <div class="item_right_footer">
                          <span class="date">今天18:52</span>
                          <span class="reply">回复</span>
                          <span class="delete">删除</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="comment_input_container">
                    <input type="text" class="comment_input" v-model="commentVal" placeholder="评论yyl123的周报"/>
                  </div>
                </div>
                <div class="more">
                  <div class="more_content">
                    <i class="el-icon-refresh"></i>
                    点击加载更多
                  </div>
                </div>
              </div>
              <div class="right">
                <div id="myChart" style="width: 400px;height: 400px;"></div>
              </div>
            </div>
            <div class="main write" v-show="weeklyFlag==2?true:false">
              <div class="write_wrapper">
                <div class="write_item yellow" @click="right_drawer=true">
                  <div class="week">
                    本周（第3周）
                  </div>
                  <div class="date">
                    01.18-01.24
                  </div>
                </div>
                <div class="write_item blue" @click="right_drawer=true">
                  <div class="week">
                    第 2 周
                  </div>
                  <div class="date">
                    01.11-01.17
                  </div>
                </div>
                <div class="write_item" @click="right_drawer=true">
                  <div class="week">
                    第 1 周
                  </div>
                  <div class="date">
                    01.04-01.10
                  </div>
                </div>
                <div class="write_item" @click="right_drawer=true">
                  <div class="week">
                    第 1 周
                  </div>
                  <div class="date">
                    01.04-01.10
                  </div>
                </div>
                <div class="write_item" @click="right_drawer=true">
                  <div class="week">
                    第 1 周
                  </div>
                  <div class="date">
                    01.04-01.10
                  </div>
                </div>
                <div class="write_item" @click="right_drawer=true">
                  <div class="week">
                    第 1 周
                  </div>
                  <div class="date">
                    01.04-01.10
                  </div>
                </div>
                <div class="write_item">
                  <div class="week">
                    第 1 周
                  </div>
                  <div class="date">
                    01.04-01.10
                  </div>
                </div>
                <div class="write_item">
                  <div class="week">
                    第 1 周
                  </div>
                  <div class="date">
                    01.04-01.10
                  </div>
                </div>
                <div class="write_item">
                  <div class="week">
                    第 1 周
                  </div>
                  <div class="date">
                    01.04-01.10
                  </div>
                </div>
                <div class="write_item">
                  <div class="week">
                    第 1 周
                  </div>
                  <div class="date">
                    01.04-01.10
                  </div>
                </div>
                <div class="write_item">
                  <div class="week">
                    第 1 周
                  </div>
                  <div class="date">
                    01.04-01.10
                  </div>
                </div>
              </div>
              <div class="add_weekly_wrapper">
                <div class="add_weekly">
                  <i class="el-icon-plus"></i>
                  写周报
                </div>
              </div>
              <div class="mantle" v-show="right_drawer" @click="right_drawer=false"></div>
              <div class="cover cover_left">
              </div>
              <transition>
                <div class="cover cover_right animate__animated animate__slideInRight" v-show="right_drawer">
                  <div>
                    <div class="c_r_header">
                      <div class="c_r_h_left">
                        <span class="mine">我的周报</span>
                        <span class="time">2021.01.18-2021.01.24</span>
                      </div>
                      <div class="c_r_h_right">
                        <span>是否开启实时预览</span>
                        <el-switch
                          v-model="isRealTimePreview"
                          active-color="rgb(86,119,252)"
                          inactive-color="rgb(167,165,166)">
                        </el-switch>
                      </div>
                    </div>
                    <div class="c_r_main">
                      <MarkdownPro
                        v-model="weeklyText"
                        :height="400"
                        theme="light"
                      />
                    </div>
                  </div>
                  <div class="c_r_footer">
                    <el-button type="primary" style="padding: 8px 20px; font-size: 16px">保存</el-button>
                    <el-button type="default" style="padding: 8px 20px; font-size: 16px">预览</el-button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
<!--          <el-drawer-->
<!--            title="我是标题"-->
<!--            :visible.sync="right_drawer"-->
<!--            direction="rtl"-->
<!--            :before-close="handleCloseRight"-->
<!--            :modal="false"-->
<!--            size="45%">-->
<!--            <span>我来啦!</span>-->
<!--          </el-drawer>-->
        </el-tab-pane>

        <!--环境设置-->
        <el-tab-pane label="环境设置" name="environment">环境设置</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    import {MarkdownPreview, MarkdownPro} from 'vue-meditor'
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
                activeName: 'interface',
                projectName: "软件测试项目",
                isShowMore: true,
                //历史记录
                historyData: [
                    {
                        id: 1,
                        label: "2020年11月",
                        children: [
                            {id: 3, label: "用户名修改", isIntf: true, method: 'put'},
                        ],
                    },
                    {
                        id: 3,
                        label: "2020年10月",
                    },
                    {
                        id: 4,
                        label: "2020年9月",
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
                commentVal: '',
                weeklyFlag: 1,
                right_drawer: false,
                left_drawer: false,
                isRealTimePreview: false,
                weeklyText: '周报填写',
            }
        },
        components: {
          MarkdownPreview,
          MarkdownPro
        },
        methods: {
            nodeClick(e) {
                if (e.id != 0)
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

                if (command.index == 'one') {
                    this.$router.push("./AddIntf")
                    return;
                }
                if (command.index == 'some') {
                    this.$router.push("./ExportIntf")
                    return;
                }
                if (command.data) this.moduleMes = command.data
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
            writeWeekly() {
              //写周报
              this.weeklyFlag=2;
            },
            handleCloseRight() {
              this.$confirm('确认关闭？')
                .then(_ => {
                  this.right_drawer = false;
                })
                .catch(_ => {});
            },
            changeBar() {
              this.weeklyFlag=1;
            },
            drawLine() {
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
                  data: ['响应成功数量', '新增用例数', '接口调用次数', '新建接口数', '待定XX数量']
                },
                series: [{
                  name: '数量',
                  type: 'bar',
                  data: [57, 38, 47, 34, 46],
                  barWidth: 25,
                  itemStyle: {
                    normal: {
                      color: function(params) {
                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                        var colorList = ['#52C41A', '#FF4D4F', '#52C41A', '#FF4D4F', '#52C41A'];
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                }]
              });
            }
        },
        mounted() {
          document.getElementById('xxx').getElementsByTagName('div')[0].className = 'el-tree-node is-current is-focusable';
          this.drawLine();
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

    .weekly {
      /*height: 550px;*/
      position: relative;
      z-index: 1;
      background-color: rgb(247,247,247);
      margin: 0 20px 10px 20px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px 0px;
      border-radius: 10px;
      .header {
        margin: 0 20px;
        padding: 30px 0 10px 0;
        border-bottom: 1px solid rgb(217,217,217);
        display: flex;
        justify-content: space-between;
        .info {
          color: rgb(24,144,255);
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
          color: rgb(24,144,255);
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
          border: 1px solid rgb(215,215,215);
          border-radius: 0 45% 0 0;
          padding: 10px;
          .content {
            width: 60%;
            border: 1px solid rgb(219,219,219);
            height: 92%;
            border-radius: 10px;
            padding: 15px;
            .week {
              padding-bottom: 20px;
              border-bottom: 1px solid rgb(215,215,215);
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
                    color: rgb(16,16,16);
                    text-align: left;
                    padding: 10px 0 10px 10px;
                  }
                  .date {
                    font-size: 10px;
                    color: rgb(189,189,189);
                    padding: 0 0 10px 10px;
                  }
                }
              }
              .modul, .progress {
                text-align: left;
                margin-left: 45px;
                font-size: 15px;
                font-weight: 700;
                color: rgb(16,16,16);
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
                    color: rgb(16,16,16);
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
                    color: rgb(16,16,16);
                  }
                  .item_right_content {
                    padding: 10px 0;
                  }
                  .item_right_footer {
                    font-size: 13px;
                    span {
                      margin-right: 10px;
                      color: rgb(116,116,116);
                    }
                    span.reply,span.delete {
                      cursor: pointer;
                    }
                  }
                }
              }
            }
            .comment_input_container {
              width: 100%;
              .comment_input {
                border: none;
                border: 1px solid rgb(195,195,195);
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
              background-color: rgb(252,252,252);
              cursor: pointer;
              border-radius: 5px;
            }
            .more_content:hover {
              background-color: rgb(247,247,247);
            }
          }
        }

        .right {
          flex: 4;
          margin-left: 10px;
          background-color: #fff;
          border: 1px solid rgb(215,215,215);
          padding: 30px 10px;
          text-align: center;
        }
      }

      .write.main {
        margin: 10px 40px;
        height: 600px;
        background-color: #fff;
        border: 1px solid rgb(200,200,200);
        .write_wrapper {
          display: flex;
          padding: 20px;
          flex-wrap: wrap;
          height: 500px;
          overflow: hidden;
          .write_item {
            cursor: pointer;
            padding: 20px 50px 20px 20px;
            box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px 0px;
            border-radius: 5px;
            margin: 29px;
            height: 100px;
            width: 200px;
            text-align: left;
            .week {
              font-weight: 700;
              color: rgb(16,16,16);
              padding-bottom: 10px;
            }
            .date {
              color: rgb(130,130,130);
              line-height: 20px;
            }
          }
          .write_item:hover {
            transform: translate(2px, 2px);
          }
          .write_item.yellow {
            border-top: 3px solid rgb(250,194,0);
          }
          .write_item.blue {
            border-top: 3px solid rgb(151,179,206);
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
            background-color: rgb(250,194,0);
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
        border: 1px solid rgb(212,212,212);
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
              color: rgb(16,16,16);
              margin-right: 20px;
            }
            .time {
              font-size: 13px;
              color: rgb(130,130,130);
            }
          }
          .c_r_h_right {
            display: flex;
            align-items: center;
            span {
              font-size: 14px;
              margin-right: 10px;
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

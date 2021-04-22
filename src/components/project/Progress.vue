<template>
  <div class="set" id="bd">
    <el-page-header @back="goBack" content="进度管理"></el-page-header>
    <el-tabs tab-position="left" style="" class="tabsH">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-warning-outline"></i> 接口归档</span>
        <div class="itfFL">
          <div class="title">
            <span>接口归档列表</span>
          </div>
          <div class="main">
            <div class="title">
              <div class="classification">接口分类</div>
              <div class="level">分类级别</div>
              <div class="number">分类下接口数量</div>
              <div class="date">归档时间</div>
            </div>
            <div class="data_item" v-for="item in moduleList" :key="item.id">
              <div class="classification">{{item.classification}}</div>
              <div class="level">{{item.level}}</div>
              <div class="number">{{item.number}}</div>
              <div class="date">{{item.date}}</div>
            </div>
            <div style="padding-top: 20px;text-align: right;">
              <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
          </div>
          <div class="footer">
            <div class="total">
              一共有
              <el-input-number v-model="interface.total_number" :min="0" :max="1000" label="接口总数"
                               size="small" style="margin-left: 20px" disabled></el-input-number>
              接口
            </div>
            <div class="archived">
              已归档
              <el-input-number v-model="interface.archived_number" :min="0" :max="1000" label="已归档接口数"
                               size="small" style="margin-left: 20px" disabled></el-input-number>
              接口
            </div>
            <div class="progress">
              <div>完成进度</div>
              <el-progress :percentage="interface.completed_percentage" style="width: 300px"></el-progress>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="周报汇报">
        <span slot="label"><i class="iconfont icon-zhoubao"></i> 周报汇报</span>
        <div class="weeklyReport">
          <div class="title">
            <div class="left">周报情况</div>
            <div class="right">
              <el-select v-model="submitter" placeholder="请选择" size="small"
                style="width: 150px; margin-right: 20px;color: rgb(154,164,176);" @change="changeUser()">
                <el-option
                  v-for="item in submitterList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              的周报
            </div>
          </div>
          <div class="main">
            <el-timeline>
              <el-timeline-item :timestamp="item.showTime" placement="top" v-for="item in weeklyconList" :key="item.id">
                <el-card>
                  <div class="card">
                    <div class="info">
                      <img :src="item.user.head" alt="">
                      <span>{{item.user.name}}</span>
                    </div>
                    <div class="module">
                      当前模块：
                      <span style="margin: 0 5px;" v-for="m in item.moduleList">{{m}}</span>
                    </div>
                    <div class="progress">
                      完成进度：
                      <span style="margin: 0 5px;" v-for="p in item.progressList">{{p}}</span>
                    </div>
                    <div class="desc">
                      <i class="icon iconfont icon-gongneng1"></i>
                      <div class="content">
                        <div class="title">本周任务完成情况</div>
                        <div class="context">{{item.complete}}</div>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
            <div class="footer">
              <div class="more" @click="getMore">
                <i class="el-icon-refresh"></i>
                点击加载更多
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import {getInterfaceListByExample} from "../../api/interface";
    import {getDirectoryPageByPid} from "../../api/directory";
    import {findUserListByPid} from "../../api/projectanduser";
    import {listWeeklyCon} from "../../api/weeklycon";
    import {notice} from "../../utils/elementUtils";
    import moment from 'moment';

    export default {
      name: "setting",
      data() {
        return {
          //项目id
          projectId: null,
          //接口
          interface:{
            total_number: null,
            archived_number: null,
            completed_percentage: 0,
          },
          moduleList: [],
          //接口归档的分页参数
          currentPage: 1,
          pageSize: 5,
          total: 0,
          //周报汇报的参数
          current: 1,
          size: 3,
          submitter: null,
          submitterList: [
            {
              id: null,
              name: '全部',
            }
          ],
          //周报列表
          weeklyconList: [],
        }
      },
      methods: {
        goBack() {
          this.$router.go(-1)
        },
        //设置tabs的高度
        setHeight() {
            let h = document.getElementById("bg").style.height
            return `height:${h}`
            console.log(h)
        },
        //当前页码改变时出发事件
        handleCurrentChange() {
          this.listDirectoryByPage();
        },
        //获取全部接口列表
        async listTotalInterface() {
          let project = {};
          project.id = this.projectId;
          let res = await getInterfaceListByExample(project);
          if(res.data.code === 200) {
            this.interface.total_number = res.data.data.total;
          }
        },
        //获取已归档的接口列表
        async listArchivedInterface() {
          let project = {};
          project.id = this.projectId;
          project.status = 3;
          let res = await getInterfaceListByExample(project);
          if(res.data.code === 200) {
            this.interface.archived_number = res.data.data.total;
          }
        },
        //分页查询目录列表以及对应目录下的接口
        async listDirectoryByPage() {
          let res = await getDirectoryPageByPid({
            current: this.currentPage,
            size: this.pageSize,
            pid: this.projectId,
          });
          if(res.data.code === 200) {
            if(res.data.data.total>0) {
              let module = {};
              res.data.data.list.forEach((item) => {
                module = item;
                module.classification = item.name;
                if(item.parentid==-1) {
                  module.level = '一级目录';
                } else {
                  module.level = '二级目录';
                }
                module.number = item.interfaceList?item.interfaceList.length:0;
                let date = new Date(item.updatetime);
                module.date = date.getUTCFullYear()+'-'+(date.getUTCMonth()+1)+'-'+date.getUTCDate()
                  +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
                this.moduleList.push(module);
              })
              this.total = res.data.data.total;
            }
          }
        },
        async listUsersByPid() {
          this.submitterList = [{
            id: null,
            name: '全部',
          }];
          let res = await findUserListByPid({
            pid: this.projectId,
          });
          if(res.data.code === 200) {
            res.data.data.list.forEach((item) => {
              this.submitterList.push({
                id: item.id,
                name: item.name,
              });
            });
          }
        },
        changeUser() {
          this.current=1;
          console.log(this.submitter);
          this.weeklyconList = [];
          this.getWeeklyConList(this.current, this.size);
        },
        async getWeeklyConList(current, size) {
          let res = await listWeeklyCon({
            current: current,
            size: size,
            pid: this.$route.params.id,
            uid: this.submitter,
          });
          if (res.data.code === 200) {
            if (res.data.data.total > 0) {
              res.data.data.list.forEach((item) => {
                let weeklycon = item;
                let showTime = item.updatetime ?
                  moment(item.updatetime).format('YYYY年MM月DD日 HH:MM') : moment(item.addtiome).format('YYYY年MM月DD日 HH:MM');
                weeklycon.showTime = showTime+'（第'+item.weekly.weeks+'周）';
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
          }
          console.log(this.weeklyconList);
        },
        getMore() {
          this.getWeeklyConList(++this.current, this.size);
        },
      },
      mounted() {
        let pid = this.$route.params.id;
        if(pid) {
          this.projectId = pid;
        }
        this.listTotalInterface();
        this.listArchivedInterface();
        this.listDirectoryByPage();
        if(this.interface.total_number) {
          this.interface.completed_percentage = parseFloat((100*this.interface.archived_number/this.interface.total_number).toFixed(2));
        }
        this.listUsersByPid();
        this.getWeeklyConList(this.current, this.size);
      }
    }
</script>

<style lang="less" scoped>

  .itfFL {
    padding: 30px;
    display: flex;
    flex-direction: column;
    .title {
      text-align: left;
      margin: 10px 0;
      span {
        padding: 10px 0;
        border-bottom: 1px solid rgb(232,232,232);
      }
    }
    .main {
      .title {
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(232,232,232);
        .date {
          width: 150px;
          text-align: right;
        }
        .classification {
          width: 150px;
          text-align: left;
        }
        .level, .number {
          padding: 10px 0;
          flex: 1;
          text-align: center;
        }
      }
      .data_item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(232,232,232);
        color: rgb(132, 132, 132);
        font-size: 13px;
        .date {
          width: 150px;
          text-align: right;
        }
        .classification {
          width: 150px;
          text-align: left;
        }
        .level,.number {
          padding: 10px 0;
          flex: 1;
          text-align: center;
        }
      }
    }
    .footer {
      margin-top: 20px;
      .total {
        text-align: left;
        margin: 20px 0;
      }
      .archived {
        text-align: left;
      }
      .progress {
        margin-top: 20px;
        padding-bottom: 20px;
        display: flex;
      }
      .btn {
        text-align: right;
        padding: 20px;
        .assure {
          padding: 10px 20px;
        }
      }
    }
  }

  .weeklyReport {
    padding: 30px;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        padding: 10px 0;
        border-bottom: 1px solid rgb(213,213,213);
      }
      .right {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: rgb(154,164,176);
      }
    }
    .main {
      padding: 20px 30px;
      .card {
        .info {
          text-align: left;
          display: flex;
          align-items: center;
          img {
            width: 30px;
            height: 30px;
          }
          span {
            margin-left: 10px;
            font-size: 13px;
          }
        }
        .module {
          text-align: left;
          font-size: 13px;
          padding: 5px 0 5px 5px;
        }
        .progress {
          text-align: left;
          font-size: 13px;
          padding: 0px 0 5px 5px;
        }
        .desc {
          text-align: left;
          font-size: 13px;
          padding: 5px 0 5px 5px;
          display: flex;
          i {
            font-size: 24px;
          }
          .content {
            .title {
              padding: 5px;
            }
            .context {
              padding-left: 5px;
              font-size: 10px;
              color: rgb(186,164,153);
            }
          }
        }
      }
    }
    .footer {
      padding: 20px 30px;
      .more {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        background-color: rgb(252, 252, 252);
        cursor: pointer;
        border-radius: 5px;
      }
      .more:hover {
        background-color: rgb(247, 247, 247);
      }
    }
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


</style>

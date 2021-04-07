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
            <div class="data_item" v-for="item in interfaceList" :key="item.id">
              <div class="classification">{{item.classification}}</div>
              <div class="level">{{item.level}}</div>
              <div class="number">{{item.number}}</div>
              <div class="date">{{item.date}}</div>
            </div>
          </div>
          <div class="footer">
            <div class="total">
              一共有
              <el-input-number v-model="interface.total_number" @change="handleChangeTotal" :min="1" :max="10" label="接口总数"
                               size="small" style="margin-left: 20px" disabled></el-input-number>
              接口
            </div>
            <div class="archived">
              已归档
              <el-input-number v-model="interface.archived_number" @change="handleChangeArchived" :min="1" :max="10" label="已归档接口数"
                               size="small" style="margin-left: 20px" disabled></el-input-number>
              接口
            </div>
            <div class="progress">
              <div>完成进度</div>
              <el-progress :percentage="50" style="width: 300px"></el-progress>
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
              <el-select v-model="submitter.name" placeholder="请选择" size="small"
                style="width: 150px; margin-right: 20px;color: rgb(154,164,176);">
                <el-option
                  v-for="item in submitterList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              的周报
            </div>
          </div>
          <div class="main">
            <el-timeline>
              <el-timeline-item timestamp="2018-4-12" placement="top">
                <el-card>
                  <div class="card">
                    <div class="info">
                      <img src="../../assets/image/common/head.png" alt="">
                      <span>yyl123</span>
                    </div>
                    <div class="module">
                      当前模块：T1
                    </div>
                    <div class="progress">
                      完成进度：10%
                    </div>
                    <div class="desc">
                      <i class="icon iconfont icon-gongneng1"></i>
                      <div class="content">
                        <div class="title">本周任务完成情况</div>
                        <div class="context">除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。</div>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018-4-3" placement="top">
                <el-card>
                  <div class="card">
                    <div class="info">
                      <img src="../../assets/image/common/head.png" alt="">
                      <span>yyl123</span>
                    </div>
                    <div class="module">
                      当前模块：T1
                    </div>
                    <div class="progress">
                      完成进度：10%
                    </div>
                    <div class="desc">
                      <i class="icon iconfont icon-gongneng1"></i>
                      <div class="content">
                        <div class="title">本周任务完成情况</div>
                        <div class="context">除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。</div>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018-4-2" placement="top">
                <el-card>
                  <div class="card">
                    <div class="info">
                      <img src="../../assets/image/common/head.png" alt="">
                      <span>yyl123</span>
                    </div>
                    <div class="module">
                      当前模块：T1
                    </div>
                    <div class="progress">
                      完成进度：10%
                    </div>
                    <div class="desc">
                      <i class="icon iconfont icon-gongneng1"></i>
                      <div class="content">
                        <div class="title">本周任务完成情况</div>
                        <div class="context">除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。除细节外，基本处理完成。</div>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
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
                //接口
                interface:{
                  total_number: 5,
                  archived_number: 5,
                },
                interfaceList: [
                {
                  id: 1,
                  classification: '商户管理',
                  level: '一级分类',
                  number: 12,
                  date: '2021-3-13'
                },
                {
                  id: 2,
                  classification: '商户管理',
                  level: '二级分类',
                  number: 12,
                  date: '2021-3-13'
                },
                {
                  id: 3,
                  classification: '商户管理',
                  level: '一级分类',
                  number: 12,
                  date: '2021-3-13'
                },
                {
                  id: 4,
                  classification: '商户管理',
                  level: '二级分类',
                  number: 12,
                  date: '2021-3-13'
                },
                {
                  id: 5,
                  classification: '商户管理',
                  level: '一级分类',
                  number: 12,
                  date: '2021-3-13'
                }
              ],
                submitter: {
                  name: 'yyl123',
                },
                submitterList: [
                  {
                    id: 1,
                    name: 'yyl123',
                  },
                  {
                    id: 2,
                    name: 'yuluo1',
                  },
                  {
                    id: 3,
                    name: 'lalala',
                  }
                ]
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
            handleChangeTotal() {
              console.log(this.interface.total_number)
            },
            handleChangeArchived() {

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

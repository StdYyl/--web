<template>
  <div class="main">
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--全部项目-->
        <el-tab-pane label="全部项目" name="all">
          <el-table
            :data="allProject"
            :show-header="false"
            :row-style="row_heigh"
            @row-click="activeOne"
            style="width: 100%;font-size: 13px">
            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              width="395">
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
        <el-tab-pane label="已加入" name="in">已加入</el-tab-pane>
        <!--已创建-->
        <el-tab-pane label="已创建" name="create">已创建</el-tab-pane>
        <!--回收站-->
        <el-tab-pane label="回收站" name="recycle">回收站</el-tab-pane>
        <el-button class="new_project" size="small" type="primary" icon="el-icon-plus">创建新项目</el-button>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
        name: "aside",
        data() {
            return {
                activeName: "all",
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
                //当前页码
                currentPage:1,
                //总条数
                totalCount:20,
                //每页展示条数
                pageSize:7,
            }
        },
        methods: {
            handleClick(tab) {
                console.log(tab)
            }
        }
    }
</script>

<style lang="less" scoped>
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

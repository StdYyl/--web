<template>
  <div class="userBg">
    <div class="lf">
      <el-input v-model="searchUser" placeholder="搜索" size="small" style="width: 190px"
                prefix-icon="el-icon-search" @change="changeSearch"></el-input>
      <div style="margin: 15px 15px 15px 30px; text-align: left;font-size: 16px">成员</div>
      <div class="bar">
        <div :class="!selector[0]?'bar_item':'bar_item selected'" @click="changeBar(0)">
          <i class="iconfont icon-tuanduichengyuan"></i>
          所有成员
        </div>
        <div :class="!selector[1]?'bar_item':'bar_item selected'" @click="changeBar(1)">
          <i class="iconfont icon-tuanduichengyuan1"></i>
          团队成员
        </div>
      </div>
    </div>
    <!--所有成员-->
    <div class="rh">
      <div class="rh_head" v-if="selector[0]">
        <h4>所有成员 · {{userCount}}</h4>
      </div>
      <div class="rh_head" v-if="selector[1]">
        <h4>团队成员 · {{memberCount}}</h4>
      </div>
      <el-table
        :data="userList"
        :show-header="true"
        v-loading="loading"
        v-show="selector[0]"
        style="width: 100%;font-size: 13px">
        <el-table-column
          label="头像"
          :show-overflow-tooltip="true"
          width="60"
          align="center">
          <template slot-scope="props">
            <el-image style="width: 20px; height: 20px;vertical-align: middle" :src="props.row.head" fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          :show-overflow-tooltip="true"
          width="60"
          align="center">
          <template slot-scope="props">
            <div style="font-size: 16px;cursor: pointer">{{ props.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="organization"
          label="组织"
          :show-overflow-tooltip="true"
          width="100">
          <template slot-scope="props">
            <div style="font-size: 16px;cursor: pointer">{{ props.row.organization}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="job"
          label="职位"
          :show-overflow-tooltip="true"
          width="100">
          <template slot-scope="props">
            <div style="font-size: 16px;cursor: pointer">{{ props.row.job}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="introduction"
          label="简介"
          :show-overflow-tooltip="true"
          min-width="1">
          <template slot-scope="props">
            <div style="font-size: 16px;cursor: pointer">{{ props.row.introduction}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="注册时间"
          :show-overflow-tooltip="true"
          min-width="1">
          <template slot-scope="props">
            <div style="font-size: 16px;cursor: pointer">
              {{new Date(props.row.createtime).getUTCFullYear()}}-{{new Date(props.row.createtime).getUTCMonth()}}-{{new Date(props.row.createtime).getUTCDate()}}
              {{new Date(props.row.createtime).getHours()}}:{{new Date(props.row.createtime).getMinutes()}}:{{new Date(props.row.createtime).getSeconds()}}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="memberList"
        :show-header="false"
        v-loading="loading"
        v-show="selector[1]"
        style="width: 100%;font-size: 13px">
        <el-table-column
          :show-overflow-tooltip="true"
          width="30">
          <template slot-scope="props">
            <el-image style="width: 20px; height: 20px" :src="props.row.user.head" fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          width="360">
          <template slot-scope="props">
            <div style="font-size: 16px;cursor: pointer">{{ props.row.user.name}}</div>
            <div class="props_value">{{ props.row.user.email}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="projectid"
          :show-overflow-tooltip="true"
          width="360">
          <template slot-scope="props">
            <div style="font-size: 16px;cursor: pointer">属于{{ props.row.project.name}}的{{props.row.user.job}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :show-overflow-tooltip="true"
          align="center">
          <template slot-scope="props">
            <div style="display: flex;align-items: center;justify-content: center" v-if="selector[1]">
              <el-tooltip class="item" effect="dark" content="移除成员" placement="top">
                <div @click="removeMember(props.row)">
                  <el-icon class="iconfont icon-user-remove"></el-icon>
                </div>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--分页，每页最多3条数据-->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import {notice} from '@/utils/elementUtils'
    import Clipboard from 'clipboard'
    import {listUser, listMember, removeMember} from "../../api/user";

    export default {
        name: "index",
        data() {
            return {
                searchUser: '',
                selector: [true, false],
                //是否加载中
                loading: true,
                //全部成员总条数
                userCount: '',
                //团队成员总条数
                memberCount: '',
                selectMember: '',
                //每页展示条数
                pageSize: 5,
                //当前页码
                current: 1,
                //总条数（正常）
                totalCount: 0,
                //成员列表 (isJoin:1未加入，2已加入)
                userList: [],
                memberList: [],
            }
        },
        methods: {
            changeBar(i) {
                this.selector = [false, false];
                this.selector[i] = true;
                this.current=1;
                this.pageSize=5;
                this.searchUser='';
                this.totalCount=0;
                this.userCount = '';
                this.memberCount = '';
                if(i==0) {
                  this.listUser();
                } else {
                  this.listMember();
                }
            },
            //删除成员
            removeMember(e){
                this.$confirm(`是否要删除项目「 ${e.project.name} 」的用户${e.user.name}`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                  let res = await removeMember({
                    userId: e.user.id,
                    projectId: e.project.id,
                  });
                  if(res.data.code == 200) {
                    this.$message({
                      type: 'success',
                      message: '删除成功'
                    })
                    this.listMember()
                  }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            async listUser() {
              let res = await listUser({
                current: this.current,
                size: this.pageSize,
                search: this.searchUser,
              });
              console.log(res);
              if(res.data.code == 200) {
                this.userList = res.data.data.list;
                this.totalCount = res.data.data.total;
                this.userCount = res.data.data.total;
                this.loading = false;
              }
            },
            async listMember() {
              let res = await listMember({
                current: this.current,
                size: this.pageSize,
                search: this.searchUser,
                userId: localStorage.getItem("id"),
              });
              console.log(res);
              if(res.data.code == 200) {
                this.memberList = res.data.data.list;
                this.totalCount = res.data.data.total;
                this.memberCount = res.data.data.total;
                this.loading = false;
              }
            },
            changeSearch() {
              if(this.selector[0]) {
                this.listUser();
              } else {
                this.listMember();
              }
              this.searchUser='';
            },
            handleSizeChange(size) {
              this.pageSize = size;
              if(this.selector[0]) {
                this.listUser();
              } else {
                this.listMember();
              }
            },
            handleCurrentChange(current) {
              this.current = current;
              if(this.selector[0]) {
                this.listUser();
              } else {
                this.listMember();
              }
            },
        },
        async mounted() {
          this.listUser();
        }
    }
</script>

<style lang="less" scoped>
  .userBg {
    width: 1200px;
    display: flex;
    min-height: 550px;
    margin: 20px auto 40px;
    background-color: white;
    border-radius: 8px;
    border: 1px solid rgb(187, 187, 187);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px 0px;

    .lf {
      width: 250px;
      padding: 10px 0;
      margin: 10px 0;
      border-right: 1px solid rgb(195, 195, 195);
      min-height: 550px;

      .bar {
        display: flex;
        flex-direction: column;

        .bar_item {
          cursor: pointer;
          width: 205px;

          i {
            font-size: 20px;
            margin-right: 10px;
          }

          i.user {
            font-size: 16px;
          }

          i.date {
            font-size: 14px;
          }

          display: flex;
          align-items: center;
          padding: 10px 0 10px 40px;
          font-size: 14px;
        }

        .bar_item.selected {
          color: #ffffff;
          background-color: rgb(24, 144, 255);
        }
      }
    }

    .rh {
      width: 100%;
      padding: 20px 30px;
      text-align: left;

      .rh_head {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #c3c3c3;
        padding-bottom: 10px;
        margin-bottom: 0;

        h4 {
          margin-bottom: 0;
        }

        /deep/ .el-button {
          padding-bottom: 0;
          margin-right: 10px;

          span {
            padding-left: 5px;
          }
        }
      }

      /deep/ .icon_y {
        transform: rotate(90deg);
        margin: 0 10px;
        font-size: 20px;
      }

      /deep/ .el-pagination {
        padding: 20px 5px;
        text-align: right;
      }

      /deep/ .el-icon-refresh-left:before {
        font-size: 20px;
        cursor: pointer;
      }
      /deep/.icon-disable:before, .icon-user-remove:before{
        font-size: 18px;
        cursor: pointer;
      }
    }
  }

  /deep/ .el-dialog__body {
    padding-top: 20px;
  }

  /deep/ .el-dialog__header {
    border-bottom: 1px solid #BBBBBB;
  }

  .header-title {
    text-align: left;
  }

  /deep/ .el-icon-warning-outline {
    color: #FAC200;
  }

  /deep/ .el-input-group__append {
    background-color: #1890FF;
    color: white;
    cursor: pointer;
  }
</style>

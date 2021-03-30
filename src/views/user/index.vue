<template>
  <div class="userBg">
    <div class="lf">
      <el-input v-model="searchUser" placeholder="搜索" size="small" style="width: 190px"
                prefix-icon="el-icon-search"></el-input>
      <div style="margin: 15px 15px 15px 30px; text-align: left;font-size: 16px">成员</div>
      <div class="bar">
        <div :class="!selector[0]?'bar_item':'bar_item selected'" @click="changeBar(0)">
          <i class="iconfont icon-tuanduichengyuan"></i>
          所有成员
        </div>
        <div :class="!selector[1]?'bar_item':'bar_item selected'" @click="changeBar(1)">
          <i class="iconfont icon-disable"></i>
          停用成员
        </div>
      </div>
    </div>
    <!--所有成员-->
    <div class="rh">
      <div class="rh_head" v-if="selector[0]">
        <h4>所有成员 · {{memberCount}}</h4>
        <el-button type="text" icon="icon-tianjiayonghu iconfont" @click="inviteMember=true">添加成员</el-button>
      </div>
      <div class="rh_head" v-if="selector[1]">
        <h4>停用成员 · {{stopMemberCount}}</h4>
      </div>
      <el-table
        :data="selector[0] ? memberList : stopMemberList"
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
          width="720">
          <template slot-scope="props">
            <div style="font-size: 16px;cursor: pointer">{{ props.row.name}}</div>
            <div class="props_value">{{ props.row.email}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :show-overflow-tooltip="true"
          align="center">
          <template slot-scope="props">
            <div style="display: flex;align-items: center;justify-content: center" v-if="selector[0]">
              <el-tooltip class="item" effect="dark" content="禁用成员" placement="top">
                <div @click="banMember(props.row)">
                  <el-icon class="iconfont icon-disable"></el-icon>
                </div>
              </el-tooltip>
              <el-icon class="el-icon-minus icon_y"></el-icon>
              <el-tooltip class="item" effect="dark" content="移除成员" placement="top">
                <div @click="removeMember(props.row)">
                  <el-icon class="iconfont icon-user-remove"></el-icon>
                </div>
              </el-tooltip>
            </div>

            <el-tooltip class="item" effect="dark" content="恢复成员" placement="top" v-if="selector[1]">
              <div @click="restoreMember(props.row)">
                <el-icon class="el-icon-refresh-left"></el-icon>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页，每页最多3条数据-->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount">
      </el-pagination>
    </div>

    <!--邀请新成员-->
    <el-dialog title="" :visible.sync="inviteMember" width="400px" class="memberCss">
      <div slot="title" class="header-title">
        <span><i class="el-icon-warning-outline"></i></span>
        <span class="title-age">添加成员</span>
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
        <el-input v-model="invitationLink" disabled>
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
          :show-overflow-tooltip="true" m
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

  </div>
</template>

<script>
    import {notice} from '@/utils/elementUtils'
    import Clipboard from 'clipboard'

    export default {
        name: "index",
        data() {
            return {
                searchUser: '',
                selector: [true, false],
                memberCount: 10,
                stopMemberCount: 5,
                selectMember: '',
                //邀请链接
                invitationLink: 'http://www.baidu.com',
                //链接有效时间
                linkEndTime: '2021年3月23日 18:11',
                //添加成员窗口
                inviteMember: false,
                //邀请链接窗口
                isInvitationLink: false,
                //每页展示条数
                pageSize: 7,
                //总条数（正常）
                totalCount: 10,
                //总条数（禁用）
                totalCountDisable: 10,
                //成员列表 (isJoin:1未加入，2已加入)
                memberList: [
                    {id: 1, name: '张三', head: '/static/img/head.b818068.png', email: '528243772@qq.com', isJoin: 1},
                    {id: 2, name: '李思', head: '/static/img/head.b818068.png', email: '321302997@qq.com', isJoin: 2},
                    {id: 2, name: '李思', head: '/static/img/head.b818068.png', email: '321302997@qq.com', isJoin: 2},
                    {id: 2, name: '李思', head: '/static/img/head.b818068.png', email: '321302997@qq.com', isJoin: 2},
                    {id: 2, name: '李思', head: '/static/img/head.b818068.png', email: '321302997@qq.com', isJoin: 2},
                ],
                stopMemberList: [
                    {id: 1, name: '王五', head: '/static/img/head.b818068.png', email: '528243772@qq.com', isJoin: 1},
                    {id: 2, name: '王五', head: '/static/img/head.b818068.png', email: '321302997@qq.com', isJoin: 2},
                    {id: 3, name: '李思', head: '/static/img/head.b818068.png', email: '321302997@qq.com', isJoin: 2},
                ],
            }
        },
        methods: {
            changeBar(i) {
                this.selector = [false, false];
                this.selector[i] = true;
            },
            //恢复成员
            restoreMember(e){
                this.$confirm(`是否要恢复用户${e.name}`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log('删除')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //删除成员
            removeMember(e){
                this.$confirm(`是否要删除用户${e.name}`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log('删除')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //禁用成员
            banMember(e) {
                this.$confirm(`是否要禁用用户${e.name}`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log('删除')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //生成邀请链接
            InviteMembers() {
                //调用生成邀请链接的接口，（出参：结束时间、链接）
                this.isInvitationLink = true
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

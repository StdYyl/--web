<template>
    <div class="setting">
      <div class="title">
        <div class="info">
          所有日志
          <div class="circle"></div>
          {{total}}
        </div>
        <div class="search">
          <el-input v-model="search" placeholder="查询用户" @change="listUser"></el-input>
        </div>
      </div>
      <div class="divider"></div>
      <div class="main">
        <div class="table">
          <div class="table_item" v-for="item in userList" :key="item.id">
            <div class="left">
              <div class="portrait">
                <img :src="item.head" alt="头像">
              </div>
              <div class="info">
                <div class="name">{{item.name}}</div>
                <div class="email">{{item.email}}</div>
              </div>
            </div>
            <div class="right">
              <div class="disable" @click="disableUser(item.id, item.isdisabled)">
                <i class="iconfont icon-disable" v-if="item.isdisabled==0"></i>
                <i class="el-icon-refresh-left" v-if="item.isdisabled==1"></i>
              </div>
              <div class="divide"></div>
              <div class="remove" @click="removeUser(item.id)">
                <i class="iconfont icon-user-remove"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            background
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
  import {listUser, removeUser, disableUser, cancelDisabled} from "../../api/user";
  import {notice} from "../../utils/elementUtils";

  export default {
    name: "setting",
    data() {
      return {
        loading: true,
        search: '',
        pageSizes: [1,2,3,4,5,6,7,8,9],
        pageSize: 5,
        currentPage: 1,
        total: 0,
        userList: [],
      }
    },
    methods: {
      changeArrow(id) {
        this.tableData.forEach((item) => {
          if(item.id == id) {
            item.open=!item.open;
          }
        })
      },
      handleSizeChange(size) {
        //当每一页条数发生改变时触发
        this.pageSize = size;
        this.listUser();
      },
      handleCurrentChange(current) {
        //当页数发生改变时除法
        this.currentPage=current;
        this.listUser();
      },
      async listUser() {
        let res = await listUser({
          current: this.currentPage,
          size: this.pageSize,
          search: this.search,
        });
        if(res.data.code === 200) {
          this.userList = res.data.data.list;
          this.total = res.data.data.total;
        }
      },
      async disableUser(uid, isdisabled) {
        if(isdisabled==0) {
          this.$confirm('此操作将禁用该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let res = await disableUser({
              uid: uid
            });
            if(res.data.code === 200) {
              notice(this, '禁用成功', 'success');
            } else {
              notice(this, '禁用失败', 'error');
            }
            this.listUser();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消禁用'
            });
          });
        } else {
          let res = await cancelDisabled({
            uid: uid,
          });
          if(res.data.code === 200) {
            notice(this, '撤销禁用成功');
          }
          this.listUser();
        }
      },
      removeUser(uid) {
        this.$confirm('此操作将禁用该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await removeUser({
            uid: uid
          });
          if(res.data.code === 200) {
            notice(this, '移除成功', 'success');
          } else {
            notice(this, '移除失败', 'error');
          }
          this.listUser();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消移除'
          });
        });
      }
    },
    mounted() {
      this.listUser();
    }
  }
</script>

<style scoped lang="less">
  .setting {
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 30px;
    display: flex;
    flex-direction: column;
    .title {
      padding: 10px;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info {
        display: flex;
        align-items: center;
        .circle {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #101010;
          margin: 0 10px;
        }
      }
    }
    .divider {
      border-bottom: 2px solid rgba(195,195,195,0.25);
    }
    .main {
      flex: 1;
      padding: 0 0 10px 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-items: center;
      .table {
        flex: 1;
        width: 100%;
        padding: 0 10px;
        /*overflow: hidden;*/
        .table_item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(195,195,195,.25);
          .left {
            display: flex;
            align-items: center;
            .portrait {
              img {
                width: 40px;
                height: 40px;
              }
              margin-right: 20px;
            }

            .info {
              .name {
                padding: 5px 0;
              }

              .email {
                padding: 5px 0;
              }
            }
          }

          .right {
            display: flex;
            align-items: center;
            .disable {
              cursor: pointer;
              i {
                font-size: 20px;
                color: #C2C2C2;
              }
              i:hover {
                color: #919191;
              }
            }


            .divide {
              border-right: 1px solid rgba(187,187,187,.85);
              height: 28px;
              margin: 0 15px;
            }

            .remove {
              cursor: pointer;
              i {
                font-size: 20px;
                color: #C2C2C2;
              }
              i:hover {
                color: #919191;
              }
            }
          }
        }
      }
      .pagination {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 5px 10px;
        border-top: none;
      }
    }
  }
</style>

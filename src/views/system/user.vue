<template>
    <div class="setting">
      <div class="title">
        所有日志
        <div class="circle"></div>
        11
      </div>
      <div class="divider"></div>
      <div class="main">
        <div class="table">
          <div class="table_item">
            <div class="left">
              <div class="portrait">
                <img src="../../assets/image/common/head.png" alt="头像">
              </div>
              <div class="info">
                <div class="name">yyl123</div>
                <div class="email">545522390@qq.com</div>
              </div>
            </div>
            <div class="right">
              <div class="disable">
                <i class="iconfont icon-disable"></i>
              </div>
              <div class="divide"></div>
              <div class="remove">
                <i class="iconfont icon-user-remove"></i>
              </div>
            </div>
          </div>
          <div class="table_item">
            <div class="left">
              <div class="portrait">
                <img src="../../assets/image/common/head.png" alt="头像">
              </div>
              <div class="info">
                <div class="name">yyl123</div>
                <div class="email">545522390@qq.com</div>
              </div>
            </div>
            <div class="right">
              <div class="disable">
                <i class="iconfont icon-disable"></i>
              </div>
              <div class="divide"></div>
              <div class="remove">
                <i class="iconfont icon-user-remove"></i>
              </div>
            </div>
          </div>
          <div class="table_item">
            <div class="left">
              <div class="portrait">
                <img src="../../assets/image/common/head.png" alt="头像">
              </div>
              <div class="info">
                <div class="name">yyl123</div>
                <div class="email">545522390@qq.com</div>
              </div>
            </div>
            <div class="right">
              <div class="disable">
                <i class="iconfont icon-disable"></i>
              </div>
              <div class="divide"></div>
              <div class="remove">
                <i class="iconfont icon-user-remove"></i>
              </div>
            </div>
          </div>
          <div class="table_item">
            <div class="left">
              <div class="portrait">
                <img src="../../assets/image/common/head.png" alt="头像">
              </div>
              <div class="info">
                <div class="name">yyl123</div>
                <div class="email">545522390@qq.com</div>
              </div>
            </div>
            <div class="right">
              <div class="disable">
                <i class="iconfont icon-disable"></i>
              </div>
              <div class="divide"></div>
              <div class="remove">
                <i class="iconfont icon-user-remove"></i>
              </div>
            </div>
          </div>
          <div class="table_item">
            <div class="left">
              <div class="portrait">
                <img src="../../assets/image/common/head.png" alt="头像">
              </div>
              <div class="info">
                <div class="name">yyl123</div>
                <div class="email">545522390@qq.com</div>
              </div>
            </div>
            <div class="right">
              <div class="disable">
                <i class="iconfont icon-disable"></i>
              </div>
              <div class="divide"></div>
              <div class="remove">
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
  export default {
    name: "setting",
    data() {
      return {
        ctl: false,
        loading: true,
        pageSizes: [1,2,3,4,5,6,7,8,9],
        pageSize: 1,
        currentPage: 3,
        total: 4,
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
      handleSizeChange() {
        //当每一页条数发生改变时触发
      },
      handleCurrentChange() {
        //当页数发生改变时除法
      }
    },
    mounted() {
      setTimeout(() => {
        this.loading=false;
      },1000)
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
      padding: 0 0 10px 10px;
      font-size: 18px;
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
              i {
                font-size: 24px;
                color: #C2C2C2;
              }
            }

            .divide {
              border-right: 1px solid rgba(187,187,187,.85);
              height: 28px;
              margin: 0 15px;
            }

            .remove {
              i {
                font-size: 24px;
                color: #C2C2C2;
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

<template>
  <div class="head">
    <!--logo-->
    <div class="logo">Orange Project</div>
    <!-- 后台管理 -->
    <div class="board">
      项目接口管理平台（后台管理）
    </div>
    <!--消息头像-->
    <div class="head_info">
      <div class="head_icon">
      </div>
      <div class="user">
        <img src="../../assets/image/common/logo.png" style="width: 24px;margin-right: 8px">
        <el-dropdown trigger="click" @command="ShowView">
          <span class="el-dropdown-link">
            {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
    import {getManagerById} from "../../api/manager";
    import {mapState} from "vuex"


    export default {
        name: "header",
        computed: {
            ...mapState({
                name: (state) => state.name,
                head: (state) => state.head
            }),
        },
        data() {
            return {
                // name:'',
                // head:'',
                //仅展示最多三条数据
                tableData: [
                    {id: 1, content: "张三邀请您加入项目接口管理平台项目", isCheck: false},
                    {id: 2, content: "李四邀请您加入项目接口管理平台项目", isCheck: true},
                    {id: 3, content: "王五邀请您加入项目接口管理平台项目", isCheck: false},
                    // {content: "李四邀请您"},
                ],
                activeIndex: "1",
                noticeCount: 100
            }
        },
        methods: {
            //个人中心（退出登陆）
            ShowView(e) {
                const app = this
                //退出登陆
                if (e == 'exit') {
                    localStorage.clear();
                    app.$router.push("/")
                }
            },
            //激活未读信息
            activeRead() {
                console.log("激活消息")
            },
            //table样式
            isReadMes({rowIndex}) {
                if (this.tableData[rowIndex].isCheck) {
                    return "read_mes"
                }
                return "read_mes_no"
            },
            activeOne(row) {
                row.isCheck = true;
                //跳转页面，并调用接口修改该条通知已读
                console.log("跳转至通知详情页面！")
                //修改为读消息数量
            },
            //查看全部通知
            allNotifications() {
                //跳转至全部通知页面
            },
            //退出登录
            exitLogin() {
                //调用退出登录页面
            }
        },
        async mounted() {
            let rs = await getManagerById({
              mid: localStorage.getItem("id")
            });
            console.log(rs);
            this.$store.commit('setName',rs.data.data.body.name)
            this.$store.commit('setHead','/static/img/head.b818068.png')
        },
    }
</script>


<style lang="less" scoped>
  .head {
    display: flex;
    background: white;
    min-width: 900px;

    .logo {
      box-sizing: content-box;
      width: 224px;
      line-height: 29px;
      padding: 16px 16px 15px;
      font-size: 18px;
      background: rgba(0, 33, 64, 0.77);
      color: rgb(239, 232, 232);
      cursor: pointer;
      box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
    }

    .board {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 500;
      color: rgb(16, 16, 16);
    }

    .head_info {
      display: flex;
      align-items: center;
      margin-left: auto;
      width: 230px;

      .head_icon {
        display: flex;
        align-items: center;
        height: 100%;
        width: 50px;
        padding-left: 15px;
        cursor: pointer;

        &:hover {
          background: #F4F4F4;
        }
      }

      .user {
        margin-left: 35px;
        align-items: center;
        display: flex;
        cursor: pointer;
      }
    }

  }

  .head_notice {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    font-size: 12px;
    color: rgb(18, 150, 219);
    border-bottom: 1px solid #EBEEF5;
  }

  .all_notice {
    text-align: center;
    padding-top: 10px;
    font-size: 13px;
    border-top: 1px solid #EBEEF5;
    cursor: pointer;
  }


  //list 样式
  .el-menu .el-menu--horizontal {
    border-bottom: none;
    padding-left: 8px;
  }

  //table
  .el-table .cell {
    padding: 0 !important;
  }

  .el-table::before {
    background-color: inherit;
  }

  .el-table .cell.el-tooltip {
    font-size: 13px;
  }


</style>

<style>
  .el-table .read_mes {
    color: rgba(0, 0, 0, .45) !important;
    cursor: pointer;
  }

  .el-table .read_mes_no {
    cursor: pointer;
    color: #333 !important;
  }
</style>

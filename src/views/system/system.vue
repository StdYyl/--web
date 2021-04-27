<template>
    <div class="system">
      <div class="main">
        <div class="left">
          <div class="title">系统设置</div>
          <div class="bar">
            <div :class="!selector[0]?'bar_item':'bar_item selected'" @click="changeBar(0)">
              <i class="iconfont icon-xitong xitong"></i>
              系统管理
            </div>
            <div :class="!selector[1]?'bar_item':'bar_item selected'" @click="changeBar(1)">
              <i class="iconfont icon-date date"></i>
              日志查看
            </div>
            <div :class="!selector[2]?'bar_item':'bar_item selected'" @click="changeBar(2)">
              <i class="iconfont icon-user user"></i>
              用户列表
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="right">
          <router-view/>
        </div>
      </div>
      <div class="footer">
        <div class="copyright">
          Copyright &copy; 2021 Orange Project
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "system",
    data() {
      return {
        selector: [true, false, false]
      }
    },
    methods: {
      changeBar(i) {
        this.selector=[false,false,false];
        this.selector[i]=true;
        if(i==0) this.$router.push('/dashboard/system/setting');
        if(i==1) this.$router.push('/dashboard/system/logger');
        if(i==2) this.$router.push('/dashboard/system/user');
      }
    },
    mounted() {
      this.$router.push('/dashboard/system/setting');
    }
  }
</script>

<style scoped lang="less">
  .system {
    width: 100%;
    height: 100%;
    .main {
      position: absolute;
      left: 200px;
      right: 200px;
      top: 100px;
      bottom: 80px;
      background-color: #fff;
      box-shadow: 0px 1px 2px 2px rgb(212,212,212);
      border-radius: 2px;
      display: flex;
      min-width: 1200px;
      min-height: 453px;
      .left {
        flex: 2;
        min-width: 150px;
        .title {
          padding: 20px 0 40px 40px;
          text-align: left;
          font-size: 20px;
          font-weight: 500;
          color: rgb(0,0,0);
          font-family: '微软亚黑';
        }
        .bar {
          display: flex;
          flex-direction: column;
          .bar_item {
            cursor: pointer;
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
            background-color: rgb(24,144,255);
            i {

            }
          }
        }
      }
      .divider {
        margin: 10px 0;
        /*box-shadow: 0 0 1px 1px rgb(235,235,235,0.85);*/
        border-right: 2px solid rgba(195,195,195,0.25);
      }
      .right {
        flex: 8;
        min-height: 453px;
      }
    }
    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px 20px 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;

        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;

          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }

      .copyright {
        color: rgba(0, 0, 0, 0.80);
        font-size: 14px;
      }
    }
  }
</style>

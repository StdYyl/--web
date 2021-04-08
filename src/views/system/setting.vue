<template>
    <div class="setting">
      <div class="title">系统管理</div>
      <div class="divider"></div>
      <div class="main">
        <div class="content">是否允许系统进行注册:</div>
        <el-switch
          v-model="ctl" class="swt"
          @change="isRegister">
        </el-switch>
      </div>
    </div>
</template>

<script>
  import {changeRegister, check} from "../../api/systemconfig";
  import {notice} from "../../utils/elementUtils";

  export default {
    name: "setting",
    data() {
      return {
        ctl: false,
      }
    },
    methods: {
      async isRegister() {
        let res = await changeRegister({});
        console.log(res);
        if(res.data.code === 200) {
          if(res.data.data.allowregister==1) {
            notice(this, '系统已切换到可注册状态');
          } else {
            notice(this, '系统已切换到不可注册状态', 'warning')
          }
        } else {
          notice(this, '修改失败', 'error');
          this.ctl = !this.ctl;
        }
      },
      async check() {
        let res = await check({});
        console.log(res);
        if(res.data.code === 200) {
          this.ctl = res.data.data.allowregister==1?true:false;
        }
      },
    },
    mounted() {
      this.check();
    }
  }
</script>

<style scoped lang="less">
  .setting {
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 30px;
    .title {
      padding: 0 0 10px 10px;
      font-size: 18px;
    }
    .divider {
      border-bottom: 2px solid rgba(195,195,195,0.25);
    }
    .main {
      padding: 20px 0 0 10px;
      font-size: 14px;
      display: flex;
      align-items: center;
      .content {
        margin-right: 10px;
      }
    }
  }
</style>

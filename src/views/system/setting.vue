<template>
    <div class="setting">
      <div class="title">系统管理</div>
      <div class="divider"></div>
      <div class="main">
        <div class="content">是否允许系统进行注册:</div>
        <el-switch
          v-model="ctl" class="swt">
        </el-switch>
      </div>
    </div>
</template>

<script>
  export default {
    name: "setting",
    data() {
      return {
        ctl: false,
      }
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

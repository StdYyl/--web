<template>
  <div class="accept">
    <div class="top">
      来自yyl123的邀请
    </div>
    <div class="bottom">
      <div class="title">yyl123 邀请您 加入项目 Assia </div>
      <div class="info">
        <div class="logo">
          <img src="../../assets/image/common/head.png" alt="">
        </div>
        <div class="content">
          <div class="name">yyl123</div>
          <div class="email">54552390@qq.com</div>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" class="el-btn" style="width: 100%;">加入项目</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      name: "Accept"
  }
</script>

<style scoped lang="less">
  .accept {
    width: 600px;
    margin: 100px auto;
    background-color: #fff;
    box-shadow: 1px 1px 2px 2px rgb(212,212,212);
    border-radius: 2px;
    .top {
      padding: 30px 0 30px 30px;
      text-align: left;
      border-bottom: 1px solid rgb(229,229,229);
    }

    .bottom {
      padding: 30px;
      text-align: left;
      .title {
        padding-bottom: 30px;
      }
      .info {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        .logo {
          display: flex;
          align-items: center;
          img{
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }
        }
        .name, .email {
          padding: 5px 0;
        }
      }
      .btn {
        margin: 30px 0 0 0;
      }
    }

  }
</style>

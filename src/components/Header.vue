<template>
    <div class="header">
      <div class="left">
        Orange Project
      </div>
      <div class="right">
        <div class="tab_bar">
          <div class="bar_item selected">
            <i class="el-icon-s-management"></i>
            <div class="text">项目管理</div>
          </div>
          <div class="bar_item">
            <i class="el-icon-user-solid"></i>
            <div class="text">成员管理</div>
          </div>
          <div class="bar_item">
            <i class="el-icon-s-tools"></i>
            <div class="text">系统管理</div>
          </div>
          <div class="bar_right"></div>
        </div>
        <div class="user_info">
          <div class="msg">
            <i class="el-icon-bell"></i>
            <div class="number">3</div>
          </div>
          <div class="usr">
            <div class="portrait">
              <img src="../assets/image/common/portrait.jpg">
            </div>
            <div class="name">yyl123</div>
            <div class="select"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped lang="less">
  .header {
    width: 100%;
    display: flex;
    .left {
      width: 300px;
      background-color: rgb(59,84,108);
      padding: 20px 0;
      text-align: center;
      color: #ffffff;
      font-size: 18px;
    }

    .right {
      display: flex;
      flex: 1;
      /*background-color: #ccc;*/
      padding: 0 20px;
      .tab_bar {
        display: flex;
        flex: 6;
        .bar_item {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 5px;

          .text {
            margin-left: 5px;
            font-size: 13px;
          }
        }

        .selected {
          font-weight: 700;
          font-family: '微软亚黑';
          font-size: 14px;
          border-bottom: 3px solid rgb(24,144,255);
        }

        .bar_right {
          flex: 2;
        }
      }

      .user_info {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .msg {
          position: relative;
          i {
            font-size: 18px;
          }
          .number {
            -webkit-text-size-adjust:none;
            font-size: 8px;
            width: 12px;
            height: 12px;
            font-weight: 700;
            background-color: rgb(255,77,79);
            color: #ffffff;
            border-radius: 50%;
            position: absolute;
            top: -5px;
            right: -2px;
          }
        }

        .usr {
          display: flex;
          align-items: center;
          .portrait {
            display: flex;
            align-items: center;
            height: 100%;
            img {
              height: 20px;
              border-radius: 50%;
            }
          }

          .name {
            font-size: 12px;
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>

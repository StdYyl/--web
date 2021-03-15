<template>
  <div class="userLayout">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="../../assets/image/common/logo.png" class="logo" alt="logo">
          </a>
        </div>
        <div class="desc">
          <div><span class="title">Orange Project</span></div>
          <div style="margin-top: 15px">{{desc}}</div>
        </div>
      </div>

      <router-view/>
      <slot></slot>

      <div class="footer">
        <div class="copyright">
          Copyright &copy; 2021 Orange Project
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'UserLayout',
        props: {
            desc: {
                type: [String],
                default() {
                    return '欢迎使用项目接口管理系统';
                }
            }
        }
    }
</script>

<style lang="less">
  .userLayout {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f5f5f5 url(~@/assets/image/common/background.svg) no-repeat 50%;
      background-size: 100%;
      padding: 40px 0 60px;
      position: relative;

      a {
        text-decoration: none;
      }

      .top {
        justify-content: center;
        display: flex;
        align-items: center;
        margin-bottom: 40px;

        .header {
          height: 44px;
          line-height: 30px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 60px;
            vertical-align: top;
            border-style: none;
          }
        }

        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
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
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>

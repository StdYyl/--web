<template>
  <div class="accept">
    <div class="top">
      {{notice.content.title}}
    </div>
    <div class="bottom">
      <div class="title">{{notice.content.content}}</div>
      <div class="info">
        <div class="logo">
          <img :src="notice.content.user.head" alt="">
        </div>
        <div class="content">
          <div class="name">{{notice.content.user.name}}</div>
          <div class="email">{{notice.content.user.email}}</div>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" class="el-btn" style="width: 100%;" @click="joinModuleOrProject">加入项目</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {findNoticeById, acceptInvite} from "../../api/notice";
  import {activeLink} from "../../api/project";
  import {notice} from "../../utils/elementUtils";

  export default {
    name: "Accept",
    data() {
      return {
        notice: {
          content: {
            user:{

            }
          },
        },
      }
    },
    methods: {
      async joinModuleOrProject() {
        console.log(this.notice.id);
        let res = await acceptInvite({
          id: this.notice.id,
        });
        console.log(res);
        if(res.data.code === 200) {
          notice(this, '接受邀请成功', 'success');
          this.$router.push({
            path:'/home/'
          })
        } else {
          notice(this, res.data.data, 'error');
        }
      }
    },
    async mounted() {
      if(!localStorage.getItem('id')) {
        this.$router.push({
          path: '/',
          query: {
            redirect: true,
            code: this.$route.query.code,
          }
        });
        return;
      }
      console.log(this.$route.query.code);
      if(this.$route.query.code) {
        let res = await activeLink({
          code: this.$route.query.code,
          toid: localStorage.getItem('id'),
        });
        if(res.data.code === 200) {
          let nid = res.data.data.body.id;
          let rs = await findNoticeById({
            nid: this.$route.query.nid,
          });
          if(res.data.code === 200) {
            this.notice = res.data.data.body;
            this.notice.content = JSON.parse(this.notice.content);
            console.log(this.notice)
          }
        }
      } else {
        let res = await findNoticeById({
          nid: this.$route.query.nid,
        });
        if(res.data.code === 200) {
          this.notice = res.data.data.body;
          this.notice.content = JSON.parse(this.notice.content);
          console.log(this.notice)
        }
      }

    }
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

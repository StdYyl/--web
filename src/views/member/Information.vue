<template>
  <div class="main">
    <div class="lf">
      <div class="bar">
        <div :class="!selector[0]?'bar_item':'bar_item selected'" @click="changeBar(0)">
          <i class="iconfont icon-tuanduichengyuan"></i>
          基本信息
        </div>
        <div :class="!selector[1]?'bar_item':'bar_item selected'" @click="changeBar(1)">
          <i class="iconfont icon-disable"></i>
          安全信息
        </div>
      </div>
    </div>
    <div class="rh">
      <el-form :model="baseMes" :rules="rules" ref="baseMes" label-position="top">
        <div v-if="selector[0]" style="display: flex">
          <div>
            <h3>基本信息</h3>
            <el-form-item label="昵称" prop="name">
              <el-input v-model="baseMes.name" placeholder="用户名" size="small"></el-input>
            </el-form-item>
            <el-form-item label="组织" prop="organization">
              <el-input v-model="baseMes.organization" placeholder="组织" size="small"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="job">
              <el-input v-model="baseMes.job" placeholder="职位" size="small"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="introduction">
              <el-input :rows="3" type="textarea" v-model="baseMes.introduction" placeholder="简介"
                        size="small"></el-input>
            </el-form-item>
            <el-button type="primary" style="margin-top: 20px" @click="updateBaseMes">更新基本信息</el-button>
          </div>
          <div class="form_head">
            <div style="width: 100%;text-align: left;margin-bottom: 15px">头像</div>
            <el-image :src="baseMes.head" style="width: 100px;margin-bottom: 10px"></el-image>
            <el-upload
              action="http://39.102.48.244:8080/interface_img_server2-1.0-SNAPSHOT/file/upload/"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :disabled="interceptor()"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
        <div v-if="selector[1]">
          <h3>安全信息</h3>
          <div style="display: flex;justify-content: space-between;width: 750px">
            <div>
              <div>账户密码</div>
              <div style="font-size: 13px;margin-top: 5px;color: #999999">当前密码强度：强</div>
            </div>
            <el-button type="text" @click="openAccountPanel">修改</el-button>
          </div>
          <el-divider></el-divider>
          <div style="display: flex;justify-content: space-between;width: 750px">
            <div>
              <div>手机账号</div>
              <div style="font-size: 13px;margin-top: 5px;color: #999999">已绑定手机号:{{safeMes.phone}}</div>
            </div>
            <el-button type="text" @click="openPhonePanel">修改</el-button>
          </div>
          <el-divider></el-divider>
          <div style="display: flex;justify-content: space-between;width: 750px">
            <div>
              <div>邮箱账号</div>
              <div style="font-size: 13px;margin-top: 5px;color: #999999">已绑定邮箱：{{safeMes.email}}</div>
            </div>
            <el-button type="text" @click="openEmailPanel">修改</el-button>
          </div>
          <el-divider></el-divider>
        </div>
      </el-form>

      <!--修改密码-->
      <el-dialog title="" :visible.sync="showAccount" width="350px" class="memberCss">
        <div slot="title" class="header-title">
          <span><i class="el-icon-warning-outline"></i></span>
          <span class="title-age">修改密码</span>
        </div>
        <div style="margin:0 0 10px 0">原密码</div>
        <el-input type="password" placeholder="原始账号密码" v-model="password.oldPassword"></el-input>
        <div style="margin: 10px 0">新密码</div>
        <el-input type="password" placeholder="新密码" v-model="password.newPassword"></el-input>
        <div style="margin: 10px 0">新密码</div>
        <el-input type="password" placeholder="再次输入新密码" v-model="password.rePassword"></el-input>
        <el-button type="primary" style="margin-top: 20px;width: 100%" @click="updatePass">修改</el-button>
      </el-dialog>

      <!--手机号-->
      <el-dialog title="" :visible.sync="showPhone" width="350px" class="memberCss">
        <div slot="title" class="header-title">
          <span><i class="el-icon-warning-outline"></i></span>
          <span class="title-age">修改手机号</span>
        </div>
        <el-input placeholder="请输入新手机号" v-model="phone"></el-input>
        <div style="display: flex;margin-top: 15px">
          <el-input placeholder="验证码" v-model="phoneCode"></el-input>
          <el-button style="margin-left: 20px;width: 130px;"
                     :disabled="state.smsSendBtn"
                     @click.stop.prevent="getCaptcha"
                     v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')">获取验证码
          </el-button>
        </div>
        <el-button type="primary" style="margin-top: 20px;width: 100%" @click="updatePhone">绑定</el-button>
      </el-dialog>

      <!--邮箱-->
      <el-dialog title="" :visible.sync="showEmail" width="350px" class="memberCss">
        <div slot="title" class="header-title">
          <span><i class="el-icon-warning-outline"></i></span>
          <span class="title-age">修改邮箱</span>
        </div>
        <el-input placeholder="请输入新邮箱" v-model="email"></el-input>
        <div style="display: flex;margin-top: 15px">
          <el-input placeholder="验证码" v-model="emailCode"></el-input>
          <el-button style="margin-left: 20px;width: 130px;"
                     :disabled="states.smsSendBtn"
                     @click.stop.prevent="getCaptchas"
                     v-text="!states.smsSendBtn && '获取验证码' || (states.time+' s')">获取验证码
          </el-button>
        </div>
        <el-button type="primary" style="margin-top: 20px;width: 100%" @click="updateEmail">绑定</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import {notice} from '@/utils/elementUtils'
    import {getUserMesByID, modifyUserMes, modifyPass, modifyPhone, modifyEmail} from '@/api/user'
    import {sendImage} from '@/api/staticMes'
    import md5 from 'js-md5'
    import {emailIsRegister, phoneIsRegister, SendCode, SendEmailCode} from "../../api/user";
    import {checkResponse} from "../../utils/utils";

    export default {
        name: "Information",
        data() {
            return {
                selector: [true, false],
                //手机号
                state: {
                    time: 60,
                    smsSendBtn: false
                },
                //邮箱
                states: {
                    time: 60,
                    smsSendBtn: false
                },
                //修改手机号信息
                phone: '',
                phoneCode: '',
                //修改邮箱信息
                email: '',
                emailCode: '',
                //修改密码信息
                password: {
                    oldPassword: '',
                    newPassword: '',
                    rePassword: '',
                },
                showAccount: false,
                showPhone: false,
                showEmail: false,
                safeMes: {phone: '', email: '',},

                baseMes: {
                    id: '',
                    name: '',
                    organization: '',
                    job: '',
                    introduction: '站在巨人的肩膀上看比赛',
                    head: '',
                },
                rules: {
                    name: {required: true, message: "请输入用户昵称", trigger: 'blur'},
                }
            }
        },
        methods: {
            //拦截器，查看用户是否被禁用
            interceptor() {
              if(localStorage.getItem('disabled')==true) {
                notice(this, '用户权限已被禁用', 'warning');
                return true;
              }
              return false;
            },
            //打开密码面板
            openAccountPanel() {
              let dis = this.interceptor();
              if(dis) return;
              this.showAccount = true;
            },
            //打开电话面板
            openPhonePanel() {
              let dis = this.interceptor();
              if(dis) return;
              this.showPhone = true;
            },
            //打开email面板
            openEmailPanel() {
              let dis = this.interceptor();
              if(dis) return;
              this.showEmail = true;
            },
            async updateEmail(){
                if (!(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(this.email))) {
                    notice(this, '请输入正确的邮箱格式', 'error', 'Message', '发送失败')
                    return;
                }
                if (this.emailCode == '') {
                    notice(this, '请输入验证码', 'error')
                    return;
                }
                let param = {
                    id: localStorage.getItem("id"),
                    email: this.email,
                    captcha: this.emailCode
                }
                let rs = await modifyEmail(param);
                if (rs.data.code != 200) {
                    notice(this, rs.data.msg, "error");
                    return;
                }
                notice(this, "修改成功！");
                this.safeMes.email = this.email
                this.showEmail = false
            },
            async updatePhone() {
                if (!(/^1[34578]\d{9}$/.test(this.phone))) {
                    notice(this, '请输入正确的手机号', 'error', 'Message', '发送失败')
                    return;
                }
                if (this.phoneCode == '') {
                    notice(this, '请输入验证码', 'error')
                    return;
                }
                let param = {
                    id: localStorage.getItem("id"),
                    phone: this.phone,
                    captcha: this.phoneCode
                }
                let rs = await modifyPhone(param);
                if (rs.data.code != 200) {
                    notice(this, rs.data.msg, "error");
                    return;
                }
                notice(this, "修改成功！");
                this.safeMes.phone = this.phone
                this.showPhone = false

            },
            async updatePass() {
                if (this.password.newPassword == '' || this.password.oldPassword == '') {
                    notice(this, "请补全信息！", "error")
                    return;
                }
                if (this.password.newPassword != this.password.rePassword) {
                    notice(this, "两次密码不一致！", "error")
                    return;
                }
                let form = {
                    id: localStorage.getItem("id"),
                    oldPassword: md5(this.password.oldPassword),
                    newPassword: md5(this.password.newPassword)
                }
                let rs = await modifyPass(form)
                if (rs.data.code != 200) {
                    notice(this, rs.data.msg, "error");
                    return;
                }
                notice(this, "修改成功！");
                localStorage.setItem("token", rs.data.data.token)
                this.showAccount = false
            },
            //更新基本信息
            updateBaseMes() {
                let dis = this.interceptor();
                if(dis) return;
                let app = this
                this.$refs['baseMes'].validate(async err => {
                    if (!err) return;
                    let rs = await modifyUserMes(this.baseMes)
                    if (rs.data.code == 200) {
                        notice(this, "修改成功！")
                        this.$store.commit("setName", app.baseMes.name)
                        this.$store.commit("setHead", app.baseMes.head)
                    }

                })
            },
            //上传图片
            async beforeAvatarUpload(file) {
                const isPhoto =
                    file.type === "image/jpeg" ||
                    file.type === "image/jpg" ||
                    file.type === "image/png" ||
                    file.type === "image/gif";
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (isPhoto) this.fileType = "image";
                if (!isPhoto) {
                    this.$message.error("上传文件的后缀 只能是 jpg/jpeg/png/gif");
                    return false;
                }
                if (!isLt5M) {
                    this.$message.error("上传文件大小不能超过 5MB!");
                    return false;
                }
                if(isLt5M && isPhoto) return true;
                else return false;
                return false;
            },
            //上传图片成功触发
            handleAvatarSuccess(res, file) {
              if(res.code === 200) {
                if(res.data.status === 'OK') {
                  this.baseMes.head = 'http://39.102.48.244:8080/interface_img_server2-1.0-SNAPSHOT/upload/'+res.data.filename;
                  notice(this, '上传图片成功', 'success');
                  return;
                }
              }
              notice(this, '上传图片失败', 'error');
            },
            changeBar(i) {
                this.selector = [false, false, false];
                this.selector[i] = true;
            },
            //邮箱验证码
            async getCaptchas(e) {
                e.preventDefault();
                const app = this;
                //校验手机号是否合法
                if (!(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(this.email))) {
                    notice(this, '请输入正确的邮箱格式', 'error', 'Message', '发送失败')
                    return;
                }

                let rs = await emailIsRegister(this.email)
                if (rs.data.code != -9999) {
                    notice(app, "该邮箱已注册，请更换邮箱！", "error")
                    return;
                }

                //设置倒计时
                this.states.smsSendBtn = true;
                const interval = window.setInterval(() => {
                    if (app.states.time-- <= 0) {
                        app.states.time = 60;
                        app.states.smsSendBtn = false;
                        window.clearInterval(interval)
                    }
                }, 1000);
                //发送邮箱验证码
                SendEmailCode(this.email).then(res => {
                    console.log(res.data)
                    if (res.data.code != 200) {
                        return false;
                    }
                    notice(app, res.data.msg)
                })
            },
            //获取验证码手机
            async getCaptcha(e, x) {
                e.preventDefault();
                const app = this;
                //校验手机号是否合法
                if (!(/^1[34578]\d{9}$/.test(this.phone))) {
                    notice(this, '请输入正确的手机号', 'error', 'Message', '发送失败')
                    return;
                }
                let rs = await phoneIsRegister(this.phone);
                if (rs.data.code != 200) {
                    notice(this, rs.data.msg, 'error');
                    return;
                }

                //设置倒计时
                this.state.smsSendBtn = true;
                const interval = window.setInterval(() => {
                    if (app.state.time-- <= 0) {
                        app.state.time = 60;
                        app.state.smsSendBtn = false;
                        window.clearInterval(interval)
                    }
                }, 1000);
                //调用接口发送验证码
                SendCode(app.phone).then(res => {
                    //校验结果
                    if (!checkResponse(this, res.data, true)) {
                        return false;
                    }
                    notice(this, '验证码已发送！')
                })
            }

        },
        async created() {
            let id = localStorage.getItem("id")
            let rs = await getUserMesByID(id);
            this.baseMes.id = id;
            let {name, head, organization, job, introduction, phone, email} = rs.data.data
            this.safeMes.phone = phone
            this.safeMes.email = email
            this.baseMes.name = name;
            this.baseMes.head = head;
            this.baseMes.organization = organization;
            this.baseMes.job = job;
            this.baseMes.introduction = introduction;

        }
    }
</script>

<style lang="less" scoped>

  /deep/ .el-upload-list {
    display: none;
  }

  /deep/ .el-dialog__body {
    padding-top: 20px;
  }

  /deep/ .el-divider {
    margin: 18px 0;
  }

  .header-title {
    text-align: left;
  }

  /deep/ .el-icon-warning-outline {
    color: #FAC200;
  }

  /deep/ .el-dialog__header {
    border-bottom: 1px solid #BBBBBB;
  }

  .main {
    width: 1200px;
    margin: 20px auto;
    background: white;
    height: 570px;
    padding: 20px 0;
    border-radius: 4px;
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px 0px;

    .lf {
      width: 250px;
      margin: 10px 0;
      border-right: 1px solid rgb(195, 195, 195);
      min-height: 350px;
      overflow: hidden;
      box-sizing: content-box;

      .bar {
        display: flex;
        flex-direction: column;
        width: 101%;

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
          background-color: rgb(24, 144, 255);
        }
      }
    }

    .rh {
      text-align: left;
      margin-left: 40px;

      /deep/ .el-form {
        padding-left: 30px;
        display: flex;

        .el-form-item {
          margin-bottom: 15px;
          width: 300px;
        }

        .el-form-item__label {
          padding-bottom: 0;
          line-height: 30px;
        }
      }

      .form_head {
        margin-left: 200px;
        height: 450px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;


      }
    }
  }

</style>

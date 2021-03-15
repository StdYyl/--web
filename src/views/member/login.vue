<template>
  <div class="main">
    <div class="text-center" :spinning="oauthLoading">
      <span v-show="oauthLoading">正在登陆，请稍后...</span>
    </div>
    <el-form v-show="!oauthLoading" ref="formLogin" :model="formLogin" :rules="form">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--账号密码登陆-->
        <el-tab-pane label="账号密码登录" name="account">
          <div>
            <el-form-item label="" prop="account">
              <el-input type="text" v-model="formLogin.account" autocomplete=""
                        placeholder="帐户名或邮箱地址" prefix-icon="el-icon-user-solid"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="password">
              <el-input type="password" v-model="formLogin.password" autocomplete=""
                        placeholder="密码" prefix-icon="el-icon-unlock"
              ></el-input>
            </el-form-item>
          </div>
        </el-tab-pane>
        <!--手机号登录-->
        <el-tab-pane label="手机号登录 " name="phone">
          <div>
            <el-form-item label="" prop="phone">
              <el-input type="text" v-model="formLogin.phone" autocomplete="off"
                        placeholder="手机号" prefix-icon="el-icon-mobile-phone"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="captcha" style="display: flex">
              <el-input type="password" v-model="formLogin.captcha" autocomplete="off"
                        placeholder="验证码" prefix-icon="iconfont icon-yanzhengma"
              ></el-input>
              <el-button style="margin-left: 20px;width: 130px;"
                         :disabled="state.smsSendBtn"
                         @click.stop.prevent="getCaptcha"
                         v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')">获取验证码
              </el-button>
            </el-form-item>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!--注册-->
      <el-form-item>
        <el-checkbox v-model="formLogin.rememberMe" @change=""
                     :class="{color:formLogin.rememberMe ? 'black' : 'black'}">自动登录
        </el-checkbox>
        <a class="forge-password" @click="()=>{this.$router.push('/user/forgot')}">忘记密码</a>
      </el-form-item>
      <!--登陆-->
      <el-form-item style="margin-top:24px">
        <el-button type="primary" class="login-button" :loading="loginBtn"
                   @click.stop.prevent="handleSubmit" :disabled="loginBtn" style="width: 100%">登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import md5 from 'js-md5';
    import {notice} from '../../utils/elementUtils'
    import {checkResponse} from '../../utils/utils'
    // import {SendCode, registerOrLand, land} from '../../api/User'

    export default {
        components: {},
        data() {
            return {
                loginBtn: false,
                oauthLoading: false,
                // login type:1 密码, 2验证码
                loginType: 1,
                state: {
                    time: 60,
                    smsSendBtn: false
                },
                formLogin: {
                    account: '',
                    password: '',
                    captcha: '',
                    phone: '',
                    rememberMe: true
                },
                activeName: 'account',
                form: {
                    account: {required: true, message: '请输入账户名或邮箱地址', trigger: 'blur'},
                    password: {required: true, message: '请输入密码', trigger: 'blur'},
                    phone: {required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号'},
                    captcha: {required: true, trigger: 'blur', message: '请输入验证码'},
                }
            }
        },
        methods: {
            //选择登陆方式
            handleClick(e) {
                this.activeName = e.name
                this.loginType = e.name === 'account' ? 1 : 2;
                // this.form.resetFields()
            },
            //登陆、注册
            handleSubmit() {
                const app = this;

                let loginParams = {
                    remember_me: app.formLogin.rememberMe
                };

                // 使用账户密码登录
                if (app.loginType === 1) {
                    //校验入参
                    app.$refs['formLogin'].validateField(('account'), (err) => {
                        if (err) return;
                        app.$refs['formLogin'].validateField(('password'), (err) => {
                            if (err) return;
                            loginParams.account = this.formLogin.account
                            loginParams.password = md5(this.formLogin.password)
                            //登录
                            console.log(loginParams);
                            // land(loginParams).then(res=>{
                            //   if (!checkResponse(this, res, true)) {
                            //     return false;
                            //   }
                            // })
                        })
                    })
                }
                //手机号+验证码登录
                else {
                    //校验入参
                    app.$refs['formLogin'].validateField(('phone'), (err) => {
                        if (err) return;
                        app.$refs['formLogin'].validateField(('captcha'), (err) => {
                            if (err) return;
                            loginParams.phone = this.formLogin.phone
                            loginParams.captcha = this.formLogin.captcha
                            //登录
                            console.log(loginParams);
                            registerOrLand(loginParams).then(res => {
                                if (!checkResponse(this, res, true)) {
                                    return false;
                                }
                            })
                        })
                    })
                }
            },
            //获取验证码
            getCaptcha(e) {
                e.preventDefault();
                const app = this;
                //校验手机号是否合法
                app.$refs['formLogin'].validateField(('phone'), (err) => {
                    if (err){
                        notice(this, '请输入正确的手机号', 'error', 'Message', '发送失败')
                        return;
                    }else{
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
                        // SendCode(app.formLogin.phone).then(res=>{
                        //   //校验结果
                        //   if (!checkResponse(this, res, true)) {
                        //     return false;
                        //   }
                        // })
                    }
                })
            },
        }
    }
</script>

<style lang="less">
  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }

  //add
  .el-table {
    background-color: transparent;
  }

  .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
  }

  .el-tabs__nav-wrap::after {
    display: none;
  }

  .el-form-item__content {
    display: flex;
    justify-content: space-between;
  }


  .forge-password {
    font-size: 14px;
    color: #1890ff;

    &:hover {
      cursor: pointer;
    }
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: black;
  }

  .change {
    position: relative;
    width: 800px;
    height: 140px;

    .change_account {
      width: 370px;
      float: left;
    }

    .change_phone {
      float: left;
    }
  }

  .el-button {
    border: 1px solid #cdd0d6;
  }
</style>

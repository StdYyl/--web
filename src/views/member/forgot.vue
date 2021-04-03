<template>
  <div class="main user-layout-forgot">
    <!--输入邮箱获取验证码-->
    <div v-show="!sended">
      <h3 style="text-align: left;font-size: 16px;"><span>通过邮箱重置</span></h3>
      <el-form :rules="rules" :model="from" ref="formForgot">
        <el-form-item prop="email">
          <el-input v-model="from.email" type="text" placeholder="注册邮箱地址" prefix-icon="iconfont icon-youxiang">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="forgot-button"
            :loading="forgotBtn"
            @click.stop.prevent="handleSubmitCaptcha"
            :disabled="forgotBtn">获取验证码
          </el-button>
          <router-link class="login" :to="{ name: 'login' }">使用其他账户登录</router-link>
        </el-form-item>
      </el-form>
    </div>
    <!--根据邮箱获取验证码-->
    <div v-show="sended">
      <h3 style="text-align: left;font-size: 16px;"><span>重置密码</span></h3>
      <el-form :model="from" :rules="rules" ref="from">
        <!--邮箱-->
        <el-form-item>
          <el-input disabled v-model="from.email" type="text" placeholder="注册邮箱地址" prefix-icon="iconfont icon-youxiang">
          </el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-popover placement="right" width="400" trigger="focus">
            <template>
              <div :style="{ width: '240px' }">
                <div :class="['user-register', passwordLevelClass]">强度：<span>{{ passwordLevelName }}</span>
                </div>
                <el-progress :percentage="state.percent" :color=" passwordLevelColor "/>
                <div style="margin-top: 10px;">
                  <span>请至少输入 6 个字符，包含数字、字符、字母两种。请不要使用容易被猜到的密码。</span>
                </div>
              </div>
            </template>
            <el-input slot="reference" type="password" v-model="from.password"
                      autocomplete="false"
                      placeholder="密码须至少6位，且区分大小写" prefix-icon="el-icon-unlock">
            </el-input>
          </el-popover>
        </el-form-item>
        <!--确认密码-->
        <el-form-item prop="password2">
          <el-input type="password" v-model="from.password2" autocomplete="false" placeholder="再次确认您的密码"
                    prefix-icon="el-icon-circle-check">
          </el-input>
        </el-form-item>
        <!--验证码-->
        <el-form-item prop="captcha">
          <el-input type="password" v-model="from.captcha" autocomplete="false" placeholder="验证码"
                    prefix-icon="iconfont icon-yanzhengma">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="register-button" :loading="registerBtn"
                     @click.stop.prevent="handleSubmit" :disabled="registerBtn">提交</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
    import md5 from 'js-md5'
    import {forget, SendEmailCode,emailIsRegister} from '../../api/user'
    import {checkResponse} from "../../utils/utils";
    import {notice} from "../../utils/elementUtils";

    const levelNames = {
        0: '低',
        1: '低',
        2: '中',
        3: '强'
    };
    const levelClass = {
        0: 'error',
        1: 'error',
        2: 'warning',
        3: 'success'
    };
    const levelColor = {
        0: '#ff0000',
        1: '#ff0000',
        2: '#ff7e05',
        3: '#52c41a',
    };
    export default {
        name: 'Forgot',
        data() {
            return {
                sended: false,
                forgotBtn: false,
                from: {
                    email: '',
                    password: '',
                    password2: '',
                    captcha: ''
                },
                state: {
                    passwordLevel: 0,
                    percent: 10,
                },
                registerBtn: false,
                rules: {
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {
                            pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                            message: '请輸入正确的格式',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {required: true, message: '至少6位密码，区分大小写', trigger: 'change', min: 6},
                        {validator: this.handlePasswordLevel, trigger: 'change'}
                    ],
                    password2: [
                        {required: true, message: '至少6位密码，区分大小写', trigger: 'blur'},
                        {validator: this.handlePasswordCheck, trigger: 'blur'}
                    ],
                    captcha: {required: true, trigger: 'blur', message: '请输入验证码'},
                },
            }
        },
        computed: {
            passwordLevelClass() {
                return levelClass[this.state.passwordLevel]
            },
            passwordLevelName() {
                return levelNames[this.state.passwordLevel]
            },
            passwordLevelColor() {
                return levelColor[this.state.passwordLevel]
            },
        },
        methods: {
            //获取邮箱验证码
            handleSubmitCaptcha() {
                let app = this
                this.$refs['formForgot'].validateField(('email'), err => {
                    if (err) return;
                    emailIsRegister(this.from.email).then(res => {
                        console.log(res)
                        if(res.data.code == -9999){
                            notice(app, res.data.msg, "error")
                            return;
                        }
                        this.sended = true;
                        //发送邮箱验证码
                        SendEmailCode(this.from.email).then(res=>{
                            console.log(res.data)
                            if (res.data.code != 200) {
                                return false;
                            }
                            notice(app, res.data.msg)
                        })
                    })

                })
            },
            //提交修改
            handleSubmit() {
                const app = this
                this.$refs['from'].validate(err=>{
                    if(!err) return;
                    let params = JSON.parse(JSON.stringify(app.from))
                    //加密
                    params.password = md5(params.password);
                    //修改密码
                    forget(params).then(res => {
                        if (!checkResponse(this, res.data, true)) {
                            return false;
                        }
                        notice(app, res.data.msg)
                        this.$router.push("/")
                    })

                })
            },
            //校验首次输入密码
            handlePasswordLevel(rule, value, callback) {
                let level = 0;

                // 判断这个字符串中有没有数字
                if (/[0-9]/.test(value)) {
                    level++
                }
                // 判断字符串中有没有字母
                if (/[a-zA-Z]/.test(value)) {
                    level++
                }
                // 判断字符串中有没有特殊符号
                if (/[^0-9a-zA-Z_]/.test(value)) {
                    level++
                }
                this.state.passwordLevel = level;
                this.state.percent = level * 30;
                if (level >= 2) {
                    if (level >= 3) {
                        this.state.percent = 100
                    }
                    callback()
                } else {
                    if (level === 0) {
                        this.state.percent = 10
                    }
                    callback(new Error('密码强度不够'))
                }
            },
            //确认密码校验
            handlePasswordCheck(rule, value, callback) {
                this.$refs['from'].validateField('password', (err) => {
                    if (err) {
                        return;
                    }
                    if (value && this.from.password && value.trim() !== this.from.password.trim()) {
                        callback(new Error('两次密码不一致'))
                    }
                    callback()
                })
            },
        },
    }
</script>
<style lang="less">
  .user-register {

    &.error {
      color: #ff0000;
    }

    &.warning {
      color: #ff7e05;
    }

    &.success {
      color: #52c41a;
    }
  }

  .user-layout-register {
    .ant-input-group-addon:first-child {
      background-color: #fff;
    }
  }
</style>
<style lang="less">
  .user-layout-forgot {

    & > h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }


    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forgot-button {
      width: 50%;
    }

    .login {
      float: right;
      line-height: 40px;
    }
  }

  .el-input--prefix .el-input__inner {
    padding-left: 35px;
  }

  .el-form-item__content > span {
    width: 100%;
  }

  //进度条的数字
  .el-progress__text {
    display: none;
  }

  .el-form-item__content button {
    width: 100%;
  }
</style>

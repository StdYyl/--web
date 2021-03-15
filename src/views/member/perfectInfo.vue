<template>
  <div class="main">
    <h3 style="text-align: left;font-size: 16px;"><span>信息补全</span></h3>
    <el-form :model="from" :rules="rules" ref="from">
      <!--用户名-->
      <el-form-item prop="name">
        <el-input v-model="from.name" type="text" placeholder="用户名" >
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
                    autocomplete="false" placeholder="密码须至少6位，且区分大小写" >
          </el-input>
        </el-popover>
      </el-form-item>
      <!--确认密码-->
      <el-form-item prop="password2">
        <el-input type="password" v-model="from.password2" autocomplete="false" placeholder="再次确认您的密码">
        </el-input>
      </el-form-item>
      <!--公司组织-->
      <el-form-item prop="organization">
        <el-input v-model="from.organization" autocomplete="false" placeholder="公司组织">
        </el-input>
      </el-form-item>
      <!--职位-->
      <el-form-item prop="job">
        <el-input v-model="from.job" autocomplete="false" placeholder="职位">
        </el-input>
      </el-form-item>
      <!--邮箱-->
      <el-form-item prop="email">
        <el-input v-model="from.email" type="text" placeholder="邮箱" >
        </el-input>
      </el-form-item>
      <!--验证码-->
      <el-form-item prop="captcha" style="display: flex">
        <el-input type="password" v-model="from.captcha" autocomplete="off"
                  placeholder="验证码" prefix-icon="iconfont icon-yanzhengma"
        ></el-input>
        <el-button style="margin-left: 20px;width: 130px;"
                   :disabled="state.smsSendBtn"
                   @click.stop.prevent="getCaptcha"
                   v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')">获取验证码
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="register-button" :loading="registerBtn"
                   @click.stop.prevent="handleSubmit" :disabled="registerBtn">提交
        </el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

    import md5 from 'js-md5'
    import {notice} from '../../utils/elementUtils'
    import {checkResponse} from '../../utils/utils'

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
        name: "perfectInfo",
        data() {
            return {
                registerBtn:false,
                state: {
                    passwordLevel: 0,
                    percent: 10,
                    time: 60,
                    smsSendBtn: false
                },
                from: {
                    name: '',
                    password: '',
                    password2: '',
                    organization: '',
                    job: '',
                    email: '',
                    captcha: ''
                },
                rules:{
                    name:{required:true, message:"请输入用户名", trigger:'blur'},
                    password: [
                        {required: true, message: '至少6位密码，区分大小写', trigger: 'change', min: 6},
                        {validator: this.handlePasswordLevel, trigger: 'change'}
                    ],
                    password2: [
                        {required: true, message: '至少6位密码，区分大小写', trigger: 'blur'},
                        {validator: this.handlePasswordCheck, trigger: 'blur'}
                    ],
                    captcha: {required: true, trigger: 'blur', message: '请输入验证码'},
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {
                            pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                            message: '请輸入正确的格式',
                            trigger: 'blur'
                        }
                    ]
                }
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
        methods:{
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
            //获取验证码
            getCaptcha(e) {
                e.preventDefault();
                const app = this;
                //校验手机号是否合法
                app.$refs['from'].validateField(('email'), (err) => {
                    if (err) {
                        notice(this, '请输入正确的邮箱', 'error', 'Message', '发送失败')
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
                    // SendCode(app.formLogin.phone).then(res=>{
                    //   //校验结果
                    //   if (!checkResponse(this, res, true)) {
                    //     return false;
                    //   }
                    // })
                })
            },
            //提交注册
            handleSubmit() {
                const app = this
                this.$refs['from'].validate(err=>{
                    if(!err) return;
                    let params = JSON.parse(JSON.stringify(app.from))
                    //加密
                    params.password = md5(params.password);
                    //修改密码

                })
            },

        }
    }
</script>

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

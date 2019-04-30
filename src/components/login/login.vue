<template>
   <div class="login">
     <div class="lg-main">
       <div class="lg-bg"></div>
       <div class="lg-form">
         <el-tabs :class="!isForgetPassword ? 'main-tab' : 'sub-tab'" v-model="activeTab">
          <el-tab-pane :label="isForgetPassword ? '找 回 密 码' : '丽呈员工登录'" name="first">
            <el-form v-show="!isForgetPassword" class="form" :model="userinfo" ref="userinfo" :rules="rules">
              <el-form-item prop="name">
                <el-input
                  v-model="userinfo.name"
                  prefix-icon="el-icon-user"
                  placeholder="用户名">
                </el-input>
              </el-form-item>
              <el-form-item prop="pass">
                <el-input
                  type="pass"
                  v-model="userinfo.pass"
                  autocomplete="off"
                  prefix-icon="el-icon-lock"
                  placeholder="密码">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="isFreeLogin">30天内免登录</el-checkbox>
                <a class="forgetPassword" href="javascript:;" @click="forgetPassword">忘记密码？</a>
              </el-form-item>
              <el-form-item>
                <el-button class="submit" type="primary" @click="submitForm('userinfo')">登录</el-button>
              </el-form-item>
            </el-form>
            <el-form v-show="isForgetPassword" class="form" :model="retrievePass" ref="retrievePass" :rules="rules">
              <el-form-item prop="name">
                <el-input
                  v-model="retrievePass.name"
                  prefix-icon="el-icon-user"
                  placeholder="请输入账号">
                </el-input>
              </el-form-item>
              <el-form-item prop="verifyCode">
                <el-button class="getcode" type="primary" @click="getVerifyCode">获取短信验证码</el-button>
                <el-input
                  class="code-input"
                  v-model="retrievePass.verifyCode"
                  minlength="6"
                  maxlength="6"
                  placeholder="填写验证码">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="submit" type="primary" @click="submitForm('retrievePass')">立即验证</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane v-if="!isForgetPassword" label="企业员工登录" name="second"></el-tab-pane>
        </el-tabs>
       </div>
     </div>
   </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    const validate = (rule, value, callback) => {
      value === '' && callback(new Error('输入不能为空'))
    }
    return {
      userinfo: {
        name: '',
        pass: ''
      },
      retrievePass: {
        name: '',
        verifyCode: ''
      },
      rules: {
        name: [{ validator: validate, trigger: 'blur' }],
        pass: [{ validator: validate, trigger: 'blur' }],
        verifyCode: [{ validator: validate, trigger: 'blur' }]
      },
      activeTab: 'first',
      isFreeLogin: false,
      isForgetPassword: false
    }
  },
  methods: {
    submitForm(formName) {
      let info = this[formName]
      if (info.name !== '' && info.pass !== '') {
        this.registerLoginHandler()
      } else if (info.name !== '' && info.verifyCode !== '') {
        this.retrievePassHandler()
      }
    },
    async registerLoginHandler(info) {
      try {
        let res = await this.$http.post(this.api.login, { user: this.userinfo })
        if (res.errNo === 0) {
          this.$router.push('/order')
        }
      } catch (err) {
        console.error(err)
      }
    },
    async retrievePassHandler() {
      try {
        let res = await this.$http.post(this.api.retrievepass, { user: this.userinfo })
        if (res.errNo === 0) {
          this.$router.push('/order')
        }
      } catch (err) {
        console.error(err)
      }
    },
    forgetPassword() {
      this.resetForm('retrievePass')
      this.isForgetPassword = true
      this.activeTab = 'first'
    },
    getVerifyCode() {
      console.log('获取验证码')
    },
    resetForm(formName) {
      console.log(this.$refs)
      this.$refs[formName].resetFields()
    }
  },
  mounted() {
    this.$parent.hasMenu = false
  },
  destroyed() {
    this.$parent.hasMenu = true
  }
}
</script>

<style lang="scss" scoped>
  .login {
    background: #303135;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .lg-main {
      width: 620+352px;
      height: 404px;
      border-radius: 2px;
      position: relative;
      .lg-bg {
        width: 620px;
        height: 404px;
        background-image: url(../../assets/login-bg.png);
        background-size: 620px 406px;
        background-repeat: no-repeat;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        margin-right: 352px;
      }
      .lg-form {
        width: 352px;
        height: 404px;
        background: #fff;
        position: absolute;
        top: 0;
        right: 0;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        padding: 22px;
        box-sizing: border-box;
        .el-tabs {
          &.main-tab /deep/ div.el-tabs__nav {
            margin-left: 56px;
          }
          &.sub-tab /deep/ div.el-tabs__nav {
            margin-left: 130px;
            .el-tabs__active-bar {
              background-color: #E4E7ED;
            }
          }
          .form {
            margin-top: 30px;
            .submit {
              width: 100%;
            }
            .forgetPassword {
              float: right;
            }
            .code-input {
              width: 164px;
            }
          }
        }
      }
    }
  }
</style>

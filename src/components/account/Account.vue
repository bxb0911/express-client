<template>
   <el-form :model="userinfo" ref="userinfo" :rules="rules">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="userinfo.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="pass" v-model="userinfo.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('userinfo')">提交</el-button>
      <el-button @click="resetForm('userinfo')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Account',
  data () {
    const validate = (rule, value, callback) => {
      value === '' && callback(new Error('输入不能为空'))
    }
    return {
      userinfo: {
        name: '',
        pass: ''
      },
      rules: {
        name: [{ validator: validate, trigger: 'blur' }],
        pass: [{ validator: validate, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      let info = this.userinfo
      if (info.name !== '' && info.pass !== '') {
        this.registerLogin()
      }
    },
    async registerLogin(info) {
      try {
        let res = await this.$http.post(this.api.login, { user: this.userinfo })
        if (res.errNo === 0) {
          this.$router.push('/order')
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

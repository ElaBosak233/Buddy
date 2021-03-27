<template>
  <div>
    <br/>
    <v-row>
      <v-col cols="1" md="3"></v-col>
      <v-col cols="10" md="6">
        <v-alert
          color="red"
          type="error"
          v-show="failed"
        >无法连接至 LeanCloud 服务，请确认 LeanCloud 已初始化</v-alert>
        <v-alert dense type="success" v-show="success">注册成功，请登录以继续</v-alert>
        <v-alert dense type="error" v-show="fail">注册失败，请检查你的信息是否有误</v-alert>
        <v-card
          elevation="2"
        >
          <v-card-title><v-icon left>fas fa-map-signs</v-icon>注册 Buddy 以使用更多功能</v-card-title>
          <v-card-subtitle>已有 Buddy 账号？在此 <strong><a @click="goLogin">登录</a></strong></v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div class="form-group">
                  <label for="username">用户名</label>
                  <input type="text" class="form-control" id="username" v-model="regInfo.username">
                </div>
              </v-col>
              <v-col cols="6">
                <div class="form-group">
                  <label for="nick">昵称</label>
                  <input type="text" class="form-control" id="nick" v-model="regInfo.nick">
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8">
                <div class="form-group">
                <label for="email">邮箱</label>
                <input type="email" class="form-control" id="email" v-model="regInfo.email">
              </div>
              </v-col>
              <v-col cols="4">
                <div class="form-group">
                  <label for="qq">QQ</label>
                  <input type="text" class="form-control" id="qq" v-model="regInfo.qq">
                </div>
              </v-col>
            </v-row>
            <div class="form-group">
              <label for="password">密码</label>
              <input type="password" class="form-control" id="password" v-model="regInfo.password">
            </div>
            <br/>
            <button class="btn btn-primary block btn-block" @click="register">注册</button>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="1" md="3"></v-col>
    </v-row>
    <br/>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data: () => {
    return {
      regInfo: {
        username: '',
        email: '',
        nick: '',
        qq: '',
        password: ''
      },
      success: false,
      fail: false,
      failed: false
    }
  },
  methods: {
    goLogin: function () {
      this.$router.push({ path: '/login' })
      document.title = '登录 - Buddy'
      this.$store.state.NavbarTitle = '登录'
    },
    register: function () {
      const AV = this.$store.state.AV
      try {
        const user = new AV.User()
        user.setUsername(this.regInfo.username)
        user.setEmail(this.regInfo.email)
        user.setPassword(this.regInfo.password)
        user.set('qq', this.regInfo.qq)
        user.set('nick', this.regInfo.nick)
        user.set('permission', 'tourist')
        user.set('avatar', 'http://q1.qlogo.cn/g?b=qq&nk=' + String(this.regInfo.qq) + '&s=640')
        user.signUp().then((user) => {
          this.fail = false
          this.success = true
          const theSelf = this
          setTimeout(function () {
            theSelf.goLogin()
          }, 2000)
        })
      } catch (error) {
        this.fail = true
      }
    }
  },
  created () {
    const AV = this.$store.state.AV
    if (AV.applicationId == null || AV.applicationKey == null) {
      this.failed = true
      console.log('%c' + '[Register] 注册界面渲染异常，请确认是否初始化 LeanCloud，以及数据结构是否正确', 'color:' + 'red')
    }
  }
}
</script>

<style scoped>

</style>

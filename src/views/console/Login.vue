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
        <v-alert
          color="red"
          dense
          type="error"
          v-show="fail"
        >登录失败，请检查你的用户名、密码</v-alert>
        <v-card
          elevation="2"
        >
          <v-card-title><v-icon left>fas fa-walking</v-icon>登录 Buddy 以使用更多功能</v-card-title>
          <v-card-subtitle>没有 Buddy 账号？请联系本 Buddy 的管理员注册账号！</v-card-subtitle>
          <v-card-text>
            <div class="form-group">
              <label for="username">用户名</label>
              <input type="text" class="form-control" id="username" v-model="username">
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input type="password" class="form-control" id="password" v-model="password">
            </div>
<!--            <v-row>-->
<!--              <v-col cols="6">-->
<!--                <div class="form-group form-check" style="text-align: center">-->
<!--                <input type="checkbox" class="form-check-input" id="saveUsername">-->
<!--                <label class="form-check-label" for="saveUsername" v-bind="saveUsername">记住用户名</label>-->
<!--              </div>-->
<!--              </v-col>-->
<!--              <v-col cols="6">-->
<!--                <div class="form-group form-check" style="text-align: center">-->
<!--                <input type="checkbox" class="form-check-input" id="autoLogin">-->
<!--                <label class="form-check-label" for="autoLogin" v-bind="autoLogin" @click="autoLogin = true; saveUsername = true">自动登录</label>-->
<!--              </div>-->
<!--              </v-col>-->
<!--            </v-row>-->
            <br />
            <button class="btn btn-primary block btn-block" @click="login">登录</button>
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
  name: "Login",
  data: () => {
    return {
      username: "",
      password: "",
      // saveUsername: false,
      // autoLogin: false,
      fail: false,
      failed: false
    };
  },
  methods: {
    goRegister: function () {
      this.$router.push({ path: "/register" });
      document.title = "注册 - Buddy";
      this.$store.state.NavbarTitle = "注册";
    },
    login: function () {
      const AV = this.$store.state.AV;
      try {
        AV.User.logIn(this.username, this.password).then((user) => {
          // 登陆成功
          this.$store.state.userInfo.username = this.username;
          const userQuery = new AV.Query("_User");
          userQuery.get(user.getObjectId()).then((res) => {
            localStorage.sessionToken = AV.User.current().getSessionToken();
            this.fail = false;
            this.$store.state.userInfo.nick = res.get("nick");
            this.$store.state.userInfo.qq = res.get("qq");
            this.$store.state.userInfo.email = res.getEmail();
            this.$store.state.userInfo.permission = res.get("permission");
            this.$store.state.userInfo.objectId = user.getObjectId();
            this.$store.state.userInfo.logined = true;
            this.$router.push({ path: "/console" });
            this.$store.state.NavbarTitle = "控制台";
          });
          // eslint-disable-next-line handle-callback-err
        }, (error) => {
          this.fail = true;
          console.log(error);
        });
      } catch (error) {
        this.fail = true;
      }
    }
  },
  created () {
    document.title = "登录 - Buddy";
    this.$store.state.NavbarTitle = "登录";
    const AV = this.$store.state.AV;
    if (AV.applicationId == null || AV.applicationKey == null) {
      this.failed = true;
      console.log("%c" + "[Login] 登陆界面渲染异常，请确认是否初始化 LeanCloud，以及数据结构是否正确", "color:" + "red");
    }
  }
};
</script>

<style scoped>

</style>

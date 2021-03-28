<template>
  <v-container>
    <v-snackbar
      v-model="stats.ok"
      color="success"
      bottom
      right
    >
      <v-icon left>fab fa-telegram-plane</v-icon>已修改
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="stats.ok = false"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="stats.error"
      color="error"
      bottom
      right
    >
      <v-icon left>fab fa-telegram-plane</v-icon>修改失败
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="stats.error = false"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>
    <!-- 资料修改 -->
    <v-card outlined shaped elevation="2">
      <v-card-title><v-icon left>fas fa-user-edit</v-icon>个人资料更改</v-card-title>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="username"
                label="用户名（不可更改）"
                outlined
                dense
                disabled
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="nick"
                :rules="nameRules"
                :counter="10"
                label="昵称"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                outlined
                required
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="qq"
                label="QQ"
                :counter="10"
                type="number"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="avatar"
                label="头像 URL（从 QQ 号获取）"
                outlined
                disabled
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="permission"
                label="权限组（不可更改）"
                outlined
                required
                disabled
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="Password.new"
                label="新密码"
                type="password"
                outlined
                color="orange"
                dense
                hint="更改密码将登出，需要重新登录"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="updateUser"
            >
              <v-icon left>fas fa-sync-alt</v-icon>更新
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
    <br/>
    <v-row>
      <v-col cols="12" md="6">
        <!-- 删除账号 -->
        <v-card outlined shaped dark color="red" elevation="2">
          <v-card-title><v-icon left>fas fa-times</v-icon>删除账号</v-card-title>
          <v-card-subtitle v-show="deleteUser.disable">管理员账号无法删除</v-card-subtitle>
          <v-card-text>
            <v-btn block color="red darken-4" @click="deleteConfirm = true" :disabled="deleteUser">
              账号将被永久删除，请谨慎考虑！（真的很久！！）
            </v-btn>
          </v-card-text>
        </v-card>
        <v-dialog
          v-model="deleteUser.confirm"
          width="500"
        >
          <v-card>
            <v-card-title class="headline grey lighten-2">
              最后确认一遍
            </v-card-title>
            <v-card-text>
              你真的要删除这个账号吗？
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red"
                text
                @click="deleteUser.confirm = false"
              >
                确定删除
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="12" md="6"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PersonalSettings',
  data: () => ({
    valid: false,
    deleteUser: {
      confirm: false,
      disable: false
    },
    stats: {
      error: false,
      ok: false
    },
    username: '',
    nick: '',
    qq: '',
    avatar: '',
    permission: '',
    Password: {
      new: ''
    },
    qqRules: [
      v => !!v || '必填',
      v => v.length <= 10 || 'QQ 号不允许多于 10 位'
    ],
    nameRules: [
      v => !!v || '必填',
      v => v.length <= 10 || '昵称不允许多于 10 个字符'
    ],
    email: '',
    emailRules: [
      v => !!v || '必填',
      v => /.+@.+/.test(v) || 'Email 格式不合法'
    ]
  }),
  methods: {
    updateUser: function () {
      const AV = this.$store.state.AV
      AV.User.current().set('qq', this.qq)
      AV.User.current().set('avatar', 'http://q1.qlogo.cn/g?b=qq&nk=' + this.qq + '&s=640')
      AV.User.current().set('nick', this.nick)
      AV.User.current().setEmail(this.email)
      if (this.Password.new !== '') {
        AV.User.current().setPassword(this.Password.new)
      }
      AV.User.current().save().then(() => {
        this.stats.ok = true
        if (this.Password.new !== '') {
          localStorage.removeItem('sessionToken')
          location.reload()
        }
      }, (e) => {
        this.stats.error = true
      })
    }
  },
  mounted () {
    const AV = this.$store.state.AV
    this.username = AV.User.current().getUsername()
    this.nick = AV.User.current().get('nick')
    this.email = AV.User.current().getEmail()
    this.qq = AV.User.current().get('qq')
    this.avatar = AV.User.current().get('avatar')
    this.permission = AV.User.current().get('permission')
    if (this.permission === 'admin') {
      this.deleteUser.disable = true
    }
  }
}
</script>

<style scoped>

</style>

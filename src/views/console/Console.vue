<template>
  <div>
    <br/>
    <v-navigation-drawer
      id="sideBar"
      permanent
      expand-on-hover
      absolute
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="User.avatar"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link @click="Show = {}; Show.homePage = true">
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ User.nick }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ User.username }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-show="List.personalSettings"></v-divider>
        <v-list-item v-show="List.personalSettings" dense link @click="Show = {}; Show.personalSettings = true">
          <v-list-item-icon>
            <v-icon color="blue">fas fa-user-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>个人资料</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item v-show="List.microPrograms" link @click="Show = {}; Show.microPrograms = true">
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>小程序</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>班级管理</v-list-item-title>
        </v-list-item>
        <v-list-item link v-show="List.permissionSettings">
          <v-list-item-icon>
            <v-icon color="orange">mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title><div style="color: orange">权限管理</div></v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >
        <v-list-item link @click="logOut">
          <v-list-item-icon>
            <v-icon color="red">fas fa-sign-out-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-title><div style="color: red; font-weight: bold">退出登录</div></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div id="HomePage" v-show="Show.homePage">
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4" style="font-weight: bold;"><v-icon left>fas fa-terminal</v-icon>Buddy 控制台</h1>
          <p class="lead">这里集中着各种能让 Buddy 发光发亮的控制拉杆</p>
          <hr class="my-4">
        </div>
      </div>
    </div>
    <v-container id="container">
      <PersonalSettings v-show="Show.personalSettings" />
      <MicroPrograms v-show="Show.microPrograms" />
    </v-container>

  </div>
</template>

<script>
import MicroPrograms from '@/views/console/list/MicroPrograms'
import PersonalSettings from '@/views/console/list/PersonalSettings'
export default {
  name: 'Dashboard',
  components: { PersonalSettings, MicroPrograms },
  data: () => {
    return {
      Show: {
        homePage: true,
        microPrograms: false,
        personalSettings: false
      },
      List: {
        microPrograms: false,
        personalSettings: true,
        permissionSettings: false
      },
      User: {
        avatar: '',
        username: '',
        nick: '',
        permission: ''
      }
    }
  },
  methods: {
    logOut: function () {
      const AV = this.$store.state.AV
      AV.User.logOut().then(() => {
        localStorage.removeItem('sessionToken')
        location.reload()
      })
    }
  },
  mounted () {
    const AV = this.$store.state.AV
    this.User.username = AV.User.current().getUsername()
    this.User.nick = AV.User.current().get('nick')
    this.User.avatar = AV.User.current().get('avatar')
    this.User.permission = AV.User.current().get('permission')
    /**
     * 权限判断
     */
    if (this.User.permission === ('admin' || 'teacher' || 'monitor')) {
      this.List.microPrograms = true
      this.List.permissionSettings = true
    }
    console.log('%c' + '[Console] 控制台渲染完成', 'color:' + 'green')
  }
}
</script>

<style scoped>
#container {
  padding-left: 70px;
}
</style>

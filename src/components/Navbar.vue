<template>
  <div>
    <v-toolbar
      dark
      prominent
      src="https://picsum.photos/1920/1080?random"
      flat
    >
      <v-menu
        bottom
        offset-y
        top
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-btn
              block
              text
              @click="btnNavClick(item.title,item.route)"
            >
              <v-list-item-icon><v-icon v-text="item.icon"></v-icon></v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="btnNavClick('首页','home')"><v-icon left>fas fa-home</v-icon>首页</v-btn>
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text><v-icon left>fab fa-js-square</v-icon>功能</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in features"
            :key="index"
          >
            <v-btn
              block
              text
              @click="btnNavClick(item.title,item.route)"
            >
              <v-list-item-icon><v-icon v-text="item.icon"></v-icon></v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text href="https://afdian.net/@ElaBosak233" target="_blank"><v-icon left>fab fa-500px</v-icon>赞助</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    title: 'Buddy',
    items: [
      {
        title: '首页',
        icon: 'fas fa-home',
        route: 'home'
      },
      {
        title: '随机点名',
        icon: 'fas fa-person-booth',
        route: 'RandomRollCall'
      },
      {
        title: '2048',
        icon: 'fas fa-puzzle-piece',
        route: '2048'
      }
    ],
    features: [
      {
        title: '随机点名',
        icon: 'fas fa-person-booth',
        route: 'RandomRollCall'
      },
      {
        title: '2048',
        icon: 'fas fa-puzzle-piece',
        route: '2048'
      },
      {
        title: '课程表',
        icon: 'fas fa-table',
        route: 'Curriculum'
      }
    ]
  }),
  methods: {
    btnNavClick: function (name, routeName) {
      if (routeName === 'home') {
        this.$router.push({ path: '/' })
        this.title = 'Buddy'
      } else {
        this.$router.push({ path: `/${routeName}` })
        this.title = name
      }
    }
  }
}
</script>

<style scoped>

</style>

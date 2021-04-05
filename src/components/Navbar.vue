<template>
  <div>
    <v-toolbar
      dark
      color="primary"
      src="http://l-by.cn/api/gqapi/gqapi.php"
      fade-img-on-scroll
      flat
    >
      <v-img max-height="35" max-width="35" src="https://avatars.githubusercontent.com/u/80180940?s=60&v=4"></v-img>
      <v-chip
        class="ma-2"
        color="primary"
        label
      >
        <v-toolbar-title style="font-weight: bold">
          {{ this.$store.state.NavbarTitle }}
        </v-toolbar-title>
      </v-chip>
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
      <v-btn text @click="btnNavClick('控制台', 'console')"><v-icon left>fab fa-500px</v-icon>我</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    features: [
      {
        title: "课程表",
        icon: "fas fa-table",
        route: "Curriculum"
      },
      {
        title: "公告板",
        icon: "fas fa-puzzle-piece",
        route: "Toast"
      },
      {
        title: "随机点名",
        icon: "fas fa-person-booth",
        route: "RandomRollCall"
      }
    ]
  }),
  methods: {
    btnNavClick: function (name, routeName) {
      if (routeName === "home") {
        this.$router.push({ path: "/" });
        this.$store.state.NavbarTitle = "Buddy";
      } else {
        if (this.$route.path === "/login" && `/${routeName}` === "/console") {
          return;
        }
        if (this.$route.path !== `/${routeName}`) {
          this.$router.push({ path: `/${routeName}` });
          this.$store.state.NavbarTitle = name;
        }
      }
    }
  }
};
</script>

<style scoped>

</style>

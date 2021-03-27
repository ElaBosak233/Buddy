<template>
  <v-app>
    <Navbar />
    <Agreement />
    <v-main>
      <Toast />
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Agreement from '@/components/Agreement'
import Toast from '@/components/Toast'
import Push from 'push.js'

export default {
  name: 'App',
  components: {
    Agreement,
    Footer,
    Navbar,
    Toast
  },
  data: () => ({
    //
  }),
  created () {
    /**
     * 请求 Push.js 的权限
     */
    Push.Permission.request()
    /**
     * 刷新回转主页
     */
    if (this.$router.path !== '/') {
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
@import "https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css";
</style>

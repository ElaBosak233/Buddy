<template>
  <v-app>
    <Navbar />
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
import Toast from '@/components/Toast'
import Push from 'push.js'

export default {
  name: 'App',
  components: {
    Footer,
    // eslint-disable-next-line vue/no-unused-components
    Navbar,
    Toast
  },
  data: () => ({
    //
  }),
  created () {
    Push.Permission.request()
  }
}
</script>

<style scoped>
@import "https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css"
</style>

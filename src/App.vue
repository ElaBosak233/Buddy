<template>
  <v-app>
    <Navbar />
    <v-main>
<!--      <keep-alive>-->
<!--        <router-view></router-view>-->
<!--      </keep-alive>-->
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'App',

  components: {
    Footer,
    // eslint-disable-next-line vue/no-unused-components
    Navbar
  },
  data: () => ({
    //
  }),
  created () {
  }
}
</script>

<style scoped>
@import "https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css"
</style>

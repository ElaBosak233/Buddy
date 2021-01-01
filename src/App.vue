<template>
  <v-app>
    <Navbar />
    <v-main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
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
  })
}
</script>

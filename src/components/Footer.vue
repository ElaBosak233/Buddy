<template>
  <v-card height="50">
    <v-footer
      absolute
      class="font-weight-medium"
      color="primary"
      dark
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Buddy.e23.in</strong>
      </v-col>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    icons: [
      "mdi-facebook",
      "mdi-twitter",
      "mdi-linkedin",
      "mdi-instagram"
    ]
  })
};
</script>

<style scoped>

</style>

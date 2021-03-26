<template>
  <div class="text-center ma-2">
    <v-btn
      dark
      color="blue"
      @click="snackbar = true"
    >
      Open Snackbar
    </v-btn>
    <v-snackbar
      v-model="snackbar"
      color="red"
      top
      right
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data: () => ({
    snackbar: false,
    text: 'Hello, I\'m a snackbar'
  }),
  created () {
  }
}
</script>

<style scoped>

</style>

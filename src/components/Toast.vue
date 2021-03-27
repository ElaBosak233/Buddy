<template>
  <div>
    <v-snackbar
      v-model="ToastData.open"
      :color=ToastData.type
      top
      right
      vertical
    >
      <h4><v-avatar color="primary" size="36px"><img :src="ToastData.messenger_avatar" /></v-avatar> {{ ToastData.messenger }} — {{ ToastData.title }}</h4>
      {{ ToastData.content }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="ToastData.open = false"
        >
          <v-icon>far fa-calendar-check</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Push from 'push.js'
export default {
  name: 'Toast',
  data: function () {
    return {
      ToastData: {
        open: false,
        type: '',
        title: '',
        content: '',
        messenger: '',
        messenger_avatar: ''
      }
    }
  },
  mounted () {
    const getToast = setInterval(() => {
      const AV = this.$store.state.AV
      if (AV.applicationId == null || AV.applicationKey == null) {
      } else {
        const toastQuery = new AV.Query('Toast')
        toastQuery.descending('updatedAt')
        const ToastData = this.ToastData
        toastQuery.first().then(function (res) {
          const d = new Date()
          if (d.getTime() - res.get('updatedAt').getTime() <= 11000) {
            /**
             * Snackbar 发送消息
             */
            ToastData.title = res.get('title')
            ToastData.content = res.get('content')
            ToastData.messenger = res.get('messenger')
            ToastData.type = res.get('type')
            ToastData.messenger_avatar = res.get('messenger_avatar')
            ToastData.open = true
            /**
             * Push.js 向桌面发送消息
             */
            Push.create(ToastData.messenger + ' — ' + ToastData.title, {
              body: ToastData.content,
              icon: 'https://i.loli.net/2021/03/27/SQmOWxoejaRBXIf.png',
              timeout: 5000,
              onClick: function () {
                window.focus()
                this.close()
              }
            })
            console.log('%c' + '[Toast] 新通知来自 ' + ToastData.messenger, 'color:' + 'blue')
          }
        })
      }
    }, 10000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(getToast)
    })
  }
}
</script>

<style scoped>

</style>

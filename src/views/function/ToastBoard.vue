<template>
  <div>
    <br/>
    <v-row>
      <v-col cols="1" md="3"></v-col>
      <v-col cols="10" md="6">
        <v-alert
          color="red"
          type="error"
          v-show="failed"
        >无法连接至 LeanCloud 服务，请确认 LeanCloud 已初始化</v-alert>
        <br/>
        <div v-for="(item, index) in ToastData" v-bind:key="index">
          <v-card
            elevation="2"
            :color=item.type
            outlined
            dark
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  {{ item.messenger }}
                </div>
                <v-list-item-title class="headline mb-1">
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-content style="color: white; line-height: 135%; font-family: 等线">{{ item.content }}</v-list-item-content>
              </v-list-item-content>

              <v-list-item-avatar
                size="80"
                color="grey"
                rounded="rounded-circle"
              ><img :src="item.messenger_avatar" /></v-list-item-avatar>
            </v-list-item>
          </v-card>
          <br />
        </div>
      </v-col>
      <v-col cols="1" md="3"></v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ToastBoard',
  data: function () {
    return {
      ToastData: [],
      failed: false
    }
  },
  created () {
    const AV = this.$store.state.AV
    if (AV.applicationId == null || AV.applicationKey == null) {
      this.failed = true
      console.log('%c' + '[ToastBoard] 公告板渲染异常，请确认是否初始化 LeanCloud，以及数据结构是否正确', 'color:' + 'red')
    } else {
      this.failed = false
      const toastQuery = new AV.Query('Toast')
      toastQuery.descending('updatedAt')
      const ToastData = this.ToastData
      toastQuery.find().then(function (res) {
        for (let i = 0; i < res.length; i++) {
          ToastData.push({
            type: res[i].get('type'),
            title: res[i].get('title'),
            content: res[i].get('content'),
            messenger: res[i].get('messenger'),
            messenger_avatar: res[i].get('messenger_avatar'),
            time: res[i].get('updatedAt')
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

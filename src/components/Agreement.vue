<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          <strong><i class="fas fa-balance-scale"></i> 使用协议</strong>
        </v-card-title>
        <v-card-text>
          <br/>
          <center><img width=60% height=60% src="https://i.loli.net/2021/03/27/VYxbsUaAvyOgoEi.png" ></center>
          <br/>
          <center><code>本软件遵循 GNU GPL v3 协议开源，并且杜绝一切未经允许的滥用行为！</code></center>
          <center><img src="https://img.shields.io/badge/%E4%BD%9C%E8%80%85-%40ElaBosak233-success?style=flat-square&logo=github"> <img src="https://img.shields.io/badge/%E7%89%88%E6%9C%AC%E5%8F%B7-2.0.0-blue?style=flat-square&logo=git&logoColor=white"> <img src="https://img.shields.io/github/languages/code-size/ElaBosak233/Buddy?color=orange&label=%E4%BB%A3%E7%A0%81%E5%AE%B9%E9%87%8F&logo=jira&logoColor=white&style=flat-square"></center>
          <br/>
          <center>Buddy 正处于内测阶段，系统可能由于各种不稳定因素导致数据丢失或数据溢出，请按照文档规范使用 Buddy，请协助作者杜绝一切滥用行为！支持原创，支持正版，谢谢！</center>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            我已知晓
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Agreement',
  data: function () {
    return {
      dialog: false
    }
  },
  created () {
    if (localStorage.appFirstLoaded === false || localStorage.appFirstLoaded == null) {
      console.log('已弹出')
      this.dialog = true
    }
  }
}
</script>

<style scoped>

</style>

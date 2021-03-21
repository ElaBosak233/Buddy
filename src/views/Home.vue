<template>
  <v-container>
      <v-alert
        color="green"
        type="success"
        v-show="success"
      >Buddy 已成功获取到数据，现在可以使用 Buddy 的各种功能啦！</v-alert>
      <v-alert
        color="red"
        type="error"
        v-show="failed"
      >无法连接至 LeanCloud 服务，请检查你的 AppID 和 AppKey 是否正确</v-alert>
    <v-row>
      <v-col cols="12" md="4" sm="4">
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://i.loli.net/2021/01/01/lkpXNGUqwgeaz8n.png"
          >
            <v-card-title>Buddy 巴蒂</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">Powered by <strong><a href='http://github.com/ElaBosak233' target='_blank'>@ElaBosak233</a></strong></v-card-subtitle>
          <v-card-text class="text--primary">
            <HR />
            <v-alert
              color="blue"
              type="info"
            >请给 Buddy 提供数据源</v-alert>
            <v-row>
              <v-col cols="1"></v-col>
              <v-col cols="10">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">AppID</span>
                  </div>
                  <input :disabled="textFieldDisable" v-model="$store.state.appId" type="text" class="form-control" placeholder="请输入 AppID" aria-label="" aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">AppKey</span>
                  </div>
                  <input :disabled="textFieldDisable" v-model="$store.state.appKey" type="text" class="form-control" placeholder="请输入 AppKey" aria-label="" aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">MasterKey</span>
                  </div>
                  <input :disabled="textFieldDisable" v-model="$store.state.masterKey" type="password" class="form-control" placeholder="请输入 AppKey" aria-label="" aria-describedby="basic-addon1">
                </div>
                <!--              <v-btn v-bind:loading="stats.loading" large color="primary" @click="load(url)">载入</v-btn>-->
                <v-btn block large :disabled="btnStats.disable" :color="btnStats.color" :loading="btnStats.loading" @click="load">{{btnStats.text}}</v-btn>
              </v-col>
              <v-col cols="1"></v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" sm="8" >
        <v-carousel cycle show-arrows-on-hover hide-delimiters>
          <template v-slot:prev="{ on, attrs }">
            <v-btn
              color="success"
              v-bind="attrs"
              v-on="on"
              large
            ><v-icon>fas fa-arrow-left</v-icon></v-btn>
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn
              color="info"
              v-bind="attrs"
              v-on="on"
              large
            ><v-icon>fas fa-arrow-right</v-icon></v-btn>
          </template>
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    items: [
      {
        src: 'https://i.loli.net/2021/01/01/k7JoAO1M8XUT6aV.png'
      },
      {
        src: 'https://i.loli.net/2021/01/01/AycGBmqjKXQ1Es6.png'
      },
      {
        src: 'https://i.loli.net/2021/01/01/w3XCbI8PZBdKTm7.png'
      },
      {
        src: 'https://i.loli.net/2021/01/01/AnaQkKuJYFqlm3s.png'
      }
    ],
    cardColor: 'blue darken-3',
    btnStats: {
      loading: false,
      text: '载入数据源',
      color: 'success',
      disable: true
    },
    success: false,
    failed: false,
    textFieldDisable: true
  }),
  methods: {
    load: function () {
      try {
        const AV = this.$store.state.AV
        AV.init({
          appId: this.$store.state.appId,
          appKey: this.$store.state.appKey,
          masterKey: this.$store.state.masterKey
        })
        const Exception = AV.Object.extend('Init')
        const exception = new Exception()
        exception.set('Date', this.getNowFormatDate())
        exception.save().then((todo) => {
          todo.getObjectId()
          console.log('%c' + '[LeanCloud]数据源初始化成功', 'color:' + 'green')
          this.textFieldDisable = true
          this.btnStats.disable = true
          this.failed = false
          this.success = true
        }, (error) => {
          console.log('%c' + '[LeanCloud]数据源初始化失败 ' + error, 'color:' + 'red')
          this.failed = true
        })
      } catch (e) {
        console.log('%c' + '[LeanCloud]数据源初始化失败 ' + e, 'color:' + 'red')
        this.failed = true
      }
    },
    getNowFormatDate: function () {
      const date = new Date()
      const seperator1 = '-'
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      return year + seperator1 + month + seperator1 + strDate
    }
  },
  created: function () {
    const AV = this.$store.state.AV
    if (AV.applicationKey == null || AV.applicationId == null) {
      this.textFieldDisable = false
      this.btnStats.disable = false
    } else {
      this.success = true
    }
    for (let i = 0; i < this.items.length; i++) {
      const image = new Image()
      image.src = this.items[i].src
      // eslint-disable-next-line no-unused-expressions
      image.onload
    }
    console.log('%c' + '[Buddy]主界面加载完成', 'color:' + 'green')
  }
}
</script>

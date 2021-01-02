<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="4">
      </v-col>
      <v-col cols="12" md="4" sm="4" >
        <v-row>
          <v-col cols="9">
            <v-text-field v-model="url"
              label="请提供 JSON 地址"
              single-line
              solo
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn v-bind:loading="stats.loading" depressed large color="primary" @click="load(url)">载入</v-btn>
          </v-col>
        </v-row>
        <v-alert
          color="red"
          type="error"
          v-show="showAlert"
        >请提供正确的 JSON 地址</v-alert>
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-card-text>
            <div>已载入 {{length}} 条数据，频率 {{hz}} 毫秒，数据版本 {{version}}</div>
            <v-row>
              <v-col cols="12" md="8" sm="8">
                <p class="display-1 text--primary">
                  {{ info.real }}
                </p>
              </v-col>
              <v-col cols="12" md="4" sm="4">
                <v-avatar size="62">
                  <img v-bind:src="info.avatar">
                </v-avatar>
              </v-col>
            </v-row>
            <p>{{ info.name }}</p>
            <!--div class="text--primary">
              {{ info.description }}
            </div-->
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              v-bind:color="stats.color"
              @click="go"
            >
              {{stats.text}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="4">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RandomRollCall',
  data: () => ({
    url: '',
    showAlert: false,
    json: '',
    // eslint-disable-next-line no-undef
    length: 0,
    version: 'N/A',
    hz: 0,
    times: 0,
    timer: '',
    stats: {
      id: 0,
      text: '点我开始',
      color: '#2196F3',
      loading: false
    },
    info: {
      name: 'Buddy',
      real: '伍宏杰',
      id: null,
      avatar: '',
      description: 'My name is Buddy, and this tool is Buddy too.',
      egg: null
    }
  }),
  methods: {
    load: function (url) {
      // eslint-disable-next-line no-undef,eqeqeq
      if (url === '') {
        this.showAlert = true
        this.stats.loading = false
        return
      }
      this.stats.loading = true
      const self = this
      // eslint-disable-next-line no-undef
      axios.get(url).then(function (res) {
        try {
          self.json = res.data
          self.hz = res.data.hz
          self.length = res.data.data.length
          self.version = res.data.version
        } catch (err) {
          self.showAlert = true
          self.stats.loading = false
          return
        }
        // eslint-disable-next-line no-undef
        for (var i = 0; i < self.length; i++) {
          if (res.data.data[i].qq != null) {
            const image = new Image()
            image.src = 'http://q1.qlogo.cn/g?b=qq&nk=' + String(self.json.data[i].qq) + '&s=640'
            // eslint-disable-next-line no-unused-expressions
            image.onload
          } else if (res.data.data[i].avatar != null) {
            const image = new Image()
            image.src = 'http://q1.qlogo.cn/g?b=qq&nk=' + String(self.json.data[i].avatar) + '&s=640'
            // eslint-disable-next-line no-unused-expressions
            image.onload
          }
        }
        console.log(res.data)
        self.showAlert = false
        self.stats.loading = false
      }).catch(function (err) {
        self.showAlert = true
        self.stats.loading = false
        console.log(err)
      })
    },
    go: function () {
      if (this.stats.id === 0) {
        this.stats.id = 1
        this.stats.text = '点我结束'
        this.stats.color = '#D81B60'
        this.timer = setInterval(() => {
          // 定义随机变量 i
          var i = Math.floor((Math.random() * this.length))
          // 初始化，删除彩蛋和描述内容
          this.info.egg = null
          this.info.description = null
          // 覆盖 id、name、real
          this.info.id = this.json.data[i].id
          this.info.name = this.json.data[i].name
          this.info.real = this.json.data[i].real
          // 优先选择 QQ 头像作为图案，要么就来源于图床
          if (this.json.data[i].qq != null) {
            this.info.avatar = 'http://q1.qlogo.cn/g?b=qq&nk=' + String(this.json.data[i].qq) + '&s=640'
          } else if (this.json.data[i].avatar != null) {
            this.info.avatar = String(this.json.data[i].avatar)
          }
          // 显示描述内容（如果有）
          if (this.json.data[i].description != null) {
            this.info.description = String(this.json.data[i].description)
          }
        }, this.hz)
      } else {
        this.stats.id = 0
        this.stats.text = '点我开始'
        this.stats.color = '#2196F3'
        clearInterval(this.timer)
        // 显示彩蛋（如果有）
        if (this.json.data[this.info.id - 1].egg != null) {
          this.info.egg = String(this.json.data[this.info.id - 1].egg)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>

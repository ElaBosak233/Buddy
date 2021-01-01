<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" sm="3">
      </v-col>
      <v-col cols="12" md="6" sm="6" >
        <v-row>
          <v-col cols="12" md="10" sm="10" >
            <v-text-field v-model="url"
              label="请提供 JSON 地址"
              single-line
              solo
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="2" sm="2" >
            <v-btn depressed large color="primary" @click="load(url)">载入</v-btn>
          </v-col>
        </v-row>
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
      <v-col cols="12" md="3" sm="3">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RandomRollCall',
  data: () => ({
    url: '',
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
      color: '#2196F3'
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
      // eslint-disable-next-line no-undef
      axios.get(url).then(res => {
        this.json = res.data
        this.hz = res.data.hz
        this.length = res.data.data.length
        this.version = res.data.version
        console.log(res.data)
      }, function (err) {
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

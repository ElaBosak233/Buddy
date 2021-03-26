<template>
  <v-container>
    <br/>
    <v-alert
      color="red"
      type="error"
      v-show="failed"
    >无法连接至 LeanCloud 服务，请确认 LeanCloud 已初始化</v-alert>
    <br/>
    <v-row>
      <v-col cols="12" md="4" sm="4">
      </v-col>
      <v-col cols="12" md="4" sm="4" >
        <br/>
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-card-text>
            <div>已载入 {{length}} 条数据，频率 <input type="text" v-model="refresh_rate" style="width: 20px" /> 毫秒</div>
            <v-row>
              <v-col cols="8">
                <p class="display-1 text--primary">
                  {{ info.name }}
                </p>
              </v-col>
              <v-col cols="4">
                <v-avatar size="62">
                  <img v-bind:src="info.avatar">
                </v-avatar>
              </v-col>
            </v-row>
            <p>{{ info.nick }}</p>
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
        <br/>
      </v-col>
      <v-col cols="12" md="4" sm="4">
      </v-col>
    </v-row>
    <div v-html="info.egg" style="margin: 0 auto"></div>
  </v-container>
</template>

<script>
export default {
  name: 'RandomRollCall',
  data: () => ({
    length: 0,
    version: 'N/A',
    refresh_rate: 1,
    times: 0, // 计次
    timer: '', // 循环
    array: {
      id: [],
      name: [],
      nick: [],
      qq: [],
      avatar: []
    },
    stats: {
      id: 0,
      text: '点我开始',
      color: '#2196F3',
      loading: false
    },
    info: {
      id: null,
      name: '巴蒂',
      nick: 'Buddy',
      avatar: 'https://i.loli.net/2021/01/02/p7wxZNiaFfutEyG.png',
      egg: null
    },
    failed: false
  }),
  methods: {
    go: function () {
      const i = Math.floor((Math.random() * this.length))
      if (this.stats.id === 0) {
        this.stats.id = 1
        this.stats.text = '点我结束'
        this.stats.color = '#D81B60'
        this.timer = setInterval(() => {
          // 定义随机变量 i
          // 初始化，删除彩蛋和描述内容
          this.info.egg = null
          // 覆盖 id、name、real
          this.info.id = this.array.id[i]
          this.info.name = this.array.name[i]
          this.info.nick = this.array.nick[i]
          // 优先选择 QQ 头像作为图案，要么就来源于图床
          if (this.array.qq[i] != null) {
            this.info.avatar = 'http://q1.qlogo.cn/g?b=qq&nk=' + String(this.array.qq[i]) + '&s=640'
          } else if (this.array.avatar[i] != null) {
            this.info.avatar = String(this.array.avatar[i])
          }
        }, this.refresh_rate)
      } else {
        this.stats.id = 0
        this.stats.text = '点我开始'
        this.stats.color = '#2196F3'
        clearInterval(this.timer)
        // // 显示彩蛋（如果有）
        // if (this.array.egg[i - 1] != null) {
        //   this.info.egg = String(this.array.egg[i - 1])
        // }
      }
    }
  },
  created () {
    const AV = this.$store.state.AV
    if (AV.applicationId == null || AV.applicationKey == null) {
      this.failed = true
      console.log('%c' + '[RandomRollCall] 随机点名渲染异常，请确认是否初始化 LeanCloud，以及数据结构是否正确', 'color:' + 'red')
    } else {
      const students = new AV.Query('Student')
      students.ascending('id')
      students.find().then((array) => {
        this.length = array.length
        array.forEach((todo) => {
          this.array.id.push(todo.get('id'))
          this.array.name.push(todo.get('username'))
          this.array.nick.push(todo.get('nick'))
          this.array.qq.push(todo.get('qq'))
          this.array.avatar.push(todo.get('avatar'))
        })
        for (let i = 0; i < self.length; i++) {
          if (this.array.qq[i] != null) {
            const image = new Image()
            image.src = 'http://q1.qlogo.cn/g?b=qq&nk=' + String(this.array.qq[i]) + '&s=640'
            // eslint-disable-next-line no-unused-expressions
            image.onload
          } else if (this.array.avatar[i] != null) {
            const image = new Image()
            image.src = 'http://q1.qlogo.cn/g?b=qq&nk=' + String(this.array.avatar[i]) + '&s=640'
            // eslint-disable-next-line no-unused-expressions
            image.onload
          }
        }
      })
      console.log('%c' + '[RandomRollCall] 随机点名渲染完成', 'color:' + 'green')
    }
  }
}
</script>

<style scoped>

</style>

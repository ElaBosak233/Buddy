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
<!--            <p>{{ info.nick }}</p>-->
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
    array: [],
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
      let i = Math.floor((Math.random() * this.length))
      if (this.stats.id === 0) {
        this.stats.id = 1
        this.stats.text = '点我结束'
        this.stats.color = '#D81B60'
        this.timer = setInterval(() => {
          // 定义随机变量 i
          // 初始化，删除彩蛋和描述内容
          this.info.egg = null
          // 覆盖 id、name、real
          this.info.id = this.array[i].id
          this.info.name = this.array[i].name
          this.info.nick = this.array[i].nick
          this.info.avatar = this.array[i].avatar
          i = Math.floor((Math.random() * this.length))
        }, this.refresh_rate)
      } else {
        this.stats.id = 0
        this.stats.text = '点我开始'
        this.stats.color = '#2196F3'
        clearInterval(this.timer)
      }
    }
  },
  mounted () {
    const AV = this.$store.state.AV
    if (AV.applicationId == null || AV.applicationKey == null) {
      this.failed = true
      console.log('%c' + '[RandomRollCall] 随机点名渲染异常，请确认是否初始化 LeanCloud，以及数据结构是否正确', 'color:' + 'red')
    } else {
      const students = new AV.Query('_User')
      students.equalTo('permission', 'student')
      students.ascending('id')
      students.find().then((array) => {
        this.length = array.length
        array.forEach((todo) => {
          const data = {
            id: todo.get('id'),
            name: todo.get('real'),
            nick: todo.get('nick'),
            qq: todo.get('qq'),
            avatar: todo.get('avatar')
          }
          this.array.push(data)
        })
        for (let i = 0; i < self.length; i++) {
          const image = new Image()
          image.src = this.array[i].avatar
          // eslint-disable-next-line no-unused-expressions
          image.onload
        }
      })
      console.log('%c' + '[RandomRollCall] 随机点名渲染完成', 'color:' + 'green')
    }
  }
}
</script>

<style scoped>

</style>

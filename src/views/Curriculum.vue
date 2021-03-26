<template>
  <v-container>
    <br />
    <v-alert
      color="red"
      type="error"
      v-show="failed"
    >无法连接至 LeanCloud 服务，请确认 LeanCloud 已初始化</v-alert>
    <h1 style="text-align: center; font-family: 幼圆, sans-serif; font-weight: bold">本周课程表</h1>
    <br />
    <table class="table table-bordered" id="table">
      <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">第一节</th>
        <th scope="col">第二节</th>
        <th scope="col">第三节</th>
        <th scope="col">第四节</th>
        <th scope="col">第五节</th>
        <th scope="col">第六节</th>
        <th scope="col">第七节</th>
        <th scope="col">第八节</th>
        <th scope="col">第九节</th>
        <th scope="col">第十节</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <th scope="row"><v-chip
          color="green"
          dark
        >
          {{item.index}}
        </v-chip></th>
        <td>
          {{item.class[0]}}
        </td>
        <td>
          {{item.class[1]}}
        </td>
        <td>
          {{item.class[2]}}
        </td>
        <td>
          {{item.class[3]}}
        </td>
        <td>
          {{item.class[4]}}
        </td>
        <td>
          {{item.class[5]}}
        </td>
        <td>
          {{item.class[6]}}
        </td>
        <td>
          {{item.class[7]}}
        </td>
        <td>
          {{item.class[8]}}
        </td>
        <td>
          {{item.class[9]}}
        </td>
      </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>
export default {
  name: 'Curriculum',
  data: function () {
    return {
      items: [
        {
          index: '星期一',
          class: []
        },
        {
          index: '星期二',
          class: []
        },
        {
          index: '星期三',
          class: []
        },
        {
          index: '星期四',
          class: []
        },
        {
          index: '星期五',
          class: []
        }
      ],
      failed: false
    }
  },
  created () {
    const AV = this.$store.state.AV
    if (AV.applicationId == null || AV.applicationKey == null) {
      this.failed = true
      console.log('%c' + '[Curriculum] 课程表渲染异常，请确认是否初始化 LeanCloud，以及数据结构是否正确', 'color:' + 'red')
    } else {
      /**
       * 获取/创建星期一的课程表
       */
      const monday = new AV.Query('Curriculum')
      monday.equalTo('week', '星期一')
      monday.first().then((todo) => {
        this.items[0].class = todo.get('class')
      })

      /**
       * 获取/创建星期二的课程表
       */
      const tuesday = new AV.Query('Curriculum')
      tuesday.equalTo('week', '星期二')
      tuesday.first().then((todo) => {
        this.items[1].class = todo.get('class')
      })

      /**
       * 获取/创建星期三的课程表
       */
      const wednesday = new AV.Query('Curriculum')
      wednesday.equalTo('week', '星期三')
      wednesday.first().then((todo) => {
        this.items[2].class = todo.get('class')
      })

      /**
       * 获取/创建星期四的课程表
       */
      const thursday = new AV.Query('Curriculum')
      thursday.equalTo('week', '星期四')
      thursday.first().then((todo) => {
        this.items[3].class = todo.get('class')
      })

      /**
       * 获取/创建星期五的课程表
       */
      const friday = new AV.Query('Curriculum')
      friday.equalTo('week', '星期五')
      friday.first().then((todo) => {
        this.items[4].class = todo.get('class')
      })

      this.failed = false
      console.log('%c' + '[Curriculum] 课程表渲染完成', 'color:' + 'green')
    }
  }
}
</script>

<style scoped>
#table {
  font-size: 20px;
  font-family: 幼圆,sans-serif;
  font-weight: bold;
}
</style>

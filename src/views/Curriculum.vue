<template>
  <v-container>
    <br />
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
      default: ['第一节', '第二节', '第三节', '第四节', '第五节', '第六节', '第七节', '第八节', '第九节', '第十节'],
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
      ]
    }
  },
  created () {
    const AV = this.$store.state.AV
    // eslint-disable-next-line no-unused-vars
    let response = null
    // eslint-disable-next-line no-undef
    axios.get('https://' + this.$store.state.appId.substring(0, 8) + '.api.lncldglobal.com/1.1/schemas', { headers: { 'X-LC-Id': this.$store.state.appId, 'X-LC-Key': this.$store.state.masterKey + ',master' } }).then((res) => {
      response = res.data.Curriculum
      console.log(response)
    })
    /**
       * 获取/创建星期一的课程表
       */
    let monday = null
    if (response === 'undefined') {
      const MondayCreate = AV.Object.extend('Curriculum')
      const mondayCreate = new MondayCreate()
      mondayCreate.set('week', '星期一')
      mondayCreate.set('class', this.default)
      mondayCreate.save().then((todo) => {
        console.log(`保存成功，objectId：${todo.id}`)
      })
    }
    monday = new AV.Query('Curriculum')
    monday.equalTo('week', '星期一')
    monday.first().then((todo) => {
      this.items[0].class = todo.get('class')
    })

    /**
     * 获取/创建星期二的课程表
     */
    let tuesday = null
    if (response === 'undefined') {
      const TuesdayCreate = AV.Object.extend('Curriculum')
      const tuesdayCreate = new TuesdayCreate()
      tuesdayCreate.set('week', '星期二')
      tuesdayCreate.set('class', this.default)
      tuesdayCreate.save().then((todo) => {
        console.log(`保存成功，objectId：${todo.id}`)
      })
    }
    tuesday = new AV.Query('Curriculum')
    tuesday.equalTo('week', '星期二')
    tuesday.first().then((todo) => {
      this.items[1].class = todo.get('class')
    })

    /**
     * 获取/创建星期三的课程表
     */
    let wednesday = null
    if (response === 'undefined') {
      const WednesdayCreate = AV.Object.extend('Curriculum')
      const wednesdayCreate = new WednesdayCreate()
      wednesdayCreate.set('week', '星期三')
      wednesdayCreate.set('class', this.default)
      wednesdayCreate.save().then((todo) => {
        console.log(`保存成功，objectId：${todo.id}`)
      })
    }
    wednesday = new AV.Query('Curriculum')
    wednesday.equalTo('week', '星期三')
    wednesday.first().then((todo) => {
      this.items[2].class = todo.get('class')
    })

    /**
     * 获取/创建星期四的课程表
     */
    let thursday = null
    if (response === 'undefined') {
      const ThursdayCreate = AV.Object.extend('Curriculum')
      const thursdayCreate = new ThursdayCreate()
      thursdayCreate.set('week', '星期四')
      thursdayCreate.set('class', this.default)
      thursdayCreate.save().then((todo) => {
        console.log(`保存成功，objectId：${todo.id}`)
      })
    }
    thursday = new AV.Query('Curriculum')
    thursday.equalTo('week', '星期四')
    thursday.first().then((todo) => {
      this.items[3].class = todo.get('class')
    })

    /**
     * 获取/创建星期五的课程表
     */
    let friday = null
    if (response === 'undefined') {
      const FridayCreate = AV.Object.extend('Curriculum')
      const fridayCreate = new FridayCreate()
      fridayCreate.set('week', '星期五')
      fridayCreate.set('class', this.default)
      fridayCreate.save().then((todo) => {
        console.log(`保存成功，objectId：${todo.id}`)
      })
    }
    friday = new AV.Query('Curriculum')
    friday.equalTo('week', '星期五')
    friday.first().then((todo) => {
      this.items[4].class = todo.get('class')
    })

    console.log('%c' + '[Curriculum] 课程表渲染完成', 'color:' + 'green')
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

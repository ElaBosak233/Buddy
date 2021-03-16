<template>
  <v-container>
    <br />
    <v-data-table
    id="table"
    :headers="headers"
    :items="items"
    class="elevation-5 font-weight-bold"
    >
      <template v-slot:item.name="{ item }">
        <v-chip
          color="green"
          dark
        >
          {{ item.name }}
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'Curriculum',
  data: function () {
    return {
      headers: [
        {
          text: '周期',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: '第一节', value: '1', sortable: false },
        { text: '第二节', value: '2', sortable: false },
        { text: '第三节', value: '3', sortable: false },
        { text: '第四节', value: '4', sortable: false },
        { text: '第五节', value: '5', sortable: false },
        { text: '第六节', value: 'iron', sortable: false },
        { text: '第七节', value: 'iron', sortable: false },
        { text: '第八节', value: 'iron', sortable: false },
        { text: '第九节', value: 'iron', sortable: false },
        { text: '第十节', value: 'iron', sortable: false }
      ],
      items: [
        {
          name: '星期一',
          1: '数学',
          2: 6.0,
          3: 24,
          4: 4.0,
          5: '1%'
        },
        {
          name: '星期二',
          1: 237,
          2: 9.0,
          3: 37,
          4: 4.3,
          5: '1%'
        },
        {
          name: '星期三',
          1: 262,
          2: 16.0,
          3: 23,
          4: 6.0,
          5: '7%'
        },
        {
          name: '星期四',
          1: 262,
          2: 16.0,
          3: 23,
          4: 6.0,
          5: '7%'
        },
        {
          name: '星期五',
          1: 262,
          2: 16.0,
          3: 23,
          4: 6.0,
          5: '7%'
        }]
    }
  }
}
</script>

<style scoped>
#table {
  font-size: 500px;
}
</style>

<template>
  <v-container>
    <br />
    <table class="table table-bordered">
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
      <tr>
        <th scope="row"><v-chip
          color="green"
          dark
        >
          星期一
        </v-chip></th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row"><v-chip
          color="green"
          dark
        >
          星期二
        </v-chip></th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row"><v-chip
          color="green"
          dark
        >
          星期三
        </v-chip></th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
      <tr>
        <th scope="row"><v-chip
          color="green"
          dark
        >
          星期四
        </v-chip></th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
      <tr>
        <th scope="row"><v-chip
          color="green"
          dark
        >
          星期五
        </v-chip></th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
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

<style>
@import "https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css";
#table {
  font-size: 500px;
}
</style>

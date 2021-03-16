<template>
  <v-container>
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
            <v-card-title>Buddy 基于 Vue.js</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">Powered by <strong><a href='http://github.com/ElaBosak233' target='_blank'>@ElaBosak233</a></strong></v-card-subtitle>
          <v-card-text class="text--primary">
            <br/>
            <div>你们可能不知道，Buddy 不仅仅是个英语老师</div>
            <div>Buddy 还是这个程序的名字</div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="orange"
              text
              href="https://github.com/ElaBosak233/Buddy"
              target="_blank"
            >
              Github
            </v-btn>
            <v-btn
              color="orange"
              text
              href="https://www.bilibili.com/video/BV1wC4y1t7Pf?from=search&seid=18323872534239776888"
              target="_blank"
            >
              Who's Ela
            </v-btn>
          </v-card-actions>
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
        src: 'https://i.loli.net/2021/01/01/AycGBmqjKXQ1Es6.png'
      },
      // {
      //   src: 'https://i.loli.net/2021/01/01/k7JoAO1M8XUT6aV.png'
      // },
      {
        src: 'https://i.loli.net/2021/01/01/w3XCbI8PZBdKTm7.png'
      },
      {
        src: 'https://i.loli.net/2021/01/01/AnaQkKuJYFqlm3s.png'
      }
    ]
  }),
  created: function () {
    for (var i = 0; i < this.items.length; i++) {
      const image = new Image()
      image.src = this.items[i].src
      // eslint-disable-next-line no-unused-expressions
      image.onload
    }
  }
}
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <!-- 课程表 -->
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://i.loli.net/2021/03/27/MdYAzqEn6NOFDxm.png"
          >
            <v-card-title><v-icon left color="white">fas fa-table</v-icon>课程表</v-card-title>
          </v-img>
          <v-card-text>
            <div>更改所有已载入 <strong>同一个</strong> LeanCloud 的 Buddy 的 <strong>课程表</strong></div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="orange"
              text
              @click="Curriculum.curriculumSendForm = true"
            >
              编辑并更改
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog
          persistent
          v-model="Curriculum.curriculumSendForm"
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <v-icon left>fas fa-table</v-icon><span class="headline">编辑课程表</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="标题"
                      v-model="Toast.msg.title"
                      outlined
                      prepend-inner-icon="fas fa-file-signature"
                      required
                    ></v-text-field>
                    <v-textarea
                      label="请输入内容"
                      v-model="Toast.msg.content"
                      required
                      outlined
                    ></v-textarea>
                    <v-select
                      v-model="Toast.msg.type"
                      :items="['green', 'blue', 'red', 'grey']"
                      label="通知颜色"
                      outlined
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="Curriculum.curriculumSendForm = false"
              >
                取消
              </v-btn>
              <v-btn
                color="blue darken-1"
                outlined
                @click="sendCurriculum"
              >
                <v-icon left>fas fa-sync-alt</v-icon>更新
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="12" md="4">
        <!-- 消息发送 -->
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title><v-icon left color="white">fas fa-sign-out-alt</v-icon>通知发送</v-card-title>
          </v-img>
          <v-card-text>
            <div>向所有已载入 <strong>同一个</strong> LeanCloud 的 Buddy 发送一条 <strong>可自定义</strong> 的消息</div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="orange"
              text
              @click="Toast.toastSendForm = true"
            >
              编辑并发送
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog
          persistent
          v-model="Toast.toastSendForm"
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <v-icon left>fas fa-sign-out-alt</v-icon><span class="headline">编辑通知</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="标题"
                      v-model="Toast.msg.title"
                      outlined
                      prepend-inner-icon="fas fa-file-signature"
                      required
                    ></v-text-field>
                    <v-textarea
                      label="请输入内容"
                      v-model="Toast.msg.content"
                      required
                      outlined
                    ></v-textarea>
                    <v-select
                      v-model="Toast.msg.type"
                      :items="['green', 'blue', 'red', 'grey']"
                      label="通知颜色"
                      outlined
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="Toast.toastSendForm = false"
              >
                取消
              </v-btn>
              <v-btn
                color="blue darken-1"
                outlined
                @click="sendToast"
              >
                <v-icon left>fas fa-sign-out-alt</v-icon>发送
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="12" md="4">
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'MicroPrograms',
  data: () => {
    return {
      Toast: {
        toastSendForm: false,
        msg: {
          title: '',
          content: '',
          type: ''
        }
      },
      Curriculum: {
        curriculumSendForm: false
      }
    }
  },
  methods: {
    sendToast: function () {
      const AV = this.$store.state.AV
      const newToast = new AV.Object('Toast')
      newToast.set('title', this.Toast.msg.title)
      newToast.set('content', this.Toast.msg.content)
      newToast.set('type', this.Toast.msg.type)
      newToast.set('messenger', AV.User.current().get('nick'))
      newToast.set('messenger_avatar', AV.User.current().get('avatar'))
      newToast.save().then()
      this.Toast.toastSendForm = false
    },
    sendCurriculum: function () {
      // const AV = this.$store.state.AV
    }
  }
}
</script>

<style scoped>

</style>

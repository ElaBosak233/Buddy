<template>
  <v-container>
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
              @click="getCurriculum"
            >
              编辑并更改
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog
          persistent
          v-model="Curriculum.curriculumSendForm"
          max-width="1000px"
        >
          <v-card>
            <v-card-title>
              <v-icon left>fas fa-table</v-icon><span class="headline">编辑课程表</span>
            </v-card-title>
            <v-card-text>
              <v-container>
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
                  <tr v-for="(item, index) in Curriculum.items" :key="index">
                    <th scope="row"><v-chip
                      color="green"
                      dark
                    >
                      {{item.index}}
                    </v-chip></th>
                    <td>
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="item.class[0]" :aria-label="item.class[0]" aria-describedby="basic-addon1">
                      </div>
                    </td>
                    <td>
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="item.class[1]" :aria-label="item.class[1]" aria-describedby="basic-addon1">
                      </div>
                    </td>
                    <td>
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="item.class[2]" :aria-label="item.class[2]" aria-describedby="basic-addon1">
                      </div>
                    </td>
                    <td>
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="item.class[3]" :aria-label="item.class[3]" aria-describedby="basic-addon1">
                      </div>
                    </td>
                    <td>
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="item.class[4]" :aria-label="item.class[4]" aria-describedby="basic-addon1">
                      </div>
                    </td>
                    <td>
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="item.class[5]" :aria-label="item.class[5]" aria-describedby="basic-addon1">
                      </div>
                    </td>
                    <td>
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="item.class[6]" :aria-label="item.class[6]" aria-describedby="basic-addon1">
                      </div>
                    </td>
                    <td>
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="item.class[7]" :aria-label="item.class[7]" aria-describedby="basic-addon1">
                      </div>
                    </td>
                    <td>
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="item.class[8]" :aria-label="item.class[8]" aria-describedby="basic-addon1">
                      </div>
                    </td>
                    <td>
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="item.class[9]" :aria-label="item.class[9]" aria-describedby="basic-addon1">
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
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
        <v-snackbar
          v-model="Curriculum.success"
          color="success"
          bottom
          right
        >
          <v-icon left>fas fa-sync-alt</v-icon>已更新课程表
          <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="Curriculum.success = false"
            >
              关闭
            </v-btn>
          </template>
        </v-snackbar>
        <v-snackbar
          v-model="Curriculum.fail"
          color="error"
          bottom
          right
        >
          <v-icon left>fas fa-sync-alt</v-icon>更新失败
          <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="Curriculum.fail = false"
            >
              关闭
            </v-btn>
          </template>
        </v-snackbar>
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
              color="red"
              text
              @click="clearToast"
            >
              清除通知
            </v-btn>
            <v-spacer></v-spacer>
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
        <v-snackbar
          v-model="Toast.success"
          color="success"
          bottom
          right
        >
          <v-icon left>fab fa-telegram-plane</v-icon>已发送
          <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="Toast.success = false"
            >
              关闭
            </v-btn>
          </template>
        </v-snackbar>
        <v-snackbar
          v-model="Toast.fail"
          color="error"
          bottom
          right
        >
          <v-icon left>fab fa-telegram-plane</v-icon>发送失败
          <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="Toast.fail = false"
            >
              关闭
            </v-btn>
          </template>
        </v-snackbar>
        <v-snackbar
          v-model="Toast.clear"
          color="purple"
          bottom
          right
        >
          <v-icon left>fab fa-telegram-plane</v-icon>已清除
          <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="Toast.clear = false"
            >
              关闭
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>
      <v-col cols="12" md="4">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MicroPrograms",
  data: () => {
    return {
      Toast: {
        toastSendForm: false,
        success: false,
        fail: false,
        clear: false,
        msg: {
          title: "",
          content: "",
          type: ""
        }
      },
      Curriculum: {
        curriculumSendForm: false,
        success: false,
        fail: false,
        items: [
          {
            index: "星期一",
            objectId: "",
            class: []
          },
          {
            index: "星期二",
            objectId: "",
            class: []
          },
          {
            index: "星期三",
            objectId: "",
            class: []
          },
          {
            index: "星期四",
            objectId: "",
            class: []
          },
          {
            index: "星期五",
            objectId: "",
            class: []
          }
        ]
      }
    };
  },
  methods: {
    sendToast: function () {
      const AV = this.$store.state.AV;
      try {
        const newToast = new AV.Object("Toast");
        if (this.Toast.msg.title === "") {
          newToast.set("title", "无标题");
        } else {
          newToast.set("title", this.Toast.msg.title);
        }
        newToast.set("content", this.Toast.msg.content);
        if (this.Toast.msg.type === "") {
          newToast.set("type", "blue");
        } else {
          newToast.set("type", this.Toast.msg.type);
        }
        newToast.set("messenger", AV.User.current().get("nick"));
        newToast.set("messenger_avatar", AV.User.current().get("avatar"));
        newToast.save().then();
        this.Toast.fail = false;
        this.Toast.success = true;
      } catch (e) {
        this.Toast.fail = true;
      } finally {
        this.Toast.toastSendForm = false;
      }
    },
    clearToast: function () {
      const AV = this.$store.state.AV;
      const query = new AV.Query("Toast");
      query.find().then((todo) => {
        AV.Object.destroyAll(todo);
        this.Toast.clear = true;
      });
    },
    getCurriculum: function () {
      const AV = this.$store.state.AV;
      /**
       * 获取/创建星期一的课程表
       */
      const monday = new AV.Query("Curriculum");
      monday.equalTo("week", "星期一");
      monday.first().then((todo) => {
        this.Curriculum.items[0].objectId = todo.getObjectId();
        this.Curriculum.items[0].class = todo.get("class");
      });
      /**
       * 获取/创建星期二的课程表
       */
      const tuesday = new AV.Query("Curriculum");
      tuesday.equalTo("week", "星期二");
      tuesday.first().then((todo) => {
        this.Curriculum.items[1].objectId = todo.getObjectId();
        this.Curriculum.items[1].class = todo.get("class");
      });
      /**
       * 获取/创建星期三的课程表
       */
      const wednesday = new AV.Query("Curriculum");
      wednesday.equalTo("week", "星期三");
      wednesday.first().then((todo) => {
        this.Curriculum.items[2].objectId = todo.getObjectId();
        this.Curriculum.items[2].class = todo.get("class");
      });
      /**
       * 获取/创建星期四的课程表
       */
      const thursday = new AV.Query("Curriculum");
      thursday.equalTo("week", "星期四");
      thursday.first().then((todo) => {
        this.Curriculum.items[3].objectId = todo.getObjectId();
        this.Curriculum.items[3].class = todo.get("class");
      });
      /**
       * 获取/创建星期五的课程表
       */
      const friday = new AV.Query("Curriculum");
      friday.equalTo("week", "星期五");
      friday.first().then((todo) => {
        this.Curriculum.items[4].objectId = todo.getObjectId();
        this.Curriculum.items[4].class = todo.get("class");
      });
      this.Curriculum.curriculumSendForm = true;
    },
    sendCurriculum: function () {
      const AV = this.$store.state.AV;
      try {
        const monday = AV.Object.createWithoutData("Curriculum", this.Curriculum.items[0].objectId);
        monday.set("class", this.Curriculum.items[0].class);
        monday.save().then();
        const tuesday = AV.Object.createWithoutData("Curriculum", this.Curriculum.items[1].objectId);
        tuesday.set("class", this.Curriculum.items[1].class);
        tuesday.save().then();
        const wednesday = AV.Object.createWithoutData("Curriculum", this.Curriculum.items[2].objectId);
        wednesday.set("class", this.Curriculum.items[2].class);
        wednesday.save().then();
        const thursday = AV.Object.createWithoutData("Curriculum", this.Curriculum.items[3].objectId);
        thursday.set("class", this.Curriculum.items[3].class);
        thursday.save().then();
        const friday = AV.Object.createWithoutData("Curriculum", this.Curriculum.items[4].objectId);
        friday.set("class", this.Curriculum.items[4].class);
        friday.save().then();
        this.Curriculum.fail = false;
        this.Curriculum.success = true;
      } catch (e) {
        this.Curriculum.fail = true;
      } finally {
        this.Curriculum.curriculumSendForm = false;
      }
    }
  }
};
</script>

<style scoped>

</style>

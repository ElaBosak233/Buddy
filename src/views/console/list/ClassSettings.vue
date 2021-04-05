<template>
  <v-container>
    <v-card shaped outlined elevation="2">
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="user"
          sort-by="username"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title><v-icon color="orange" left>mdi-star</v-icon>班级</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    v-show="newUser"
                  >
                    <v-icon left>mdi-account-multiple</v-icon>新用户
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <br />
                    <v-alert
                      color="red"
                      dense
                      type="error"
                      v-show="alert"
                    >保存失败，请检查输入的参数是否符合以下要求：无重复用户名及邮箱，用户名、邮箱、权限组、QQ、真实姓名无空缺</v-alert>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.username"
                            dense
                            label="用户名"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.real"
                            dense
                            label="真实姓名"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-autocomplete
                            v-model="editedItem.permission"
                            :items="permissions"
                            item-text="name"
                            item-value="value"
                            label="权限组"
                            dense
                            solo
                            rounded
                          ></v-autocomplete>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.id"
                            dense
                            label="班序"
                            type="Number"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.uid"
                            dense
                            label="学籍号"
                            type="Number"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.qq"
                            dense
                            label="QQ"
                            type="Number"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                        >
                          <v-text-field
                            v-model="editedItem.email"
                            dense
                            label="Email"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red"
                      text
                      @click="close"
                    >
                      取消
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="saveUser"
                    >
                      保存
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small @click="checkReport(item)">
              far fa-sticky-note
            </v-icon>
          </template>
          <template v-slot:item.avatar="{ item }">
            <v-avatar
              color="primary"
              size="32"
            >
              <img
                :src="user[user.indexOf(item)].avatar"
              >
            </v-avatar>
          </template>
          <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="initialize"
            >
              重载
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="info"
      max-width="600"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
          elevation="0"
        >
          <v-toolbar-title> {{ editedItem.real }} </v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-list
            three-line
            subheader
          >
            <br/>
            <v-row>
              <v-col cols="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title style="font-weight: bold"><center><v-icon left>fas fa-user-shield</v-icon>身份二维码</center></v-list-item-title>
                    <v-list-item-content>
                      <center><v-img max-height="100" max-width="100"><vue-qr :text="QRCodeData.text" :margin="0" colorDark="#3949AB" colorLight="#ffffff" :size="100"></vue-qr></v-img></center>
                    </v-list-item-content>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6">
                <div style="font-weight: bold"><v-icon left small>fas fa-sort-numeric-up-alt</v-icon>序列号</div>
                <div style="font-style: italic; color: gray">{{ editedItem.objectId }}</div>
                <div v-show="studentFunc">
                  <div style="font-weight: bold"><v-icon left small>fas fa-tasks</v-icon>进度</div>
                  <v-progress-linear
                    :value="userProgress"
                    height="20"
                    striped
                  >
                    <strong>{{ userProgress.toFixed(2) }}%</strong>
                  </v-progress-linear>
                  <div style="font-weight: bold"><v-icon left small>fas fa-exclamation-triangle</v-icon>未完成的作业</div>
                  <div style="font-style: italic; color: gray">{{userUndoProgress.join(" | ")}}</div>
                </div>
              </v-col>
            </v-row>
          </v-list>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import vueQr from "vue-qr";
export default {
  name: "ClassSettings",
  components: { vueQr },
  data: () => ({
    studentFunc: false,
    newUser: false,
    dialog: false,
    info: false,
    QRCodeData: {
      text: ""
    },
    dialogDelete: false,
    alert: false,
    permissions: [
      { name: "学生", value: "student" },
      { name: "老师", value: "teacher" },
      { name: "班主任", value: "monitor" }
    ],
    headers: [
      { text: "头像", value: "avatar", sortable: false },
      {
        text: "用户名",
        align: "start",
        sortable: false,
        value: "username"
      },
      { text: "真实姓名", value: "real" },
      { text: "权限组", value: "permission" },
      { text: "班序", value: "id" },
      { text: "学籍号", value: "uid" },
      { text: "QQ", value: "qq", sortable: false },
      { text: "Email", value: "email", sortable: false },
      { text: "报告", value: "action", sortable: false } // 曾经有一个人，为了这个语句，浪费了 4 个小时的人生
    ],
    user: [],
    editedIndex: -1,
    editedItem: {
      username: "",
      objectId: "",
      real: "",
      permission: "",
      id: "",
      uid: "",
      qq: "",
      email: "",
      avatar: ""
    },
    defaultItem: {
      username: "",
      objectId: "",
      real: "",
      permission: "",
      id: "",
      uid: "",
      qq: "",
      email: "",
      avatar: ""
    },
    userProgress: 0,
    userUndoProgress: []
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? "新用户" : "编辑用户" + " - " + this.user[this.editedIndex].objectId;
    }
  },

  watch: {
    dialog (val) {
      val || this.close();
    },
    info (val) {
      if (val === false) {
        this.editedItem = this.defaultItem;
        this.editedIndex = -1;
      }
    }
  },

  created () {
    this.initialize();
  },

  methods: {
    initialize () {
      const AV = this.$store.state.AV;
      const user = new AV.Query("_User");
      user.notEqualTo("username", "admin");
      user.ascending("objectId");
      user.find().then((array) => {
        array.forEach((todo) => {
          const data = {
            username: todo.get("username"),
            objectId: todo.get("objectId"),
            real: todo.get("real"),
            permission: todo.get("permission"),
            id: todo.get("id"),
            uid: todo.get("uid"),
            qq: todo.get("qq"),
            avatar: todo.get("avatar"),
            email: todo.get("email")
          };
          this.user.push(data);
        });
      });
      if (AV.User.current().get("permission") === ("admin" || "monitor")) {
        this.newUser = true;
      }
    },
    editItem (item) {
      this.editedItem = this.defaultItem;
      this.editedIndex = this.user.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close () {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    saveUser () {
      const AV = this.$store.state.AV;
      // 创建
      if (this.editedItem.permission === "" || this.editedItem.real === "" || this.editedItem.qq === "" || this.editedItem.username === "") {
        this.alert = true;
      } else {
        const user = new AV.Object("_User");
        user.set("username", this.editedItem.username);
        user.set("real", this.editedItem.real);
        user.set("permission", this.editedItem.permission);
        user.set("id", parseInt(this.editedItem.id));
        user.set("uid", parseInt(this.editedItem.uid));
        user.set("qq", parseInt(this.editedItem.qq));
        user.set("avatar", "http://q1.qlogo.cn/g?b=qq&nk=" + this.editedItem.qq + "&s=640");
        user.set("email", this.editedItem.email);
        user.set("password", "123456");
        user.save().then((res) => {
          const data = {
            username: this.editedItem.username,
            objectId: res.getObjectId(),
            real: this.editedItem.real,
            permission: this.editedItem.permission,
            id: parseInt(this.editedItem.id),
            uid: parseInt(this.editedItem.uid),
            qq: parseInt(this.editedItem.qq),
            email: this.editedItem.email
          };
          this.user.push(data);
          this.alert = false;
          this.close();
        }, (error) => {
          this.alert = true;
          console.log(error);
        });
      }
    },
    checkReport (item) {
      this.editedIndex = this.user.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.QRCodeData.text = this.editedItem.objectId;
      this.getProgress();
      this.getUndoProgress();
      const AV = this.$store.state.AV;
      const query = new AV.Query("_User");
      query.get(this.editedItem.objectId).then((res) => {
        if (res.get("permission") === "student") {
          this.studentFunc = true;
        } else {
          this.studentFunc = false;
        }
      });
      this.info = true;
    },
    arrContain: function (arr, val) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
          return true;
        }
      }
      return false;
    },
    getProgress () {
      const AV = this.$store.state.AV;
      const query = new AV.Query("Project");
      let counter = 0;
      let length = 0;
      query.find().then((res) => {
        res.forEach((todo) => {
          if (this.arrContain(todo.get("finished"), this.editedItem.objectId)) {
            counter = counter + 1;
          }
        });
        length = res.length;
        this.userProgress = (counter / length).toFixed(4) * 100;
      });
    },
    getUndoProgress () {
      const AV = this.$store.state.AV;
      const query = new AV.Query("Project");
      const array = [];
      query.find().then((res) => {
        res.forEach((todo) => {
          if (!this.arrContain(todo.get("finished"), this.editedItem.objectId)) {
            let subject = "";
            switch (todo.get("subject")) {
              case "chinese":
                subject = "语文";
                break;
              case "math":
                subject = "数学";
                break;
              case "english":
                subject = "英语";
                break;
              case "physics":
                subject = "物理";
                break;
              case "chemistry":
                subject = "化学";
                break;
              case "politics":
                subject = "政治";
                break;
              case "biology":
                subject = "生物";
                break;
              case "history":
                subject = "历史";
                break;
              case "geography":
                subject = "地理";
                break;
              case "it":
                subject = "信息技术";
                break;
              case "gt":
                subject = "通用技术";
                break;
              case "other":
                subject = "其他";
                break;
            }
            array.push(subject + "⭐" + todo.get("title"));
          }
        });
        this.userUndoProgress = array;
      });
    }
  }
};
</script>

<style scoped>

</style>

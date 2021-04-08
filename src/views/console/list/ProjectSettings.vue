<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" v-for="(val, key) in ProjectInfo" v-bind:key="key">
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            :src="val.src"
          >
            <v-card-title>{{val.name}}</v-card-title>
          </v-img>
          <v-container>
            <div v-for="(item, key1) in Project[key]" v-bind:key="key1">
              <v-btn text @click="checkProject(item)"> {{ item.createdAt.getUTCMonth()+1 }}月{{ item.createdAt.getUTCDate() }}日 - {{ item.attributes.title }} </v-btn>
            </div>
          </v-container>
          <v-card-actions v-show="showBtn">
            <v-btn
              color="orange"
              text
              @click="newProject(key)"
            >
              新作业
            </v-btn>
          </v-card-actions>
        </v-card>
        <br/>
      </v-col>
    </v-row>
    <v-dialog
      v-model="info"
      transition="dialog-bottom-transition"
      max-width="600"
      :persistent="showBtn"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
          elevation="0"
        >
          <v-toolbar-title> {{ editedProject.title }} </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="deleteProject"
              v-show="showBtn"
              color="red"
            >
              <v-icon left>fas fa-trash-alt</v-icon><div style="font-weight: bold">删除</div>
            </v-btn>
            <v-btn
              dark
              text
              @click="saveProject"
              v-show="showBtn"
            >
              <v-icon left>fas fa-check</v-icon><div style="font-weight: bold">保存</div>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-list
            three-line
            subheader
            v-show="showBtn"
          >
            <v-subheader>
              <v-btn
                block
                elevation="2"
                large
                dark
                color="blue darken-3"
                @click="QRCodeScan.stats.showCam = !QRCodeScan.stats.showCam"
              ><v-icon left>fas fa-camera</v-icon>开启 / 关闭 QRCode 扫描镜头</v-btn>
            </v-subheader>
            <v-list-item v-show="QRCodeScan.stats.showCam">
              <v-list-item-content>
                <center><v-list-item-content><strong>{{ QRCodeScan.info.name }}</strong> <code>{{ QRCodeScan.result }}</code></v-list-item-content></center>
                <center><div style="border-style: dashed; border-color: #3949AB; border-width: thick; width: 200px; height: 200px;">
                  <qrcode-stream :disabled="!QRCodeScan.stats.showCam" @decode="onDecode" @init="onInit"></qrcode-stream>
                </div></center>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list
            three-line
            subheader
          >
            <v-subheader>作业概览</v-subheader>
            <v-progress-linear
              color="blue darken-4"
              dark
              height="25"
              :value="(parseInt(editedProject.info.finishedNum) / parseInt(editedProject.info.totalMember)).toFixed(4) * 100"
              striped
            >
              作业完成进度（{{ (parseInt(editedProject.info.finishedNum) / parseInt(editedProject.info.totalMember)).toFixed(4) * 100}}%）
            </v-progress-linear>
            <v-row>
              <v-col cols="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title><div style="font-weight: bold">已完成</div></v-list-item-title>
                    <v-list-item-content><h1>{{editedProject.info.finishedNum}}</h1></v-list-item-content>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title><div style="font-weight: bold">未完成（共{{editedProject.info.unFinished.length}}人）</div></v-list-item-title>
                    {{editedProject.info.unFinished.join(" ")}}
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-list>
          <v-list
            three-line
            subheader
          >
            <v-subheader>作业设置</v-subheader>
            <v-row>
              <v-col cols="12">
                <v-text-field :disabled="!showBtn" v-model="editedProject.title" dense outlined label="标题"></v-text-field>
                <v-textarea :disabled="!showBtn" v-model="editedProject.content" outlined label="内容"></v-textarea>
              </v-col>
            </v-row>
          </v-list>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="newP"
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
          elevation="0"
        >
          <v-toolbar-title> 正在创建 <code>{{ editedProject.subject }}</code> 科目作业 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="newP = false"
            >
              <v-icon left>fas fa-times</v-icon>取消
            </v-btn>
            <v-btn
              dark
              text
              @click="submitProject"
            >
              <v-icon left>fas fa-check</v-icon><div style="font-weight: bold">保存</div>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-list
            three-line
            subheader
          >
            <br/>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedProject.title" dense outlined label="标题"></v-text-field>
                <v-textarea v-model="editedProject.content" outlined label="内容"></v-textarea>
              </v-col>
            </v-row>
          </v-list>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar
      color="success"
      v-model="QRCodeScan.success"
    >
      <v-icon left>fab fa-telegram-plane</v-icon>已录入
      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="QRCodeScan.success = false"
        >
          <v-icon>fas fa-check</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  name: "ProjectSettings",
  components: { QrcodeStream },
  inject: ["reload"],
  data: () => {
    return {
      info: false,
      newP: false,
      QRCodeScan: {
        stats: {
          showCam: false,
          showBtn: true
        },
        success: false,
        result: "",
        error: "",
        info: {
          name: ""
        }
      },
      showBtn: true,
      ProjectInfo: {
        Chinese: {
          name: "语文",
          src: "https://i.loli.net/2021/04/04/GP7zjpUDsuZfWya.png"
        },
        Math: {
          name: "数学",
          src: "https://i.loli.net/2021/04/04/G31NxKtOePzj5ku.png"
        },
        English: {
          name: "英语",
          src: "https://i.loli.net/2021/04/04/q3CcNThxAujDmMR.png"
        },
        Physics: {
          name: "物理",
          src: "https://i.loli.net/2021/04/04/eKOJbQqG6aURpin.png"
        },
        Chemistry: {
          name: "化学",
          src: "https://i.loli.net/2021/04/04/DS8InMkAWzcPmsp.png"
        },
        Biology: {
          name: "生物",
          src: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2680548674,1846022061&fm=26&gp=0.jpg"
        },
        Politics: {
          name: "政治",
          src: "https://i.loli.net/2021/04/04/BC1OqAd7cJeKUQ8.png"
        },
        History: {
          name: "历史",
          src: "https://i.loli.net/2021/04/04/aXdfMuezykmtSsK.png"
        },
        Geography: {
          name: "地理",
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160726%2F316b150ecd9245c4bdc70388a1cfdd81_th.jpg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620126167&t=83d9142a4eb836d520b8e16734ea90fa"
        },
        It: {
          name: "信息技术",
          src: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=143206317,2886852251&fm=26&gp=0.jpg"
        },
        Gt: {
          name: "通用技术",
          src: "https://i.loli.net/2021/04/04/VTKNzwJYIRcSDOu.png"
        },
        Other: {
          name: "其他",
          src: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3303112710,2958920342&fm=26&gp=0.jpg"
        }
      },
      Project: {
        /*
        示例数据结构
        {
          objectId: 作业 Id,
          title: 作业标题,
          subject: 科目,
          content: 内容,
          createdAt: 发布时间,
          finished: [], // 已完成的人的 ObjectId
        }
         */
        Chinese: [],
        Math: [],
        English: [],
        Physics: [],
        Chemistry: [],
        Biology: [],
        Politics: [],
        History: [],
        Geography: [],
        IT: [],
        GT: [],
        Other: []
      },
      editedProject: {
        objectId: "",
        title: "",
        subject: "",
        content: "",
        createdAt: "",
        finished: [],
        info: {
          finishedNum: "",
          unFinished: [],
          totalMember: ""
        }
      },
      defaultProject: {
        objectId: "",
        title: "",
        subject: "",
        content: "",
        createdAt: "",
        finished: [],
        info: {
          finishedNum: "",
          unFinished: [],
          totalMember: ""
        }
      }
    };
  },
  mounted: function () {
    const AV = this.$store.state.AV;
    new AV.Query("Project").find().then((res) => {
      res.forEach((i) => {
        switch (i.attributes.subject) {
          case "chinese":
            this.Project.Chinese.push(i);
            break;
          case "math":
            this.Project.Math.push(i);
            break;
          case "english":
            this.Project.English.push(i);
            break;
          case "physics":
            this.Project.Physics.push(i);
            break;
          case "chemistry":
            this.Project.Chemistry.push(i);
            break;
          case "biology":
            this.Project.Biology.push(i);
            break;
          case "politics":
            this.Project.Politics.push(i);
            break;
          case "history":
            this.Project.History.push(i);
            break;
          case "geography":
            this.Project.Geography.push(i);
            break;
          case "it":
            this.Project.IT.push(i);
            break;
          case "gt":
            this.Project.GT.push(i);
            break;
          case "other":
            this.Project.Other.push(i);
            break;
        }
      });
    });
    if (AV.User.current().get("permission") === "student") {
      this.showBtn = false;
    }
  },
  methods: {
    checkProject: function (item) {
      this.editedProject.objectId = item.id;
      this.editedProject.title = item.attributes.title;
      this.editedProject.content = item.attributes.content;
      this.editedProject.createdAt = item.createdAt;
      this.editedProject.subject = item.attributes.subject;
      this.editedProject.finished = item.attributes.finished;
      this.editedProject.info.finishedNum = this.editedProject.finished.length;
      const AV = this.$store.state.AV;
      const student = new AV.Query("_User");
      student.equalTo("permission", "student");
      let response = [];
      student.find().then((res) => {
        response = res;
        this.editedProject.info.totalMember = response.length;
        const array = [];
        const array2 = this.editedProject.finished;
        response.forEach((i) => {
          array.push(i.getObjectId());
        });
        this.subArray(array, array2).forEach((stuId) => {
          response.forEach((i) => {
            if (i.getObjectId() === stuId) {
              this.editedProject.info.unFinished.push(i.get("real"));
            }
          });
        });
      });
      this.info = true;
    },
    saveProject () {
      const AV = this.$store.state.AV;
      const save = AV.Object.createWithoutData("Project", this.editedProject.objectId);
      save.set("title", this.editedProject.title);
      save.set("content", this.editedProject.content);
      save.save();
      this.info = false;
      this.reload(500);
    },
    deleteProject () {
      const AV = this.$store.state.AV;
      const del = AV.Object.createWithoutData("Project", this.editedProject.objectId);
      del.destroy();
      this.reload(500);
    },
    newProject (param) {
      this.editedProject = this.defaultProject;
      this.editedProject.subject = param;
      this.newP = true;
    },
    submitProject () {
      const AV = this.$store.state.AV;
      const newPro = new AV.Object("Project");
      newPro.set("title", this.editedProject.title);
      newPro.set("content", this.editedProject.content);
      newPro.set("subject", this.editedProject.subject.toLowerCase());
      newPro.set("finished", []);
      newPro.save();
      this.reload(500);
    },
    subArray (arr1, arr2) {
      for (let i = arr1.length - 1; i >= 0; i--) {
        const a = arr1[i];
        for (let j = arr2.length - 1; j >= 0; j--) {
          const b = arr2[j];
          if (a === b) {
            arr1.splice(i, 1);
            arr2.splice(j, 1);
            break;
          }
        }
      }
      return arr1;
    },
    onDecode (result) {
      this.QRCodeScan.result = result;
    },
    async onInit (promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: 您需要授予相机访问权限";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: 这个设备上没有摄像头";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: 所需的安全上下文(HTTPS、本地主机)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: 相机被占用";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: 安装摄像头不合适";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: 此浏览器不支持流API";
        }
      }
    }
  },
  computed: {
    userObject () {
      return this.QRCodeScan.result;
    }
  },
  watch: {
    userObject (val) {
      const AV = this.$store.state.AV;
      const query = new AV.Query("_User");
      query.get(val).then((res) => {
        this.QRCodeScan.info.name = res.get("real");
        const array = [this.QRCodeScan.result];
        const update = AV.Object.createWithoutData("Project", this.editedProject.objectId);
        update.addUnique("finished", array);
        update.save().then(() => {
          this.QRCodeScan.success = true;
        });
      });
    },
    info (val) {
      if (val === false) {
        this.reload();
      }
    }
  }
};
</script>

<style scoped>

</style>

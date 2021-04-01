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
              <v-toolbar-title><v-icon color="orange" left>mdi-star</v-icon>权限管理</v-toolbar-title>
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
                      v-show="alart"
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
  </v-container>
</template>

<script>
export default {
  name: 'PermissionSettings',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    alart: false,
    permissions: [
      { name: '学生', value: 'student' },
      { name: '老师', value: 'teacher' },
      { name: '班主任', value: 'monitor' }
    ],
    headers: [
      {
        text: '用户名',
        align: 'start',
        sortable: false,
        value: 'username'
      },
      { text: '真实姓名', value: 'real' },
      { text: '权限组', value: 'permission' },
      { text: '班序', value: 'id' },
      { text: '学籍号', value: 'uid' },
      { text: 'QQ', value: 'qq', sortable: false },
      { text: 'Email', value: 'email', sortable: false }
      // { text: '操作', value: 'actions', sortable: false } // 曾经有一个人，为了这个语句，浪费了 4 个小时的人生
    ],
    user: [],
    editedIndex: -1,
    editedItem: {
      username: '',
      objectId: '',
      real: '',
      permission: '',
      id: '',
      uid: '',
      qq: '',
      email: ''
    },
    defaultItem: {
      username: '',
      objectId: '',
      real: '',
      permission: '',
      id: '',
      uid: '',
      qq: '',
      email: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新用户' : '编辑用户' + ' - ' + this.user[this.editedIndex].objectId
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {

    initialize () {
      const AV = this.$store.state.AV
      const user = new AV.Query('_User')
      user.notEqualTo('username', 'admin')
      user.ascending('objectId')
      user.find().then((array) => {
        array.forEach((todo) => {
          const data = {
            username: todo.get('username'),
            objectId: todo.get('objectId'),
            real: todo.get('real'),
            permission: todo.get('permission'),
            id: todo.get('id'),
            uid: todo.get('uid'),
            qq: todo.get('qq'),
            email: todo.get('email')
          }
          this.user.push(data)
        })
      })
    },

    editItem (item) {
      this.editedIndex = this.user.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    // deleteItem (item) {
    //   this.editedIndex = this.user.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.dialogDelete = true
    // },
    //
    // deleteItemConfirm () {
    //   this.user.splice(this.editedIndex, 1)
    //   this.closeDelete()
    // },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    saveUser () {
      const AV = this.$store.state.AV
      if (this.editedIndex > -1) {
        // // 更改
        // const user = AV.Object.createWithoutData('_User', this.user[this.editedIndex].objectId)
        // user.set('username', this.user[this.editedIndex].username)
        // user.set('real', this.user[this.editedIndex].real)
        // user.set('permission', this.user[this.editedIndex].permission)
        // user.set('id', this.user[this.editedIndex].id)
        // user.set('uid', this.user[this.editedIndex].uid)
        // user.set('qq', this.user[this.editedIndex].qq)
        // user.set('email', this.user[this.editedIndex].email)
        // user.save().then((res) => {
        //   this.alart = false
        //   this.close()
        // }, (error) => {
        //   this.alart = true
        //   console.log(error)
        // })
      } else {
        // 创建
        if ((this.editedItem.permission || this.editedItem.real || this.editedItem.qq) === '') {
          this.alart = true
        } else {
          const user = new AV.Object('_User')
          user.set('username', this.editedItem.username)
          user.set('real', this.editedItem.real)
          user.set('permission', this.editedItem.permission)
          user.set('id', parseInt(this.editedItem.id))
          user.set('uid', parseInt(this.editedItem.uid))
          user.set('qq', parseInt(this.editedItem.qq))
          user.set('email', this.editedItem.email)
          user.set('password', '123456')
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
            }
            this.user.push(data)
            this.alart = false
            this.close()
          }, (error) => {
            this.alart = true
            console.log(error)
          })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>

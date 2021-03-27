export function initUser (self) {
  const AV = self.$store.state.AV
  /**
   * 默认用户 admin 生成
   */
  const admin = new AV.User()
  admin.setUsername('admin')
  admin.setEmail('admin@admin.com')
  admin.setPassword('admin')
  admin.set('nick', '管理员')
  admin.set('permission', 'admin')
  admin.set('qq', '')
  admin.set('avatar', '')
  admin.signUp().then()
  /**
   * 学生身份 Buddy 生成
   */
  const buddyStudent = new AV.Object('Student')
  buddyStudent.set('username', 'buddy')
  buddyStudent.set('uid', 200101490800)
  buddyStudent.set('id', 0)
  buddyStudent.set('nick', '巴蒂')
  buddyStudent.set('avatar', 'https://i.loli.net/2021/01/02/p7wxZNiaFfutEyG.png')
  buddyStudent.set('qq', null)
  buddyStudent.save().then()
}

export function initCurriculum (self) {
  const AV = self.$store.state.AV
  /**
   * 初始化课程表
   */
  const MondayCreate = AV.Object.extend('Curriculum')
  const mondayCreate = new MondayCreate()
  mondayCreate.set('week', '星期一')
  mondayCreate.set('class', ['语文', '数学', '英语', '化学', '生物', '物理', '技术', '心理', '体育', '体育'])
  mondayCreate.save().then()
  const TuesdayCreate = AV.Object.extend('Curriculum')
  const tuesdayCreate = new TuesdayCreate()
  tuesdayCreate.set('week', '星期二')
  tuesdayCreate.set('class', ['心理', '体育', '体育', '语文', '技术', '生物', '音乐', '美术', '体育', '体育'])
  tuesdayCreate.save().then()
  const WednesdayCreate = AV.Object.extend('Curriculum')
  const wednesdayCreate = new WednesdayCreate()
  wednesdayCreate.set('week', '星期三')
  wednesdayCreate.set('class', ['共价', '心理', '数学', '化学', '物理', '体育', '体育', '体育', '社团', '语文'])
  wednesdayCreate.save().then()
  const ThursdayCreate = AV.Object.extend('Curriculum')
  const thursdayCreate = new ThursdayCreate()
  thursdayCreate.set('week', '星期四')
  thursdayCreate.set('class', ['体育', '体育', '心理', '体育', '技术', '技术', '语文', '英语', '语文', '美术'])
  thursdayCreate.save().then()
  const FridayCreate = AV.Object.extend('Curriculum')
  const fridayCreate = new FridayCreate()
  fridayCreate.set('week', '星期五')
  fridayCreate.set('class', ['语文', '体育', '共价', '心理', '体育', '体育', '语文', '数学', '英语', '技术'])
  fridayCreate.save().then()
  console.log('%c' + '[LeanCloud] 课程表结构初始化完成 ', 'color:' + 'green')
}

export function initToast (self) {
  const AV = self.$store.state.AV
  const toastCreate = new AV.Object('Toast')
  toastCreate.set('title', '通知标题')
  toastCreate.set('content', '通知内容')
  toastCreate.set('messenger', '巴蒂')
  toastCreate.set('type', 'blue')
  toastCreate.set('messenger_avatar', 'https://avatars.githubusercontent.com/u/40133903?v=4')
  toastCreate.save().then()
}

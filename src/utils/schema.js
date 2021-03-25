export function initUser (self) {
  const AV = self.$store.state.AV
  /**
   * 默认用户 Buddy 生成
   */
  const buddy = new AV.User()
  buddy.setUsername('buddy')
  buddy.setEmail('buddy@e23.in')
  buddy.setPassword('123456')
  buddy.set('uid', 200101490800)
  buddy.set('id', 0)
  buddy.set('permission', 'student')
  buddy.set('nick', '巴蒂')
  buddy.set('avatar', 'https://i.loli.net/2021/01/02/p7wxZNiaFfutEyG.png')
  buddy.set('qq', null)
  buddy.signUp().then(function (res) {
  })
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
  buddyStudent.save().then(function (res) {
  })
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
  mondayCreate.save().then((todo) => {
  })
  const TuesdayCreate = AV.Object.extend('Curriculum')
  const tuesdayCreate = new TuesdayCreate()
  tuesdayCreate.set('week', '星期二')
  tuesdayCreate.set('class', ['心理', '体育', '体育', '语文', '技术', '生物', '音乐', '美术', '体育', '体育'])
  tuesdayCreate.save().then((todo) => {
  })
  const WednesdayCreate = AV.Object.extend('Curriculum')
  const wednesdayCreate = new WednesdayCreate()
  wednesdayCreate.set('week', '星期三')
  wednesdayCreate.set('class', ['共价', '心理', '数学', '化学', '物理', '体育', '体育', '体育', '社团', '语文'])
  wednesdayCreate.save().then((todo) => {
  })
  const ThursdayCreate = AV.Object.extend('Curriculum')
  const thursdayCreate = new ThursdayCreate()
  thursdayCreate.set('week', '星期四')
  thursdayCreate.set('class', ['体育', '体育', '心理', '体育', '技术', '技术', '语文', '英语', '语文', '美术'])
  thursdayCreate.save().then((todo) => {
  })
  const FridayCreate = AV.Object.extend('Curriculum')
  const fridayCreate = new FridayCreate()
  fridayCreate.set('week', '星期五')
  fridayCreate.set('class', ['语文', '体育', '共价', '心理', '体育', '体育', '语文', '数学', '英语', '技术'])
  fridayCreate.save().then((todo) => {
  })
  console.log('%c' + '[LeanCloud] 课程表结构初始化完成 ', 'color:' + 'green')
}

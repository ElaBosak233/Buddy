export function register (self, username, nick, email, qq, password, uid, id, permission) {
  const AV = self.$store.state.AV
  /**
   * 用户创建
   */
  const user = new AV.User()
  user.setUsername(username)
  user.setEmail(email)
  user.setPassword(password)
  user.set('uid', uid)
  user.set('id', id)
  user.set('permission', permission)
  user.set('nick', nick)
  user.set('qq', qq)
  user.signUp().then(function (res) {
  })
  if (permission === 'student') {
    /**
     * 学生身份生成
     */
    const userStudent = new AV.Object('Student')
    userStudent.set('username', username)
    userStudent.set('uid', uid)
    userStudent.set('id', id)
    userStudent.set('nick', nick)
    userStudent.set('qq', qq)
    userStudent.save().then(function (res) {
    })
  }
}

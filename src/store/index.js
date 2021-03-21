import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataSource: '',
    AV: require('leancloud-storage'),
    appId: 'qI1VhjXhBgEtk7suyijcqukz-MdYXbMMI',
    appKey: 'QlFlY3VrcnrnKGfKBTrcp2ee',
    masterKey: 'vf5TdnxNqUfK8eOgOfwfvRzK'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

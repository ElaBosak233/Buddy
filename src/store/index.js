import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataSource: '',
    AV: require('leancloud-storage'),
    appId: '2mMkkopWRgy95gdWdnVPnJ0G-gzGzoHsz',
    appKey: 'CnfTjuWU8d1m6BCkxjag8OMk'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

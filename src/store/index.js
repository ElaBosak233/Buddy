import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    AV: require("leancloud-storage"),
    NavbarTitle: "Buddy",
    // appId: '2mMkkopWRgy95gdWdnVPnJ0G-gzGzoHsz',
    // appKey: 'CnfTjuWU8d1m6BCkxjag8OMk',
    // serverURL: 'https://2mmkkopw.lc-cn-n1-shared.com',
    appId: "",
    appKey: "",
    serverURL: "",
    stats: {
      LeanCloudLoaded: false
    },
    userInfo: {
      logined: false,
      username: "",
      objectId: "",
      nick: "",
      email: "",
      qq: "",
      permission: ""
    },
    consoleShow: {
      homePage: true,
      microPrograms: false,
      personalSettings: false,
      classSettings: false,
      projectSettings: false
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
});
